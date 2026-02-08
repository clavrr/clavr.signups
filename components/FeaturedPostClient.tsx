"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Post {
    slug: string;
    title: string;
}

export default function FeaturedPostClient({ posts }: { posts: Post[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (posts.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % posts.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [posts.length]);

    if (!posts || posts.length === 0) return null;

    const currentPost = posts[currentIndex];

    return (
        <div className="absolute top-16 sm:top-28 md:top-32 left-0 right-0 z-50 flex justify-center pointer-events-auto px-3 sm:px-4 animate-in fade-in slide-in-from-top-4 duration-700 delay-500">
            <Link
                href={`/blog/${currentPost.slug}`}
                className="group relative flex items-center gap-1.5 sm:gap-3 pl-1 pr-2 sm:pr-4 py-1 sm:py-1.5 bg-white/80 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-300 ring-1 ring-black/5 w-[280px] sm:w-[380px]"
            >
                <span className="bg-black text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex-shrink-0">
                    New
                </span>
                <div className="flex-1 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentPost.slug}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="block text-xs sm:text-sm font-medium text-black/80 truncate"
                        >
                            {currentPost.title}
                        </motion.span>
                    </AnimatePresence>
                </div>
                <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-black/40 group-hover:text-black group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
        </div>
    );
}
