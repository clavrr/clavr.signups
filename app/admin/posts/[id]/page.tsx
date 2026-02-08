"use client";

import { useState, useEffect, use, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Trash2, Eye, EyeOff, ExternalLink, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { Select } from "@/components/ui/select-custom";
import { CATEGORIES, extractTextFromContent, countWords, calculateReadTime } from "@/lib/blog-utils";

const colors = [
    { name: "Blue", value: "bg-blue-50" },
    { name: "Orange", value: "bg-orange-50" },
    { name: "Green", value: "bg-green-50" },
    { name: "Purple", value: "bg-purple-50" },
    { name: "Yellow", value: "bg-yellow-50" },
    { name: "Pink", value: "bg-pink-50" },
];

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
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<Post | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Calculate word count from content
    const wordCount = useMemo(() => {
        if (!formData?.content) return 0;
        const text = extractTextFromContent(formData.content);
        return countWords(text);
    }, [formData?.content]);

    // Auto-update read time when word count changes
    useEffect(() => {
        if (!formData) return;
        const newReadTime = calculateReadTime(wordCount);
        if (newReadTime !== formData.readTime) {
            setFormData(prev => prev ? ({ ...prev, readTime: newReadTime }) : null);
        }
    }, [wordCount, formData?.id]);


    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    useEffect(() => {
        fetchPost();
    }, [id]);

    // Local storage backup
    useEffect(() => {
        if (!formData || !id) return;
        const backupKey = `post-backup-${id}`;
        localStorage.setItem(backupKey, JSON.stringify({
            ...formData,
            backupAt: new Date().toISOString()
        }));
    }, [formData, id]);

    // Auto-save logic
    useEffect(() => {
        if (!formData || formData.status === "published") return;

        const timer = setInterval(() => {
            handleAutoSave();
        }, 60000); // 1 minute

        return () => clearInterval(timer);
    }, [formData]);

    const handleAutoSave = async () => {
        if (!formData?.title || isSubmitting) return;

        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setLastSaved(new Date());
            }
        } catch (error) {
            console.error("Auto-save failed:", error);
        }
    };

    async function fetchPost() {
        try {
            const response = await fetch(`/api/posts/${id}`);
            if (response.ok) {
                const data = await response.json();
                setFormData(data);

                // Check for more recent local backup
                const backupKey = `post-backup-${id}`;
                const backupRaw = localStorage.getItem(backupKey);
                if (backupRaw) {
                    const backup = JSON.parse(backupRaw);
                    const backupDate = new Date(backup.backupAt);
                    const serverDate = new Date(data.updatedAt);

                    if (backupDate > serverDate && confirm("A newer unsaved version of this post was found locally. Would you like to restore it?")) {
                        setFormData(backup);
                    }
                }
            }
        } catch (error) {
            console.error("Failed to fetch post:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async () => {
        if (!formData?.title) {
            alert("Please enter a title");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setLastSaved(new Date());
                // Don't redirect, just show success
            } else {
                const error = await response.json();
                alert(error.error || "Failed to update post");
            }
        } catch (error) {
            console.error("Failed to update post:", error);
            alert("Failed to update post");
        } finally {
            setIsSubmitting(false);
        }
    };

    const togglePublish = async () => {
        if (!formData) return;
        setIsSubmitting(true);
        try {
            const newStatus = formData.status === "published" ? "draft" : "published";
            const response = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    status: newStatus,
                    publishedAt: newStatus === "published" ? new Date().toISOString() : null,
                }),
            });

            if (response.ok) {
                setFormData({ ...formData, status: newStatus });
                setLastSaved(new Date());
            }
        } catch (error) {
            console.error("Failed to update post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const deletePost = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
            if (response.ok) {
                // Clear backup on delete
                localStorage.removeItem(`post-backup-${id}`);
                router.push("/admin/posts");
            }
        } catch (error) {
            console.error("Failed to delete post:", error);
        } finally {
            setIsSubmitting(false);
            setShowDeleteModal(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Loader2 className="w-6 h-6 animate-spin text-black/40" />
            </div>
        );
    }

    if (!formData) {
        return (
            <div className="text-center py-24">
                <p className="text-black/40 mb-4">Post not found</p>
                <Link href="/admin/posts" className="text-black hover:underline">
                    ← Back to posts
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-8 pb-32">
                {/* Header */}
                <div className="flex items-center justify-between sticky top-0 bg-white/50 backdrop-blur-xl z-30 py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/posts"
                            className="p-2 -ml-2 text-black/30 hover:text-black transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold tracking-tight text-black">Edit Post</h1>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${formData.status === "published"
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-amber-50 text-amber-600"
                                    }`}>
                                    {formData.status}
                                </span>
                            </div>
                            {lastSaved && (
                                <p className="text-[10px] text-black/30 font-medium">
                                    Last saved at {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/blog/${formData.slug}`}
                            target="_blank"
                            className="p-2.5 text-black/40 hover:text-black hover:bg-black/5 rounded-2xl transition-all active:scale-95"
                            title="View post"
                        >
                            <ExternalLink className="w-4.5 h-4.5" />
                        </Link>
                        <button
                            onClick={togglePublish}
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-tight text-black/60 hover:text-black hover:bg-black/5 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
                        >
                            {formData.status === "published" ? (
                                <>
                                    <EyeOff className="w-4 h-4" />
                                    Unpublish
                                </>
                            ) : (
                                <>
                                    <Eye className="w-4 h-4" />
                                    Publish
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-xs font-bold tracking-tight rounded-2xl hover:bg-black/80 transition-all active:scale-[0.98] shadow-sm disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Save Changes
                        </button>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="p-2.5 text-black/20 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all active:scale-95"
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-10">
                    {/* Title Section */}
                    <div>
                        <label className="block text-[10px] text-black/40 uppercase font-bold tracking-widest mb-3">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter your post title"
                            className="w-full px-0 py-3 bg-transparent border-b border-black/10 focus:border-black/30 focus:outline-none text-2xl font-bold placeholder:text-black/10 transition-colors"
                        />
                    </div>

                    {/* Slug & Meta Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] text-black/40 uppercase font-bold tracking-widest mb-3">Slug</label>
                            <div className="flex items-center text-sm">
                                <span className="text-black/20 font-medium">/blog/</span>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="post-slug"
                                    className="flex-1 px-1 bg-transparent border-b border-black/10 focus:border-black/30 focus:outline-none placeholder:text-black/10 transition-colors font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] text-black/40 uppercase font-bold tracking-widest mb-3">Excerpt</label>
                            <textarea
                                value={formData.excerpt || ""}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                placeholder="Brief description for the blog card..."
                                rows={1}
                                className="w-full px-0 bg-transparent border-b border-black/10 focus:border-black/30 focus:outline-none placeholder:text-black/10 transition-colors resize-none text-sm font-medium"
                            />
                        </div>
                    </div>

                    {/* Tags & Settings Row */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-[10px] text-black/40 uppercase font-bold tracking-widest mb-3">Category</label>
                            <Select
                                value={formData.category || ""}
                                onChange={(value) => setFormData({ ...formData, category: value })}
                                options={CATEGORIES}
                                placeholder="Select"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] text-black/40 uppercase font-bold tracking-widest mb-3">Card Color</label>
                            <Select
                                value={formData.color}
                                onChange={(value) => setFormData({ ...formData, color: value })}
                                options={colors.map(c => ({ label: c.name, value: c.value }))}
                                placeholder="Select"
                                className="w-full"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-[10px] text-black/40 uppercase font-bold tracking-widest mb-3">Read Time</label>
                            <div className="h-11 flex items-center px-4 rounded-2xl bg-black/[0.02] border border-black/5 text-black/40 text-xs font-bold tracking-tight">
                                {formData.readTime} (Auto)
                            </div>
                        </div>
                    </div>

                    {/* Content Editor */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="block text-[10px] text-black/40 uppercase font-bold tracking-widest">
                                Content
                            </label>
                            <div className="flex items-center gap-4 text-[10px] font-bold text-black/20 uppercase tracking-wider">
                                <span>{wordCount.toLocaleString()} words</span>
                                <span>•</span>
                                <span>{formData.readTime} read</span>
                            </div>
                        </div>
                        <RichTextEditor
                            content={formData.content}
                            onChange={(content) => setFormData({ ...formData, content })}
                            placeholder="Start writing your story..."
                            title={formData.title}
                        />
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDeleteModal(false)}
                            className="absolute inset-0 bg-black/10 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-xs bg-white rounded-2xl shadow-xl overflow-hidden border border-black/5"
                        >
                            <div className="p-5">
                                <h2 className="text-base font-bold text-black mb-1">Delete post?</h2>
                                <p className="text-black/40 text-xs mb-5">
                                    This cannot be undone.
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={deletePost}
                                        disabled={isSubmitting}
                                        className="flex-1 h-9 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center"
                                    >
                                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        disabled={isSubmitting}
                                        className="flex-1 h-9 bg-black/5 text-black/60 rounded-xl text-xs font-bold hover:bg-black/10 transition-colors disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
