import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = session.user.email.toLowerCase();

        let user = await prisma.user.findUnique({
            where: { email },
            select: {
                name: true,
                email: true,
                image: true,
                title: true,
                bio: true,
            },
        });

        // If user doesn't exist in DB (e.g. legacy session), return default structure WITHOUT creating
        if (!user) {
            console.log("User not found in DB, returning default structure for:", session.user.email);
            return NextResponse.json({
                name: session.user.name || session.user.email.split("@")[0],
                email: session.user.email,
                image: session.user.image,
                title: "",
                bio: "",
            });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json(
            { error: "Failed to fetch profile", details: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();

        const { name, title, bio, image } = body;

        const email = session.user.email.toLowerCase();

        const user = await prisma.user.update({
            where: { email },
            data: {
                name,
                title,
                bio,
                image,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json(
            { error: "Failed to update profile", details: (error as Error).message },
            { status: 500 }
        );
    }
}
