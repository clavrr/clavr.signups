
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { BlogPostSkeleton } from "@/components/ui/skeleton";
import { isValidElement } from "react";

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: any;
    category: string | null;
    color: string;
    readTime: string;
    status: string;
    publishedAt: string | null;
    author: {
        id: string;
        name: string | null;
        image: string | null;
        role?: string;
        title?: string;
    };
}

// Fallback static posts - keep existing hardcoded content for backwards compatibility
const fallbackPosts: Record<string, Post> = {
    "stop-revenue-leaks": {
        id: "1",
        title: "Stop Revenue Leaks with AI",
        excerpt: "How missed follow-ups and lost context are silently draining your Q4 pipeline.",
        category: "Revenue",
        slug: "stop-revenue-leaks",
        readTime: "5m",
        status: "published",
        publishedAt: "2026-02-04",
        color: "bg-orange-50",
        author: {
            id: "1",
            name: "Maniko",
            image: "/characters/maniko.png",
            role: "Founder & CEO, Clavr"
        },
        content: (
            <>
                <p className="lead text-xl md:text-2xl font-medium text-black/80 mb-8 leading-relaxed">
                    It starts small. A promising demo that ended with "circle back next week." A follow-up email that got buried in a chaotic inbox. A crucial detail about a prospect's budget constraint that was mentioned in a Zoom call but never made it to Salesforce.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    These aren't dramatic failures. They're quiet ones. And they're happening across your team right now, every single day.
                </p>

                <h2 className="text-2xl font-bold text-black mt-10 mb-4">The Hidden Cost of "I'll Get to It Later"</h2>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Your reps aren't lazy or forgetful. They're overwhelmed. Between discovery calls, internal syncs, and the constant pressure to hit quota, the administrative work of sales becomes noise. Important noise, but noise nonetheless.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    And here's the uncomfortable truth: your CRM data is probably a mess. Not because anyone wants it that way, but because real-time data entry is simply incompatible with the pace of modern sales.
                </p>

                <h2 className="text-2xl font-bold text-black mt-10 mb-4">What a 10% Drop in Follow-Up Rate Really Means</h2>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Let's do some quick math. If your team handles 100 qualified opportunities a quarter, and 10% fall through the cracks due to missed follow-ups or incomplete context, that's 10 deals you never even got to compete for.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    At a $50K ACV, that's half a million dollars left on the table. Every. Single. Quarter.
                </p>

                <h2 className="text-2xl font-bold text-black mt-10 mb-4">AI Can Catch What You Miss</h2>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    This isn't about replacing your reps. It's about augmenting them. AI can listen to calls and extract action items. It can parse emails for commitments and deadlines. It can nudge your team when a deal has gone cold.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    More importantly, it can do this without requiring anyone to change their workflow. The best AI tools are invisible. They work in the background, quietly ensuring that nothing important slips through.
                </p>

                <blockquote className="border-l-4 border-black pl-6 my-8 italic text-xl text-black/60">
                    "Revenue leaks aren't dramatic explosions. They're slow drips you don't notice until the quarter ends."
                </blockquote>

                <h2 className="text-2xl font-bold text-black mt-10 mb-4">The Fix Is Simpler Than You Think</h2>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Start by auditing your current process. Where are deals getting stuck? Which stages have the highest drop-off? What information tends to be missing when deals die?
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Then, layer in AI to address those specific gaps. Don't boil the ocean. Solve one problem well, measure the impact, and expand from there.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Your Q4 pipeline doesn't have to leak. You just need to see where the holes are.
                </p>
            </>
        )
    },
    "future-of-work-ambient": {
        id: "2",
        title: "The Future of Work is Ambient",
        excerpt: "Why the next generation of tools won't look like tools at all.",
        category: "Engineering",
        slug: "future-of-work-ambient",
        readTime: "4m",
        status: "published",
        publishedAt: "2026-02-06",
        color: "bg-blue-50",
        author: {
            id: "1",
            name: "Maniko",
            image: "/characters/maniko.png",
            role: "Founder & CEO, Clavr"
        },
        content: (
            <>
                <p className="lead text-xl md:text-2xl font-medium text-black/80 mb-8 leading-relaxed">
                    I've been thinking a lot these days about what's next. Not what product we'll build next quarter, but what work itself will look like in five years.
                </p>

                <h2 className="text-2xl font-bold text-black mt-10 mb-4">The Tool Paradox</h2>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Here's something that keeps me up at night: every productivity tool we use today was designed to be used. That sounds obvious, but stay with me.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Calendars need to be checked. Task managers need to be updated. CRMs need to be fed. We spend so much time managing our tools that the tools themselves become a second job.
                </p>

                <blockquote className="border-l-4 border-black pl-6 my-8 italic text-xl text-black/60">
                    "You don't actually want a to-do list. You want things to get done."
                </blockquote>

                <h2 className="text-2xl font-bold text-black mt-10 mb-4">What Ambient Really Means</h2>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    At Clavr, we talk a lot about ambient computing. But let me be clear about what that means (and doesn't mean).
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    It doesn't mean everything becomes automatic. You still need to make decisions, set priorities, have conversations. The soul of work stays human.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    But the mechanics of work? The admin stuff? That's what fades into the background. Your calendar updates itself after a meeting. Your CRM captures the context you discussed. Your follow-ups write themselves.
                </p>

                <h2 className="text-2xl font-bold text-black mt-10 mb-4">From Reactive to Proactive</h2>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    The biggest shift isn't about automation. It's about anticipation.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Right now, tools sit there and wait for you to use them. The next generation won't wait. They'll see that you have a meeting with a prospect tomorrow and proactively surface the context you need. They'll notice that an important thread has gone cold and nudge you before you lose the deal.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Imagine a world where your tools are always a step ahead, helping before you even ask.
                </p>

                <h2 className="text-2xl font-bold text-black mt-10 mb-4">Voice: The Most Natural Interface</h2>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    There's another shift coming that I'm even more excited about: voice. Think about it. We've been typing into machines for decades, but that was never the natural way humans communicate. We talk. We have conversations. We think out loud.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    The future of work won't be about learning new interfaces. It'll be about using the interface you've had since birth: your voice. You'll walk into the office and say, "What's on my plate today?" And your ambient assistant will just tell you. No screens to check. No apps to open. Just a conversation.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Voice + ambient AI is a powerful combination. One handles the what (proactively surfacing what matters), the other handles the how (letting you interact naturally). Together, they make tools feel less like tools and more like teammates.
                </p>

                <h2 className="text-2xl font-bold text-black mt-10 mb-4">The Best Tools Disappear</h2>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    That's the future we're building toward. Not better dashboards or prettier interfaces. Just... less. Less friction. Less mental overhead. Less of your brain spent on coordination and more on creation.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    The best tools won't feel like tools at all. They'll feel like having a really, really great team, one that anticipates what you need and lets you just ask for what you want.
                </p>
            </>
        )
    },
    "context-switching": {
        id: "3",
        title: "Context Switching",
        excerpt: "The true cognitive cost of jumping between Slack, Gmail, and Linear.",
        category: "Productivity",
        slug: "context-switching",
        readTime: "6m",
        status: "published",
        publishedAt: "2026-02-09",
        color: "bg-green-50",
        author: {
            id: "1",
            name: "Maniko",
            image: "/characters/maniko.png",
            role: "Founder & CEO, Clavr"
        },
        content: (
            <>
                <p className="lead text-xl md:text-2xl font-medium text-black/80 mb-8 leading-relaxed">
                    We've all been there. You're in the zone, deep in a problem, and ping! A notification pulls you away. You check it, reply, and then... what were you doing again? That focused state is gone, and getting it back takes way longer than the distraction itself.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    This constant jumping between apps like Email, Calendar, Todos, Linear, Asana, Notion, and Slack is the biggest drain on modern productivity. Your brain isn't wired to swap contexts every forty seconds. It needs continuity.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    It feels like part of the job, but the actual cost is staggering. Research shows the average knowledge worker switches apps over 1,200 times every single day. That's once every 24 seconds.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Every one of those switches levies a tax. Studies suggest it takes about 23 minutes to fully regain deep focus after a distraction. When you do the math, it means most of us spend a huge chunk of our day just trying to remember what we were doing.
                </p>

                <blockquote className="border-l-4 border-black pl-6 my-8 italic text-xl text-black/60">
                    "We are not multitasking. We are just doing multiple things badly, and slowly."
                </blockquote>

                <h2 className="text-2xl font-bold text-black mt-10 mb-4">The Cognitive Cost</h2>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    This phenomenon is called Attention Residue. When you jump from a sales call to a code review, your brain doesn't cut over cleanly. A part of your attention remains stuck on the last task. By 2 PM, you're exhausted not because you did too much work, but because your brain has been running a marathon of context switches.
                </p>

                <h2 className="text-2xl font-bold text-black mt-10 mb-4">Meet Your Proactive Coworker</h2>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Solving this doesn't mean building another dashboard you have to manage. It means having an intelligent system that works for you.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Clavr isn't just a passive tool. It is a proactive AI coworker. While you focus on the deep work only you can do, Clavr is in the background, connecting the dots between your chats, documents, and meetings.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Need to know where a project stands? You don't have to play archaeologist across five different apps. You simply talk to Clavr in natural language, just like you would a teammate. "What's the latest on the Q3 roadmap?" "Did we send that contract to Acme?"
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    It answers instantly with full context because it's been paying attention the whole time. It brings the information to you so you never have to pay the toggle tax again.
                </p>

                <blockquote className="border-l-4 border-black pl-6 my-8 italic text-xl text-black/60">
                    "The goal is to make the technology disappear, so you can just focus on the work."
                </blockquote>

                <h2 className="text-2xl font-bold text-black mt-10 mb-4">Stop the Toggle Tax</h2>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    That is why we built Clavr. We wanted to stop the toggle tax. Instead of forcing you to be the bridge between your tools, Clavr acts as the intelligent layer that connects them all.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Imagine looking at a customer profile and instantly seeing everything: the latest emails, the active engineering tickets, the signed contracts, and the upcoming calendar invites. You don't have to open four different tabs and search four different times. The context is just there, waiting for you.
                </p>

                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Clavr does the heavy lifting of connecting the dots across your digital life. It turns a fragmented mess of apps into a coherent stream of work, so you can stop switching contexts and start actually finishing things.
                </p>
            </>
        )
    },
    "talkly-podcast": {
        id: "4",
        title: "Introducing TalkLY",
        slug: "talkly-podcast",
        excerpt: "Conversations on flow, focus, and the future of work. No hustle porn, just deep dives.",
        category: "Podcast",
        readTime: "3m",
        color: "bg-purple-50",
        status: "published",
        publishedAt: "2026-02-10",
        author: {
            id: "1",
            name: "Maniko",
            title: "Founder & CEO, Clavr",
            image: "/characters/maniko.png",
        },
        content: {
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
                            text: "\"Productivity isn't about doing more things. It's about doing the right things, with clarity and intent.\"",
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
        }
    },
};

// Render Tiptap JSON content to React elements
function renderTiptapContent(content: any): React.ReactNode {
    if (!content || !content.content) return null;

    return content.content.map((node: any, index: number) => {
        switch (node.type) {
            case 'paragraph':
                const text = renderInlineContent(node.content);
                // Special but subtle styling for first paragraph (larger, more relaxed, but NOT bold)
                if (index === 0) {
                    return (
                        <p key={index} className="text-xl md:text-2xl text-black/80 mb-8 leading-relaxed font-normal">
                            {text}
                        </p>
                    );
                }
                return (
                    <p key={index} className="text-lg text-black/70 mb-6 leading-relaxed">
                        {text}
                    </p>
                );
            case 'heading':
                const level = node.attrs?.level || 2;
                const headingClasses = "text-2xl font-bold text-black mt-10 mb-4";
                if (level === 1) {
                    return (
                        <h1 key={index} className={headingClasses}>
                            {renderInlineContent(node.content)}
                        </h1>
                    );
                } else if (level === 2) {
                    return (
                        <h2 key={index} className={headingClasses}>
                            {renderInlineContent(node.content)}
                        </h2>
                    );
                } else {
                    return (
                        <h3 key={index} className={headingClasses}>
                            {renderInlineContent(node.content)}
                        </h3>
                    );
                }
            case 'blockquote':
                return (
                    <blockquote key={index} className="border-l-4 border-black pl-6 my-8 italic text-xl text-black/60">
                        {node.content?.map((child: any, i: number) => (
                            <p key={i}>{renderInlineContent(child.content)}</p>
                        ))}
                    </blockquote>
                );
            case 'bulletList':
                return (
                    <ul key={index} className="list-disc pl-6 mb-6 space-y-2">
                        {node.content?.map((item: any, i: number) => (
                            <li key={i} className="text-lg text-black/70">
                                {item.content?.map((p: any) => renderInlineContent(p.content))}
                            </li>
                        ))}
                    </ul>
                );
            case 'orderedList':
                return (
                    <ol key={index} className="list-decimal pl-6 mb-6 space-y-2">
                        {node.content?.map((item: any, i: number) => (
                            <li key={i} className="text-lg text-black/70">
                                {item.content?.map((p: any) => renderInlineContent(p.content))}
                            </li>
                        ))}
                    </ol>
                );
            default:
                return null;
        }
    });
}

function renderInlineContent(content: any[]): React.ReactNode {
    if (!content) return null;

    return content.map((node, index) => {
        if (node.type === 'text') {
            let element: React.ReactNode = node.text;

            if (node.marks) {
                node.marks.forEach((mark: any) => {
                    switch (mark.type) {
                        case 'bold':
                            element = <strong key={index}>{element}</strong>;
                            break;
                        case 'italic':
                            element = <em key={index}>{element}</em>;
                            break;
                        case 'code':
                            element = <code key={index} className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">{element}</code>;
                            break;
                    }
                });
            }
            return <span key={index}>{element}</span>;
        }
        return null;
    });
}

async function getPost(slug: string): Promise<Post | null> {
    try {
        const post = await prisma.post.findUnique({
            where: { slug },
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

        if (post) {
            return {
                id: post.id,
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                content: post.content,
                category: post.category,
                color: post.color,
                readTime: post.readTime,
                status: post.status,
                publishedAt: post.publishedAt?.toISOString() || null,
                author: {
                    id: post.author.id,
                    name: post.author.name,
                    image: post.author.image,
                    title: post.author.title || undefined,
                }
            };
        }

        return null;
    } catch (error) {
        console.error("Failed to fetch post:", error);
        return null;
    }
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // First try to get from database
    let post = await getPost(slug);

    // If not in DB, check fallbacks
    if (!post && fallbackPosts[slug]) {
        post = fallbackPosts[slug];
    }

    if (!post) {
        notFound();
    }

    const authorRole = post.author?.title || post.author?.role || "Author";

    return (
        <div className="min-h-screen bg-white">
            <article className="max-w-3xl mx-auto px-6 pt-24 pb-12">
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Feed
                </Link>

                {/* Header */}
                <header className="mb-12 pb-8 border-b border-black/10">
                    {post.category && (
                        <span className="inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-semibold text-black/60 uppercase tracking-wider mb-4">
                            {post.category}
                        </span>
                    )}
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Author info */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-black/5 overflow-hidden relative">
                            {post.author?.image ? (
                                <Image
                                    src={post.author.image}
                                    alt={post.author.name || "Author"}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-2xl">
                                    👤
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-lg font-bold text-black leading-none mb-1">
                                {post.author?.name || "Anthony Maniko"}
                            </span>
                            <div className="flex items-center gap-2 text-black/40 text-sm font-medium">
                                <span>{authorRole}</span>
                                <span>•</span>
                                <span>
                                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    }) : 'Recently'}
                                </span>
                                <span>•</span>
                                <span>{post.readTime} read</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                    {isValidElement(post.content)
                        ? post.content
                        : renderTiptapContent(post.content)}
                </div>

                {/* Footer */}
                <footer className="mt-16 pt-8 border-t border-black/10 flex justify-start">
                    <Link
                        href="/blog"
                        className="group inline-flex items-center gap-2 py-2 text-black/40 hover:text-black transition-colors duration-300"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-medium text-sm">More articles</span>
                    </Link>
                </footer>
            </article>
        </div>
    );
}
