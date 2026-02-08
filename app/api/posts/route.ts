import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

// GET /api/posts - Get all published posts (public) or all posts (authenticated)
export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const includeAll = searchParams.get("includeAll") === "true";

    try {
        // If authenticated, can filter by status or include all
        if (session?.user) {
            const posts = await prisma.post.findMany({
                where: includeAll ? {} : (status ? { status } : { status: "published" }),
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            title: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            });
            return NextResponse.json(posts);
        }

        // Public: only published posts
        const posts = await prisma.post.findMany({
            where: { status: "published" },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        title: true,
                    },
                },
            },
            orderBy: { publishedAt: "desc" },
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            { error: "Failed to fetch posts", details: (error as Error).message },
            { status: 500 }
        );
    }
}

// POST /api/posts - Create a new post (authenticated only)
export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, slug, excerpt, content, category, color, readTime, status } = body;

        // Validate required fields
        if (!title || !slug) {
            return NextResponse.json(
                { error: "Title and slug are required" },
                { status: 400 }
            );
        }

        // Validate status
        const validStatuses = ["draft", "published", "archived"];
        if (status && !validStatuses.includes(status)) {
            return NextResponse.json(
                { error: "Invalid status" },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const existing = await prisma.post.findUnique({ where: { slug } });
        if (existing) {
            return NextResponse.json(
                { error: "A post with this slug already exists" },
                { status: 400 }
            );
        }

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                excerpt,
                content: content || {},
                category,
                color: color || "bg-blue-50",
                readTime: readTime || "5m",
                status: status || "draft",
                publishedAt: status === "published" ? new Date() : null,
                authorId: session.user.id!,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        title: true,
                    },
                },
            },
        });

        // Revalidate the blog index page
        revalidatePath("/blog");

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            { error: "Failed to create post", details: (error as Error).message },
            { status: 500 }
        );
    }
}
