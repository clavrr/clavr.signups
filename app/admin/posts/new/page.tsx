"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Select } from "@/components/ui/select-custom";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { CATEGORIES, extractTextFromContent, countWords, calculateReadTime } from "@/lib/blog-utils";

const colors = [
    { name: "Blue", value: "bg-blue-50" },
    { name: "Orange", value: "bg-orange-50" },
    { name: "Green", value: "bg-green-50" },
    { name: "Purple", value: "bg-purple-50" },
    { name: "Yellow", value: "bg-yellow-50" },
    { name: "Pink", value: "bg-pink-50" },
];

export default function NewPostPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: null as any,
        category: "",
        color: "bg-blue-50",
        readTime: "< 1m",
    });

    // Local storage persistence for new posts
    useEffect(() => {
        const savedDraft = localStorage.getItem("new-post-draft");
        if (savedDraft) {
            try {
                const draft = JSON.parse(savedDraft);
                if (confirm("You have an unsaved draft. Would you like to restore it?")) {
                    setFormData(draft);
                }
            } catch (e) {
                console.error("Failed to parse saved draft");
            }
        }
    }, []);

    // Save to local storage as user types
    useEffect(() => {
        if (formData.title || formData.content) {
            localStorage.setItem("new-post-draft", JSON.stringify(formData));
        }
    }, [formData]);

    // Calculate word count and read time from content
    const wordCount = useMemo(() => {
        const text = extractTextFromContent(formData.content);
        return countWords(text);
    }, [formData.content]);

    // Auto-update read time when word count changes
    useEffect(() => {
        const newReadTime = calculateReadTime(wordCount);
        if (newReadTime !== formData.readTime) {
            setFormData(prev => ({ ...prev, readTime: newReadTime }));
        }
    }, [wordCount]);

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title),
        });
    };

    const handleSubmit = async (status: "draft" | "published") => {
        if (!formData.title) {
            alert("Please enter a title");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    status,
                    publishedAt: status === "published" ? new Date().toISOString() : null,
                }),
            });

            if (response.ok) {
                // Clear local storage on successful submission
                localStorage.removeItem("new-post-draft");
                router.push("/admin/posts");
            } else {
                const error = await response.json();
                alert(error.error || "Failed to create post");
            }
        } catch (error) {
            console.error("Failed to create post:", error);
            alert("Failed to create post");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 pb-32 pr-28 md:pr-0">
            {/* Header - Sticky at the top */}
            <div className="flex items-center justify-between sticky top-0 bg-white/50 backdrop-blur-xl z-30 py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/posts"
                        className="p-2 -ml-2 text-black/30 hover:text-black transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-black">New Post</h1>
                        <p className="text-[10px] text-black/30 font-bold uppercase tracking-widest mt-0.5">Drafting Mode</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleSubmit("draft")}
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-tight text-black/60 hover:text-black hover:bg-black/5 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
                    >
                        Save Draft
                    </button>
                    <button
                        onClick={() => handleSubmit("published")}
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-xs font-bold tracking-tight rounded-2xl hover:bg-black/80 transition-all active:scale-[0.98] shadow-sm disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <div className="flex items-center gap-2">
                                <span>Publish Post</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        )}
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
                        onChange={handleTitleChange}
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
                            value={formData.excerpt}
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
                            value={formData.category}
                            onChange={(value) => setFormData({ ...formData, category: value })}
                            options={CATEGORIES}
                            placeholder="Select"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] text-black/40 uppercase font-bold tracking-widest mb-3">Card Color</label>
                        <div className="h-11 flex items-center gap-3 px-4 rounded-2xl bg-black/[0.02] border border-black/5">
                            {colors.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => setFormData({ ...formData, color: color.value })}
                                    className={`w-5 h-5 rounded-full ${color.value} transition-all ${formData.color === color.value
                                        ? "ring-2 ring-black/20 ring-offset-2 scale-110"
                                        : "hover:scale-110"
                                        }`}
                                    title={color.name}
                                />
                            ))}
                        </div>
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
    );
}
