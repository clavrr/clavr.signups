
import { prisma } from "@/lib/db";
import BlogClient, { Post } from "./BlogClient";

// Fallback static posts for when database is not available
const fallbackPosts: Post[] = [
    {
        id: "1",
        title: "Stop Revenue Leaks with AI",
        slug: "stop-revenue-leaks",
        excerpt: "How missed follow-ups and lost context are silently draining your Q4 pipeline.",
        category: "Revenue",
        readTime: "5m",
        color: "bg-orange-50",
        status: "published",
        author: {
            id: "1",
            name: "Maniko",
            title: "Founder & CEO, Clavr",
            image: "/characters/maniko.png",
        }
    },
    {
        id: "3",
        title: "Context Switching",
        slug: "context-switching",
        excerpt: "The true cognitive cost of jumping between Slack, Gmail, and Linear.",
        category: "Productivity",
        readTime: "6m",
        color: "bg-green-50",
        status: "published",
        author: {
            id: "1",
            name: "Maniko",
            title: "Founder & CEO, Clavr",
            image: "/characters/maniko.png",
        }
    },
    {
        id: "2",
        title: "The Future of Work is Ambient",
        slug: "future-of-work-ambient",
        excerpt: "Why the next generation of tools won't look like tools at all.",
        category: "Engineering",
        readTime: "4m",
        color: "bg-blue-50",
        status: "published",
        author: {
            id: "1",
            name: "Maniko",
            image: "/characters/maniko.png",
        }
    },
    {
        id: "4",
        title: "Introducing TalkLY",
        slug: "talkly-podcast",
        excerpt: "Conversations on flow, focus, and the future of work. No hustle porn, just deep dives.",
        category: "Podcast",
        readTime: "3m",
        color: "bg-purple-50",
        status: "published",
        author: {
            id: "1",
            name: "Maniko",
            image: "/characters/maniko.png",
        }
    },
];

async function getPosts(): Promise<Post[]> {
    try {
        const posts = await prisma.post.findMany({
            where: { status: "published" },
            orderBy: { createdAt: "desc" },
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

        // Use fallback if no posts in DB (e.g. initial setup)
        if (!posts || posts.length === 0) {
            return fallbackPosts;
        }

        // Map Prisma result to our component's Post interface
        return posts.map(post => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            category: post.category,
            color: post.color,
            readTime: post.readTime,
            status: post.status,
            author: {
                id: post.author.id,
                name: post.author.name,
                image: post.author.image,
                title: post.author.title || undefined,
            }
        }));
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return fallbackPosts;
    }
}

export default async function BlogPage() {
    const posts = await getPosts();

    return <BlogClient initialPosts={posts} />;
}
