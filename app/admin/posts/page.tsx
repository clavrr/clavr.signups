"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, X, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PostListSkeleton } from "@/components/ui/skeleton";

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    status: string;
    category: string | null;
    publishedAt: string | null;
    createdAt: string;
}

export default function AdminPostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            const response = await fetch("/api/posts?includeAll=true");
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            }
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
            if (response.ok) {
                setPosts(posts.filter(p => p.id !== id));
                setDeletingId(null);
            }
        } catch (error) {
            console.error("Failed to delete post:", error);
        } finally {
            setIsDeleting(false);
        }
    }

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === "all" || post.status === filter;
        return matchesSearch && matchesFilter;
    });

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const counts = {
        all: posts.length,
        published: posts.filter(p => p.status === "published").length,
        draft: posts.filter(p => p.status === "draft").length,
    };

    return (
        <div className="space-y-6 sm:space-y-10 pl-10 md:pl-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-black">Posts</h1>
                    <p className="text-xs sm:text-sm text-black/40 mt-1">Manage your content</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="text-sm text-black/60 hover:text-black transition-colors"
                >
                    New post →
                </Link>
            </div>

            {/* Filters - stack on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-48 px-3 py-2 sm:py-1.5 text-sm border-b border-black/10 focus:border-black/30 focus:outline-none bg-transparent placeholder:text-black/30 transition-colors"
                />
                <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto">
                    {(["all", "published", "draft"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`pb-1 whitespace-nowrap transition-colors ${filter === f
                                ? "text-black border-b border-black"
                                : "text-black/30 hover:text-black/60"
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                            <span className="ml-1 text-black/30">{counts[f]}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Posts List */}
            {loading ? (
                <PostListSkeleton />
            ) : filteredPosts.length === 0 ? (
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
                    <AnimatePresence initial={false}>
                        {filteredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center justify-between py-3 sm:py-2.5 group overflow-hidden"
                            >
                                <Link
                                    href={`/admin/posts/${post.id}`}
                                    className={`flex items-center gap-3 min-w-0 flex-1 transition-opacity ${deletingId === post.id ? "opacity-30 pointer-events-none" : "opacity-100"}`}
                                >
                                    <span className={`w-2 h-2 sm:w-1.5 sm:h-1.5 rounded-full shrink-0 ${post.status === "published" ? "bg-green-400" : "bg-yellow-400"
                                        }`}></span>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 min-w-0">
                                        <span className="text-sm text-black/80 truncate group-hover:text-black transition-colors">
                                            {post.title}
                                        </span>
                                        {post.category && (
                                            <span className="text-xs text-black/30 shrink-0">
                                                {post.category}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                                <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-4">
                                    <AnimatePresence mode="wait">
                                        {deletingId === post.id ? (
                                            <motion.div
                                                key="confirm"
                                                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                                                className="flex items-center gap-2 bg-red-50 py-1 px-2 rounded-xl"
                                            >
                                                <span className="text-[10px] font-bold text-red-500 uppercase tracking-tight">Delete?</span>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    disabled={isDeleting}
                                                    className="p-1 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                                                >
                                                    {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                                                </button>
                                                <button
                                                    onClick={() => setDeletingId(null)}
                                                    disabled={isDeleting}
                                                    className="p-1 text-black/40 hover:bg-black/5 rounded-lg transition-colors"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="actions"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-3 sm:gap-4"
                                            >
                                                <span className="text-xs text-black/30 hidden sm:block">
                                                    {formatDate(post.publishedAt || post.createdAt)}
                                                </span>
                                                <button
                                                    onClick={() => setDeletingId(post.id)}
                                                    className="p-2 sm:p-1 text-black/20 hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
