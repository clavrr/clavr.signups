import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

// GET /api/posts/[id] - Get a single post by ID or slug
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        // Try to find by ID first, then by slug
        const post = await prisma.post.findFirst({
            where: {
                OR: [{ id }, { slug: id }],
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        role: true,
                        title: true,
                    },
                },
            },
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // Only return published posts to non-authenticated users
        const session = await getServerSession(authOptions);
        if (!session?.user && post.status !== "published") {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
}

// PUT /api/posts/[id] - Update a post
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const body = await request.json();
        const { title, slug, excerpt, content, category, color, readTime, status } = body;

        // Check if post exists
        const existing = await prisma.post.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // Check if new slug conflicts with another post
        if (slug && slug !== existing.slug) {
            const slugConflict = await prisma.post.findUnique({ where: { slug } });
            if (slugConflict) {
                return NextResponse.json(
                    { error: "A post with this slug already exists" },
                    { status: 400 }
                );
            }
        }

        // Determine publishedAt
        let publishedAt = existing.publishedAt;
        if (status === "published" && existing.status !== "published") {
            publishedAt = new Date();
        } else if (status === "draft") {
            publishedAt = null;
        }

        // Check permissions
        if (session.user.role !== "admin" && existing.authorId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const post = await prisma.post.update({
            where: { id },
            data: {
                title,
                slug,
                excerpt,
                content,
                category,
                color,
                readTime,
                status,
                publishedAt,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });

        // Revalidate the blog index and the post page itself
        revalidatePath("/blog");
        if (post.slug) {
            revalidatePath(`/blog/${post.slug}`);
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json(
            { error: "Failed to update post", details: (error as Error).message },
            { status: 500 }
        );
    }
}

// DELETE /api/posts/[id] - Delete a post
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const post = await prisma.post.findUnique({ where: { id } });
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // Check permissions
        if (session.user.role !== "admin" && post.authorId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        await prisma.post.delete({ where: { id } });

        // Revalidate the blog index and the post page
        revalidatePath("/blog");
        if (post.slug) {
            revalidatePath(`/blog/${post.slug}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json(
            { error: "Failed to delete post", details: (error as Error).message },
            { status: 500 }
        );
    }
}
