
import { prisma } from '@/lib/db';
import FeaturedPostClient from './FeaturedPostClient';

export default async function FeaturedPost() {
    try {
        // Get 24 hours ago
        const oneDayAgo = new Date();
        oneDayAgo.setHours(oneDayAgo.getHours() - 24);

        // Fetch posts published in the last 24 hours
        let posts = await prisma.post.findMany({
            where: {
                status: 'published',
                publishedAt: { gte: oneDayAgo }
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
