
import pg from 'pg';
const { Pool } = pg;

// Use the local database URL directly
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jYUotkilr8J6@ep-young-snow-aimirocy-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
    connectionString,
});

async function main() {
    console.log('Connecting to database...');
    const client = await pool.connect();

    try {
        console.log('Connected. Finding author...');

        // 1. Find Author
        let authorRes = await client.query("SELECT id, name FROM \"User\" WHERE name ILIKE '%Maniko%' LIMIT 1");
        if (authorRes.rows.length === 0) {
            console.log('Maniko not found, finding any user...');
            authorRes = await client.query("SELECT id, name FROM \"User\" LIMIT 1");
        }

        if (authorRes.rows.length === 0) {
            throw new Error('No users found in database.');
        }

        const author = authorRes.rows[0];
        console.log(`Found author: ${author.name} (${author.id})`);

        // 2. Prepare Content
        const content = JSON.stringify({
            type: 'doc',
            content: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: "We've all been there. You're in the zone, deep in a problem, and ping! A notification pulls you away. You check it, reply, and then... what were you doing again? That focused state is gone, and getting it back takes way longer than the distraction itself.",
                        },
                    ],
                },
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: "This constant jumping between apps like Email, Calendar, Todos, Linear, Asana, Notion, and Slack is the biggest drain on modern productivity. Your brain isn't wired to swap contexts every forty seconds. It needs continuity.",
                        },
                    ],
                },
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: "It feels like part of the job, but the actual cost is staggering. Research shows the average knowledge worker switches apps over 1,200 times every single day. That's once every 24 seconds.",
                        },
                    ],
                },
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: "Every one of those switches levies a tax. Studies suggest it takes about 23 minutes to fully regain deep focus after a distraction. When you do the math, it means most of us spend a huge chunk of our day just trying to remember what we were doing.",
                        },
                    ],
                },
                {
                    type: 'blockquote',
                    content: [
                        {
                            type: 'text',
                            text: "We are not multitasking. We are just doing multiple things badly, and slowly.",
                        },
                    ],
                },
                {
                    type: 'heading',
                    attrs: { level: 2 },
                    content: [{ type: 'text', text: 'The Cognitive Cost' }],
                },
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: "This phenomenon is called Attention Residue. When you jump from a sales call to a code review, your brain doesn't cut over cleanly. A part of your attention remains stuck on the last task. By 2 PM, you're exhausted not because you did too much work, but because your brain has been running a marathon of context switches.",
                        },
                    ],
                },
                {
                    type: 'heading',
                    attrs: { level: 2 },
                    content: [{ type: 'text', text: 'Meet Your Proactive Coworker' }],
                },
                {
                    type: 'paragraph',
                    content: [{ type: 'text', text: "Solving this doesn't mean building another dashboard you have to manage. It means having an intelligent system that works for you." }],
                },
                {
                    type: 'paragraph',
                    content: [{ type: 'text', text: "Clavr isn't just a passive tool. It is a proactive AI coworker. While you focus on the deep work only you can do, Clavr is in the background, connecting the dots between your chats, documents, and meetings." }],
                },
                {
                    type: 'paragraph',
                    content: [{ type: 'text', text: "Need to know where a project stands? You don't have to play archaeologist across five different apps. You simply talk to Clavr in natural language, just like you would a teammate. \"What's the latest on the Q3 roadmap?\" \"Did we send that contract to Acme?\"" }],
                },
                {
                    type: 'paragraph',
                    content: [{ type: 'text', text: "It answers instantly with full context because it's been paying attention the whole time. It brings the information to you so you never have to pay the toggle tax again." }],
                },
                {
                    type: 'blockquote',
                    content: [
                        {
                            type: 'text',
                            text: "The goal is to make the technology disappear, so you can just focus on the work.",
                        },
                    ],
                },
                {
                    type: 'heading',
                    attrs: { level: 2 },
                    content: [{ type: 'text', text: 'Stop the Toggle Tax' }],
                },
                {
                    type: 'paragraph',
                    content: [{ type: 'text', text: "That is why we built Clavr. We wanted to stop the toggle tax. Instead of forcing you to be the bridge between your tools, Clavr acts as the intelligent layer that connects them all." }],
                },
                {
                    type: 'paragraph',
                    content: [{ type: 'text', text: "Imagine looking at a customer profile and instantly seeing everything: the latest emails, the active engineering tickets, the signed contracts, and the upcoming calendar invites. You don't have to open four different tabs and search four different times. The context is just there, waiting for you." }],
                },
                {
                    type: 'paragraph',
                    content: [{ type: 'text', text: "Clavr does the heavy lifting of connecting the dots across your digital life. It turns a fragmented mess of apps into a coherent stream of work, so you can stop switching contexts and start actually finishing things." }],
                },
            ]
        });

        const now = new Date();

        // 3. Upsert Post
        // Check if exists
        const checkRes = await client.query("SELECT id FROM \"Post\" WHERE slug = $1", ['context-switching']);

        if (checkRes.rows.length > 0) {
            console.log('Updating existing post...');
            await client.query(`
            UPDATE "Post" SET
                title = $1,
                excerpt = $2,
                content = $3,
                category = $4,
                color = $5,
                "readTime" = $6,
                status = $7,
                "publishedAt" = $8,
                "authorId" = $9,
                "updatedAt" = $10
            WHERE slug = $11
        `, [
                'Context Switching',
                'The true cognitive cost of jumping between Slack, Gmail, and Linear.',
                content,
                'Productivity',
                'bg-green-50',
                '6m',
                'published',
                now,
                author.id,
                now,
                'context-switching'
            ]);
            console.log('Post updated.');
        } else {
            console.log('Creating new post...');
            // Need to generate CUID or let DB handle it? Schema says @default(cuid()).
            // In raw SQL we might need to generate it or rely on default if implemented at DB level?
            // Prisma @default(cuid()) is handled by Prisma Client, not DB usually.
            // We will generate a simple ID if needed or trust the DB if it has a function?
            // Postgres doesn't have cuid() built-in. I'll generate a random string ID.

            const id = 'post_' + Math.random().toString(36).substring(2, 15);

            await client.query(`
            INSERT INTO "Post" (
                id, slug, title, excerpt, content, category, color, "readTime", status, "publishedAt", "authorId", "createdAt", "updatedAt"
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        `, [
                id,
                'context-switching',
                'Context Switching',
                'The true cognitive cost of jumping between Slack, Gmail, and Linear.',
                content,
                'Productivity',
                'bg-green-50',
                '6m',
                'published',
                now,
                author.id,
                now,
                now
            ]);
            console.log(`Post created with ID: ${id}`);
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
