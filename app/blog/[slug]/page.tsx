"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";

// Mimic database
const postsData = {
    "stop-revenue-leaks": {
        title: "Stop Revenue Leaks with AI",
        excerpt: "How missed follow-ups and lost context are silently draining your Q4 pipeline.",
        category: "Revenue",
        date: "Feb 4",
        readTime: "5m",
        author: "Maniko",
        role: "Founder & CEO, Clavr",
        avatar: "/characters/maniko.png",
        color: "bg-orange-50",
        content: (
            <>
                <p className="lead text-xl md:text-2xl font-medium text-black/80 mb-8 leading-relaxed">
                    It starts small. A promising demo that ended with "circle back next week." A follow-up email that got buried in a chaotic inbox. A crucial detail about a prospect's budget constraint that was mentioned in a Zoom call but never made it to Salesforce.
                </p>

                <h2 className="text-2xl font-bold text-black mt-12 mb-4">The Silent Drain</h2>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    We call these "revenue leaks." They aren't the deals you lost because of price or fit. They are the deals you lost because of <em>friction</em>. In a typical high-growth sales team, it's estimated that up to 20% of the potential pipeline evaporates simply because of dropped balls and lost context.
                </p>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Your CRM is supposed to prevent this, but let's be honest: your CRM is a graveyard of good intentions. It only knows what you tell it, and you're too busy selling to tell it everything.
                </p>

                <h2 className="text-2xl font-bold text-black mt-12 mb-4">The Shadow CRM</h2>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    The real data lives in your "Shadow CRM." This is the messy, unstructured reality of your Slack DMs, Gmail threads, Notion notes, and calendar invites. That is where the context is. That is where the deal actually lives.
                </p>
                <ul className="list-disc pl-6 space-y-3 mb-8 text-lg text-black/70">
                    <li>The engineer who mentioned on Slack that the integration is ready.</li>
                    <li>The email from the champion saying their budget cycle ends Friday.</li>
                    <li>The reminder you set for yourself in 3 different apps.</li>
                </ul>

                <h2 className="text-2xl font-bold text-black mt-12 mb-4">Closing the Loop with Ambient AI</h2>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    This is where ambient computing shifts the paradigm. Instead of asking you to do more data entry, new tools are designed to listen. They observe existing workflows, such as your email, your chat, and your calendar, and autonomously surface the signals that matter.
                </p>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Imagine an assistant that doesn't just transcribe calls, but understands <em>implication</em>. An assistant that notices you haven't replied to a high-intent lead in 3 days and nudges you, not with a generic notification, but with a drafted reply based on the context of your last three meetings.
                </p>
                <p className="text-lg text-black/70 mb-12 leading-relaxed">
                    That's not just "productivity." That's plugging the leak. That's revenue.
                </p>
            </>
        )
    },
    // Fallback for others
    "future-of-work-ambient": {
        title: "The Future of Work is Ambient",
        category: "Engineering",
        date: "Feb 6",
        author: "Maniko",
        role: "Founder & CEO, Clavr",
        avatar: "/characters/maniko.png",
        readTime: "4m",
        excerpt: "Why the next generation of tools won't look like tools at all.",
        content: (
            <>
                <p className="lead text-xl md:text-2xl font-medium text-black/80 mb-8 leading-relaxed">
                    I've been thinking a lot about why we tolerate so much friction in how we work. Every app wants your attention. Every notification demands a response. Every dashboard needs you to look at it, click something, enter data. But honestly? The most powerful tools might be the ones you never have to think about at all.
                </p>

                <h2 className="text-2xl font-bold text-black mt-12 mb-4">The Tool Paradox</h2>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Here's something that keeps me up at night: the average knowledge worker uses about 9 different applications every single day. They switch between them roughly 1,200 times. Think about that. Every switch costs you a little bit of focus. Every login, every new tab, every context shift. It adds up.
                </p>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    We built all these tools to make ourselves more productive. But somewhere along the way, managing the tools became the job itself. Your calendar pings you about the meeting. Your task manager reminds you about the to do. Slack nudges you about the message. Your inbox reminds you about everything else. You're not thinking anymore. You're just routing information from one place to another.
                </p>

                <h2 className="text-2xl font-bold text-black mt-12 mb-4">What "Ambient" Actually Means</h2>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    When I talk about ambient computing, I'm not throwing around a buzzword. It's a design philosophy, and the idea is beautifully simple: technology should fade into the background and work on your behalf without requiring constant attention. Think about your thermostat. You set it once, maybe adjust it seasonally, and it just handles the rest. You don't "use" your thermostat every day. It simply works.
                </p>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Now imagine applying that same principle to your workday. Picture a system that:
                </p>
                <ul className="list-disc pl-6 space-y-3 mb-8 text-lg text-black/70">
                    <li>Watches how you communicate without asking you to log anything</li>
                    <li>Understands the relationships between people, projects, and deadlines on its own</li>
                    <li>Brings up the right information at exactly the right moment, before you even think to ask</li>
                    <li>Acts on your behalf when your intention is obvious</li>
                </ul>

                <h2 className="text-2xl font-bold text-black mt-12 mb-4">From Reactive to Anticipatory</h2>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Most software today is reactive. You open the app, you click buttons, you get results. But ambient systems flip that on its head. They're anticipatory. They're observing, connecting dots, and preparing responses before you even realize you need them.
                </p>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Let me give you a real example. Say you get an email asking about a project deadline. A traditional tool just notifies you. An ambient system? It's already connected that email to your calendar, your previous conversations with the project team, and the current task status in your tracker. By the time you open that email, there's a draft reply waiting for you. Not some generic template, but an actual contextual response that understands the full picture.
                </p>

                <h2 className="text-2xl font-bold text-black mt-12 mb-4">Why This Is Hard to Build</h2>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    I won't pretend this is easy. Building ambient systems is fundamentally different from building traditional applications, and the challenges are real:
                </p>
                <ul className="list-disc pl-6 space-y-3 mb-8 text-lg text-black/70">
                    <li><strong>Pulling context together:</strong> You need to gather and connect data from dozens of sources in real time, all while respecting people's privacy.</li>
                    <li><strong>Understanding intent:</strong> The system has to grasp not just what you said, but what you actually meant, and what you'll probably need next.</li>
                    <li><strong>Knowing when to speak up:</strong> Timing matters as much as content. Get it wrong and you're just creating noise. Get it right and it feels like magic.</li>
                    <li><strong>Earning trust:</strong> People need to trust the system enough to let it act on their behalf. That trust has to be earned through transparency and consistent accuracy.</li>
                </ul>

                <h2 className="text-2xl font-bold text-black mt-12 mb-4">The Invisible Interface</h2>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Here's something I genuinely believe: the best interface is no interface. That probably sounds strange coming from someone building software, but it's the truth we're working toward. The fewer clicks required, the fewer decisions forced on you, the fewer "quick checks" throughout your day, the more time you actually have for work that matters.
                </p>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    This doesn't mean getting rid of UI entirely. It means the interface becomes something you turn to when you want to, not something you're forced to use constantly. You stay in control, but you're no longer burdened with paying attention to everything all the time.
                </p>

                <h2 className="text-2xl font-bold text-black mt-12 mb-4">Voice: The Most Natural Interface</h2>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    There's another shift happening that I'm just as excited about: voice. Think about it. Humans have been talking to each other for tens of thousands of years. We've been typing on keyboards for maybe fifty. Tapping on glass rectangles for fifteen. Which one do you think we're actually built for?
                </p>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    Voice isn't just a convenience feature. It's a fundamental rethinking of how we interact with computers. When you can simply say "remind me to follow up with Sarah about the proposal next Tuesday," you're not navigating menus or filling out forms. You're just expressing intent in the most natural way possible.
                </p>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    What makes voice so powerful now, compared to even a few years ago, is context. The old voice assistants needed rigid commands. "Set a timer for five minutes." That was about as sophisticated as it got. But today's AI can understand nuance, follow up on previous conversations, and make sense of vague requests. You can say something like "move that meeting I have with the London team to later in the week" and actually expect it to work.
                </p>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    The real magic happens when voice and proactivity come together. Imagine your assistant not only responds to what you say, but proactively chimes in at the right moment. You're walking into a meeting and it quietly reminds you that the client mentioned budget concerns last time. You're drafting an email and it suggests a better time to send based on the recipient's patterns. You never asked. It just knew.
                </p>

                <h2 className="text-2xl font-bold text-black mt-12 mb-4">Where We Go From Here</h2>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    We're at a turning point. Large language models have made it possible to understand messy, unstructured information at scale. Speech recognition has gotten good enough that talking to your computer no longer feels awkward. APIs have made it possible to connect systems that never talked to each other before. All the pieces are finally in place for something fundamentally new.
                </p>
                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                    The future of work tools isn't about adding more features to existing apps. It's about two fundamental shifts: systems that work proactively on your behalf, and interfaces that let you communicate as naturally as you would with a human colleague.
                </p>
                <p className="text-lg text-black/70 mb-12 leading-relaxed">
                    The next generation of tools won't fight for your attention. They'll listen, understand, and act. They'll compete for the privilege of working quietly in the background, surfacing when you need them, responding when you speak, and making you better at your job without you even noticing. And when that day comes, we'll finally stop "using" our tools and start simply <em>working</em>.
                </p>
            </>
        )
    },
    // ... add others if needed or handle generic
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const post = postsData[slug as keyof typeof postsData];

    if (!post) {
        // In a real app we might use notFound(), but for this static demo:
        return (
            <div className="h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
                <Link href="/blog" className="text-blue-600 hover:underline">Back to Feed</Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-sans">

            <article className="max-w-3xl mx-auto px-6 pt-32 pb-20">
                {/* Back Link */}
                <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-black/40 hover:text-black transition-colors mb-10 group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Feed
                </Link>

                {/* Header */}
                <header className="mb-12 text-center md:text-left">
                    <div className="inline-block px-3 py-1 rounded-full bg-black/5 text-xs font-bold tracking-widest uppercase text-black/60 mb-6">
                        {post.category}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-black mb-8 leading-tight tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-sm font-medium text-black/50 uppercase tracking-wide">
                        {/* Author with Avatar */}
                        <div className="flex items-center gap-3 text-left normal-case tracking-normal">
                            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-xl shrink-0 overflow-hidden relative">
                                {post.avatar && post.avatar.startsWith('/') ? (
                                    <img
                                        src={post.avatar}
                                        alt={post.author}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="pb-1">{post.avatar || "👤"}</span>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-black font-bold text-base leading-none mb-1">
                                    By {post.author}
                                </span>
                                <span className="text-black/40 text-xs font-medium">
                                    {post.role}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {post.readTime} Read
                        </div>
                    </div>
                </header>

                {/* Divider */}
                <div className="w-full h-px bg-black/10 mb-12"></div>

                {/* Content */}
                <div className="prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-p:text-black/70 prose-a:text-black prose-a:no-underline hover:prose-a:underline max-w-none">
                    {post.content || (
                        <div className="text-center py-20 text-black/40 italic">
                            Full content for this article is being written.
                        </div>
                    )}
                </div>
            </article>

            {/* Spacer for Fixed Footer */}
            <div className="h-24"></div>
        </div>
    );
}
