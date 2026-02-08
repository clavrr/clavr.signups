import "dotenv/config";
import { prisma } from "../lib/db";

async function main() {
    console.log("Starting migration to Neon...");

    // Create user first
    const user = await prisma.user.upsert({
        where: { id: "cmlcvvnpu0000u6y5k8n5i2x7" },
        update: {},
        create: {
            id: "cmlcvvnpu0000u6y5k8n5i2x7",
            name: "Anthony Maniko",
            email: "maniko@clavr.me",
            image: "/characters/maniko.png",
            role: "admin",
            bio: "Building",
            title: "Founder & CEO, Clavr",
        },
    });
    console.log("User migrated:", user.email);

    // Create posts
    const post1 = await prisma.post.upsert({
        where: { id: "cmlcvvnq20001u6y5xnyk7zve" },
        update: {},
        create: {
            id: "cmlcvvnq20001u6y5xnyk7zve",
            slug: "stop-revenue-leaks",
            title: "Stop Revenue Leaks with AI",
            excerpt: "How AI-powered automation can help B2B companies identify and prevent revenue leakage across their operations.",
            content: { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "text": "Revenue leaks are silent killers in B2B businesses. They happen gradually, often unnoticed, until they compound into significant losses.", "type": "text" }] }, { "type": "heading", "attrs": { "level": 2 }, "content": [{ "text": "What Are Revenue Leaks?", "type": "text" }] }, { "type": "paragraph", "content": [{ "text": "Revenue leaks occur when money slips through the cracks due to inefficient processes, missed billing, or untracked expenses.", "type": "text" }] }] },
            category: "Product",
            color: "bg-blue-50",
            readTime: "5m",
            status: "published",
            publishedAt: new Date("2026-02-08T05:08:20.097Z"),
            authorId: "cmlcvvnpu0000u6y5k8n5i2x7",
        },
    });
    console.log("Post 1 migrated:", post1.title);

    const post2 = await prisma.post.upsert({
        where: { id: "cmlcvvnq60002u6y54ox3b75u" },
        update: {},
        create: {
            id: "cmlcvvnq60002u6y54ox3b75u",
            slug: "future-of-work-ambient",
            title: "The Future of Work is Ambient",
            excerpt: "The best tools don't demand attention. They work quietly so you can focus on what matters.",
            content: { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "text": "When I talk about ambient computing, I'm not throwing around a buzzword. It's a design philosophy, and the idea is beautifully simple: technology should fade into the background and work on your behalf without requiring constant attention.", "type": "text" }] }, { "type": "heading", "attrs": { "level": 2 }, "content": [{ "text": "From Reactive to Proactive", "type": "text" }] }, { "type": "paragraph", "content": [{ "text": "Most software today is reactive. You open the app, you click buttons, you get results. But ambient systems flip that on its head. They're anticipatory.", "type": "text" }] }, { "type": "heading", "attrs": { "level": 2 }, "content": [{ "text": "Voice: The Most Natural Interface", "type": "text" }] }, { "type": "paragraph", "content": [{ "text": "Humans have been talking to each other for tens of thousands of years. We've been typing on keyboards for maybe fifty. Voice isn't just a convenience feature. It's a fundamental rethinking of how we interact with computers.", "type": "text" }] }, { "type": "heading", "attrs": { "level": 2 }, "content": [{ "text": "Where We Go From Here", "type": "text" }] }, { "type": "paragraph", "content": [{ "text": "We're at a turning point. Large language models have made it possible to understand messy, unstructured information at scale. The future of work tools isn't about adding more features to existing apps.", "type": "text" }] }] },
            category: "Engineering",
            color: "bg-yellow-50",
            readTime: "6m",
            status: "published",
            publishedAt: new Date("2026-02-08T04:45:31.213Z"),
            authorId: "cmlcvvnpu0000u6y5k8n5i2x7",
        },
    });
    console.log("Post 2 migrated:", post2.title);

    console.log("Migration complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
