
import { prisma } from '@/lib/db';
import FeaturedPostClient from './FeaturedPostClient';

export default async function FeaturedPost() {
    try {
        // Get today's start (midnight)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Fetch all posts published today
        let posts = await prisma.post.findMany({
            where: {
                status: 'published',
                publishedAt: { gte: today }
            },
            orderBy: { publishedAt: 'desc' },
            select: { slug: true, title: true }
        });

        // If no posts today, get the latest one
        if (posts.length === 0) {
            posts = await prisma.post.findMany({
                where: {
                    status: 'published',
                    publishedAt: { not: null }
                },
                orderBy: { publishedAt: 'desc' },
                take: 1,
                select: { slug: true, title: true }
            });
        }

        if (posts.length === 0) return null;

        return <FeaturedPostClient posts={posts} />;
    } catch (error) {
        console.error("Failed to fetch featured post:", error);
        return null;
    }
}
