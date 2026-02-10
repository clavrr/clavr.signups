
import { prisma } from '../lib/db';

async function main() {
    console.log('Start seeding Context Switching post...');

    // 1. Find the author (Maniko) or the first user
    let author = await prisma.user.findFirst({
        where: { name: { contains: 'Maniko' } },
    });

    if (!author) {
        console.log('Maniko user not found, finding any user...');
        author = await prisma.user.findFirst();
    }

    if (!author) {
        console.error('No users found. Please create a user first.');
        return;
    }

    console.log(`Found author: ${author.name} (${author.id})`);

    // 2. Define the content (JSON structure matching Tiptap)
    // We are removing the narrative intro as requested.
    const content = {
        type: 'doc',
        content: [
            // Lead paragraph (The stat)
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'text',
                        text: 'Research shows the average knowledge worker switches between apps over 1,200 times per day. That is not a typo. That\'s once every 24 seconds, assuming an 8-hour workday.',
                    },
                ],
            },
            // Attention Residue Section
            {
                type: 'heading',
                attrs: { level: 2 },
                content: [{ type: 'text', text: 'Attention Residue' }],
            },
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'text',
                        text: 'Every switch forces your brain to dump its short-term working memory ("What was I writing in that email?") and load a new context ("What does this Jira ticket need?"). It takes milliseconds to click, but seconds or minutes for your brain to catch up.',
                    },
                ],
            },
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'text',
                        text: 'Sophie Leroy, a business professor, coined the term "Attention Residue." It explains why you can\'t focus on Developer B\'s code review immediately after failing to close a deal on a sales call. Part of your brain is still stuck on the previous task.',
                    },
                ],
            },
            {
                type: 'blockquote',
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: '"We are not multitasking. We are just doing multiple things badly, and slowly."',
                            },
                        ],
                    },
                ],
            },
            // The Cost of Fragmentation
            {
                type: 'heading',
                attrs: { level: 2 },
                content: [{ type: 'text', text: 'The Cost of Fragmentation' }],
            },
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'text',
                        text: 'This fragmentation is the silent killer of deep work. You can\'t write a great strategy document in 3-minute bursts between Slack messages. We\'ve confused "connectivity" with "productivity." Being connected to everything means being focused on nothing.',
                    },
                ],
            },
            // Bringing Context Back
            {
                type: 'heading',
                attrs: { level: 2 },
                content: [{ type: 'text', text: 'Bringing Context Back' }],
            },
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'text',
                        text: 'The solution isn\'t to delete Slack or go back to pen and paper. It\'s to stop making the human be the router. Your tools should share context. If you\'re looking at a customer in your CRM, your email and calendar history with them should be right there.',
                    },
                ],
            },
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'text',
                        text: 'When context travels with you, the tax of switching disappears. You\'re no longer reloading your brain\'s RAM; you\'re just turning the page.',
                    },
                ],
            },
        ],
    };

    // 3. Upsert the post
    const post = await prisma.post.upsert({
        where: { slug: 'context-switching' },
        update: {
            title: 'Context Switching',
            excerpt: 'The true cognitive cost of jumping between Slack, Gmail, and Linear.',
            content: content,
            category: 'Productivity',
            color: 'bg-green-50',
            readTime: '6m',
            status: 'published',
            publishedAt: new Date(), // Set to now so it appears in "New"
            authorId: author.id,
        },
        create: {
            slug: 'context-switching',
            title: 'Context Switching',
            excerpt: 'The true cognitive cost of jumping between Slack, Gmail, and Linear.',
            content: content,
            category: 'Productivity',
            color: 'bg-green-50',
            readTime: '6m',
            status: 'published',
            publishedAt: new Date(),
            authorId: author.id,
        },
    });

    console.log(`Upserted post: ${post.title} (${post.id})`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
