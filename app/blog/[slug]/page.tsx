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
        author: "Anthony Maniko",
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
        date: "Oct 08",
        author: "Mark Davis",
        readTime: "4m",
        content: <p className="text-lg text-black/60">Content coming soon...</p>
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

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-medium text-black/50 uppercase tracking-wide">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {post.author}
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
