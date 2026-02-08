import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

import "dotenv/config";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    // Create admin user
    const user = await prisma.user.upsert({
        where: { email: "maniko@clavr.me" },
        update: {},
        create: {
            email: "maniko@clavr.me",
            name: "Maniko",
            role: "admin",
            image: "/characters/maniko.png",
        },
    });
    console.log("Created/found admin user:", user.email);

    // Full blog posts with complete content
    const posts = [
        {
            title: "Stop Revenue Leaks with AI",
            slug: "stop-revenue-leaks",
            excerpt: "How missed follow-ups and lost context are silently draining your Q4 pipeline.",
            category: "Revenue",
            color: "bg-orange-50",
            readTime: "5m",
            status: "published",
            publishedAt: new Date("2026-02-04"),
            content: {
                type: "doc",
                content: [
                    {
                        type: "paragraph",
                        attrs: { class: "lead" },
                        content: [{ type: "text", text: "It starts small. A promising demo that ended with \"circle back next week.\" A follow-up email that got buried in a chaotic inbox. A crucial detail about a prospect's budget constraint that was mentioned in a Zoom call but never made it to Salesforce." }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "These aren't dramatic failures. They're quiet ones. And they're happening across your team right now, every single day." }]
                    },
                    {
                        type: "heading",
                        attrs: { level: 2 },
                        content: [{ type: "text", text: "The Hidden Cost of \"I'll Get to It Later\"" }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "Your reps aren't lazy or forgetful. They're overwhelmed. Between discovery calls, internal syncs, and the constant pressure to hit quota, the administrative work of sales becomes noise. Important noise, but noise nonetheless." }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "And here's the uncomfortable truth: your CRM data is probably a mess. Not because anyone wants it that way, but because real-time data entry is simply incompatible with the pace of modern sales." }]
                    },
                    {
                        type: "heading",
                        attrs: { level: 2 },
                        content: [{ type: "text", text: "What a 10% Drop in Follow-Up Rate Really Means" }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "Let's do some quick math. If your team handles 100 qualified opportunities a quarter, and 10% fall through the cracks due to missed follow-ups or incomplete context, that's 10 deals you never even got to compete for." }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "At a $50K ACV, that's half a million dollars left on the table. Every. Single. Quarter." }]
                    },
                    {
                        type: "heading",
                        attrs: { level: 2 },
                        content: [{ type: "text", text: "AI Can Catch What You Miss" }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "This isn't about replacing your reps. It's about augmenting them. AI can listen to calls and extract action items. It can parse emails for commitments and deadlines. It can nudge your team when a deal has gone cold." }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "More importantly, it can do this without requiring anyone to change their workflow. The best AI tools are invisible. They work in the background, quietly ensuring that nothing important slips through." }]
                    },
                    {
                        type: "blockquote",
                        content: [{ type: "paragraph", content: [{ type: "text", text: "\"Revenue leaks aren't dramatic explosions. They're slow drips you don't notice until the quarter ends.\"" }] }]
                    },
                    {
                        type: "heading",
                        attrs: { level: 2 },
                        content: [{ type: "text", text: "The Fix Is Simpler Than You Think" }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "Start by auditing your current process. Where are deals getting stuck? Which stages have the highest drop-off? What information tends to be missing when deals die?" }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "Then, layer in AI to address those specific gaps. Don't boil the ocean. Solve one problem well, measure the impact, and expand from there." }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "Your Q4 pipeline doesn't have to leak. You just need to see where the holes are." }]
                    },
                ]
            },
        },
        {
            title: "The Future of Work is Ambient",
            slug: "future-of-work-ambient",
            excerpt: "Why the next generation of tools won't look like tools at all.",
            category: "Engineering",
            color: "bg-blue-50",
            readTime: "4m",
            status: "published",
            publishedAt: new Date("2026-02-06"),
            content: {
                type: "doc",
                content: [
                    {
                        type: "paragraph",
                        attrs: { class: "lead" },
                        content: [{ type: "text", text: "I've been thinking a lot these days about what's next. Not what product we'll build next quarter, but what work itself will look like in five years." }]
                    },
                    {
                        type: "heading",
                        attrs: { level: 2 },
                        content: [{ type: "text", text: "The Tool Paradox" }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "Here's something that keeps me up at night: every productivity tool we use today was designed to be used. That sounds obvious, but stay with me." }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "Calendars need to be checked. Task managers need to be updated. CRMs need to be fed. We spend so much time managing our tools that the tools themselves become a second job." }]
                    },
                    {
                        type: "blockquote",
                        content: [{ type: "paragraph", content: [{ type: "text", text: "\"You don't actually want a to-do list. You want things to get done.\"" }] }]
                    },
                    {
                        type: "heading",
                        attrs: { level: 2 },
                        content: [{ type: "text", text: "What Ambient Really Means" }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "At Clavr, we talk a lot about ambient computing. But let me be clear about what that means (and doesn't mean)." }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "It doesn't mean everything becomes automatic. You still need to make decisions, set priorities, have conversations. The soul of work stays human." }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "But the mechanics of work? The admin stuff? That's what fades into the background. Your calendar updates itself after a meeting. Your CRM captures the context you discussed. Your follow-ups write themselves." }]
                    },
                    {
                        type: "heading",
                        attrs: { level: 2 },
                        content: [{ type: "text", text: "From Reactive to Proactive" }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "The biggest shift isn't about automation. It's about anticipation." }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "Right now, tools sit there and wait for you to use them. The next generation won't wait. They'll see that you have a meeting with a prospect tomorrow and proactively surface the context you need. They'll notice that an important thread has gone cold and nudge you before you lose the deal." }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "Imagine a world where your tools are always a step ahead, helping before you even ask." }]
                    },
                    {
                        type: "heading",
                        attrs: { level: 2 },
                        content: [{ type: "text", text: "Voice: The Most Natural Interface" }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "There's another shift coming that I'm even more excited about: voice. Think about it. We've been typing into machines for decades, but that was never the natural way humans communicate. We talk. We have conversations. We think out loud." }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "The future of work won't be about learning new interfaces. It'll be about using the interface you've had since birth: your voice. You'll walk into the office and say, \"What's on my plate today?\" And your ambient assistant will just tell you. No screens to check. No apps to open. Just a conversation." }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "Voice + ambient AI is a powerful combination. One handles the what (proactively surfacing what matters), the other handles the how (letting you interact naturally). Together, they make tools feel less like tools and more like teammates." }]
                    },
                    {
                        type: "heading",
                        attrs: { level: 2 },
                        content: [{ type: "text", text: "The Best Tools Disappear" }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "That's the future we're building toward. Not better dashboards or prettier interfaces. Just... less. Less friction. Less mental overhead. Less of your brain spent on coordination and more on creation." }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "The best tools won't feel like tools at all. They'll feel like having a really, really great team, one that anticipates what you need and lets you just ask for what you want." }]
                    },
                ]
            },
        },
    ];

    for (const postData of posts) {
        const post = await prisma.post.upsert({
            where: { slug: postData.slug },
            update: {
                title: postData.title,
                excerpt: postData.excerpt,
                content: postData.content,
                category: postData.category,
                color: postData.color,
                readTime: postData.readTime,
                status: postData.status,
                publishedAt: postData.publishedAt,
            },
            create: {
                ...postData,
                authorId: user.id,
            },
        });
        console.log("✓ Migrated post:", post.title);
    }

    console.log("\n🎉 All blog content migrated successfully!");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
