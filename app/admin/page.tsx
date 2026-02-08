"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PostListSkeleton } from "@/components/ui/skeleton";

interface Post {
    id: string;
    title: string;
    slug: string;
    status: string;
    publishedAt: string | null;
    createdAt: string;
}

interface Stats {
    total: number;
    published: number;
    draft: number;
}

export default function AdminDashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, published: 0, draft: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/posts?includeAll=true");
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data.slice(0, 5)); // Recent 5
                    setStats({
                        total: data.length,
                        published: data.filter((p: Post) => p.status === "published").length,
                        draft: data.filter((p: Post) => p.status === "draft").length,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-8 sm:space-y-10 pl-10 md:pl-0">
            {/* Header */}
            <div>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-black">Dashboard</h1>
                <p className="text-xs sm:text-sm text-black/40 mt-1">Welcome back</p>
            </div>

            {/* Stats - Minimal inline style */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span className="text-xs sm:text-sm text-black/60">{stats.total} posts</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    <span className="text-xs sm:text-sm text-black/60">{stats.published} published</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    <span className="text-xs sm:text-sm text-black/60">{stats.draft} drafts</span>
                </div>
            </div>

            {/* Recent Posts */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xs sm:text-sm font-medium text-black/40 uppercase tracking-wider">Recent</h2>
                    <Link
                        href="/admin/posts"
                        className="text-xs text-black/30 hover:text-black/60 transition-colors"
                    >
                        View all
                    </Link>
                </div>

                {loading ? (
                    <PostListSkeleton />
                ) : posts.length === 0 ? (
                    <div className="py-8">
                        <p className="text-sm text-black/40 mb-3">No posts yet</p>
                        <Link
                            href="/admin/posts/new"
                            className="text-sm text-black/60 hover:text-black transition-colors"
                        >
                            Create your first post →
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/admin/posts/${post.id}`}
                                className="flex items-center justify-between py-2.5 sm:py-2 group"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${post.status === "published" ? "bg-green-400" : "bg-yellow-400"
                                        }`}></span>
                                    <span className="text-sm text-black/80 truncate group-hover:text-black transition-colors">
                                        {post.title}
                                    </span>
                                </div>
                                <span className="text-xs text-black/30 shrink-0 ml-4 hidden sm:block">
                                    {formatDate(post.publishedAt || post.createdAt)}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
