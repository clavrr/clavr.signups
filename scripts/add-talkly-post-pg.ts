
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
                            text: "We spend so much time building tools for productivity, but rarely do we stop to talk about the *why*. Why do we work the way we do? Why is burnout the default setting for high performers?",
                        },
                    ],
                },
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: "Software is only half the battle. The other half is the mindset, the culture, and the human operating system that drives it all.",
                        },
                    ],
                },
                {
                    type: 'heading',
                    attrs: { level: 2 },
                    content: [{ type: 'text', text: 'Conversations on Flow & Focus' }],
                },
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: "That's why we're launching TalkLY. It's a new podcast where we peel back the layers of modern work. No hustle porn. No \"crushing it\" at 4 AM. Just honest, deep conversations about how to build meaningful things without losing your soul.",
                        },
                    ],
                },
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: "We're talking to founders, creators, and thinkers who are redefining what it means to be productive. We explore their workflows, their struggles with distraction, and the systems they use to find flow in a noisy world.",
                        },
                    ],
                },
                {
                    type: 'blockquote',
                    content: [
                        {
                            type: 'text',
                            text: "Productivity isn't about doing more things. It's about doing the right things, with clarity and intent.",
                        },
                    ],
                },
                {
                    type: 'heading',
                    attrs: { level: 2 },
                    content: [{ type: 'text', text: 'Listen Now' }],
                },
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: "The first episodes are live. Join us as we explore the future of work, one conversation at a time.",
                        },
                    ],
                },
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: "Search for \"TalkLY by Clavr\" wherever you get your podcasts.",
                        },
                    ],
                },
            ]
        });

        const now = new Date();

        // 3. Upsert Post
        // Check if exists
        const checkRes = await client.query("SELECT id FROM \"Post\" WHERE slug = $1", ['talkly-podcast']);

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
                'Introducing TalkLY',
                'Conversations on flow, focus, and the future of work. No hustle porn, just deep dives.',
                content,
                'Podcast',
                'bg-purple-50',
                '3m',
                'published',
                now,
                author.id,
                now,
                'talkly-podcast'
            ]);
            console.log('Post updated.');
        } else {
            console.log('Creating new post...');
            const id = 'post_' + Math.random().toString(36).substring(2, 15);

            await client.query(`
            INSERT INTO "Post" (
                id, slug, title, excerpt, content, category, color, "readTime", status, "publishedAt", "authorId", "createdAt", "updatedAt"
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        `, [
                id,
                'talkly-podcast',
                'Introducing TalkLY',
                'Conversations on flow, focus, and the future of work. No hustle porn, just deep dives.',
                content,
                'Podcast',
                'bg-purple-50',
                '3m',
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
