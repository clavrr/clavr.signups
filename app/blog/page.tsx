"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostCardSkeleton } from "@/components/ui/skeleton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/all";

gsap.registerPlugin(Observer);

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    category: string | null;
    color: string;
    readTime: string;
    status: string;
    author: {
        id: string;
        name: string | null;
        image: string | null;
        title?: string;
    };
}

// Fallback static posts for when database is not available
const fallbackPosts = [
    {
        id: "1",
        title: "Stop Revenue Leaks with AI",
        slug: "stop-revenue-leaks",
        excerpt: "How missed follow-ups and lost context are silently draining your Q4 pipeline.",
        category: "Revenue",
        readTime: "5m",
        color: "bg-orange-50",
        status: "published",
        author: {
            id: "1",
            name: "Maniko",
            title: "Founder & CEO, Clavr",
            image: "/characters/maniko.png",
        }
    },
    {
        id: "2",
        title: "The Future of Work is Ambient",
        slug: "future-of-work-ambient",
        excerpt: "Why the next generation of tools won't look like tools at all.",
        category: "Engineering",
        readTime: "4m",
        color: "bg-blue-50",
        status: "published",
        author: {
            id: "1",
            name: "Maniko",
            image: "/characters/maniko.png",
        }
    },
];

export default function BlogPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Data State
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    // UI State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    // Logic State
    const currentIndexRef = useRef(0);
    const isAnimating = useRef(false);
    const [itemsPerPage, setItemsPerPage] = useState(2);

    // Fetch posts from API
    useEffect(() => {
        async function fetchPosts() {
            try {
                // Add timestamp for cache-busting on client side
                const response = await fetch(`/api/posts?t=${Date.now()}`);
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    setPosts(fallbackPosts);
                }
            } catch (error) {
                console.log("Using fallback posts");
                setPosts(fallbackPosts);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    // Filter Posts
    const filteredPosts = posts.filter(post => {
        const query = searchQuery.toLowerCase();
        return (
            post.title.toLowerCase().includes(query) ||
            post.excerpt?.toLowerCase().includes(query) ||
            post.category?.toLowerCase().includes(query) ||
            post.author?.name?.toLowerCase().includes(query)
        );
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            const newSize = window.innerWidth < 768 ? 1 : 2;
            if (newSize !== itemsPerPage) {
                setItemsPerPage(newSize);
                setCurrentIndex(0);
                currentIndexRef.current = 0;
            }
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [itemsPerPage]);

    // Group posts dynamically
    const chunks = [];
    if (filteredPosts.length > 0) {
        for (let i = 0; i < filteredPosts.length; i += itemsPerPage) {
            chunks.push(filteredPosts.slice(i, i + itemsPerPage));
        }
    }

    // Reset index on search
    useEffect(() => {
        setCurrentIndex(0);
        currentIndexRef.current = 0;
    }, [searchQuery]);

    // Initial Setup
    useGSAP(() => {
        // Animate Hero in
        gsap.from(".hero-text", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2
        });
    }, { scope: containerRef });

    // Dynamic Interactions (Observer)
    useGSAP(() => {
        function goToGroup(direction: number) {
            if (isAnimating.current || chunks.length <= 1) return;

            const prevIndex = currentIndexRef.current;
            const nextIndex = prevIndex + direction;

            // Bounds check
            if (nextIndex < 0 || nextIndex >= chunks.length) return;

            // Update state
            isAnimating.current = true;
            currentIndexRef.current = nextIndex;
            setCurrentIndex(nextIndex);

            const groups = gsap.utils.toArray<HTMLElement>(".blog-group");
            const currentGroup = groups[prevIndex];
            const nextGroup = groups[nextIndex];

            const tl = gsap.timeline({
                defaults: { ease: "power3.inOut" },
                onComplete: () => {
                    isAnimating.current = false;
                }
            });

            // Animate OUT current
            tl.to(currentGroup, {
                y: direction * -20, // Smaller movement
                opacity: 0,
                duration: 0.4, // Slightly longer fade out
                overwrite: true
            })
                // Animate IN next (Start sooner)
                .fromTo(nextGroup,
                    { y: direction * 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, overwrite: true },
                    "-=0.35" // Aggressive overlap to prevent gap
                );
        }

        const observer = Observer.create({
            target: contentRef.current,
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            onDown: () => goToGroup(-1),
            onUp: () => goToGroup(1),
            tolerance: 20,
            preventDefault: true
        });

        return () => observer.kill();

    }, { scope: containerRef, dependencies: [chunks.length] });
    // Re-run observer setup if chunks length changes significantly (filtering)

    // Helper to get avatar display
    const getAvatarDisplay = (author: Post["author"]) => {
        if (author?.image?.startsWith('/')) {
            return (
                <Image
                    src={author.image}
                    alt={author.name || "Author"}
                    fill
                    className="object-cover"
                    sizes="40px"
                />
            );
        }
        return <span className="pb-1">👤</span>;
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-white flex flex-col overflow-hidden font-sans">
            <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 pt-24 pb-12">
                {/* Hero Content (Static) */}
                <div className="text-center max-w-2xl mx-auto mb-10 origin-center flex flex-col items-center gap-6">
                    <div>
                        <h1 className="hero-text text-3xl md:text-5xl font-bold tracking-tight text-black mb-3">
                            The Feed.
                        </h1>
                        <p className="hero-text text-lg text-black/50 leading-relaxed max-w-xl mx-auto">
                            Insights on plugging revenue leaks and the future of ambient work.
                        </p>
                    </div>

                    {/* Integrated Search Bar (No Filters) */}
                    <div className="hero-text relative w-[90%] md:w-full max-w-xs md:max-w-md mx-auto group">
                        <div className="flex items-center bg-gray-100/80 backdrop-blur-sm rounded-full p-1 pl-3 md:pl-4 transition-all focus-within:ring-2 focus-within:ring-black/5 focus-within:bg-white focus-within:shadow-sm">
                            {/* Search Icon */}
                            <Search className="w-4 h-4 text-black/40 shrink-0 mr-2 md:mr-3" />

                            {/* Input */}
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-black/40 text-black h-9 md:h-10 w-full min-w-[100px]"
                            />

                            {/* Search Button (Desktop Only) */}
                            <Button className="hidden md:flex rounded-full h-9 px-5 bg-black hover:bg-black/80 text-white text-xs font-medium ml-1">
                                Search
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Interactive Blog Deck */}
                <div
                    ref={contentRef}
                    className="w-full max-w-4xl mx-auto h-[460px] relative cursor-ns-resize touch-none select-none"
                    aria-label="Scroll to read posts"
                >
                    {/* Blog Groups (Stacked Absolute) */}
                    <div className="relative w-full h-full">
                        {loading ? (
                            <div className="absolute inset-0 w-full h-full flex gap-6">
                                <PostCardSkeleton />
                                <div className="hidden md:block flex-1"><PostCardSkeleton /></div>
                            </div>
                        ) : filteredPosts.length > 0 ? (
                            chunks.map((chunk, groupIndex) => (
                                <div
                                    key={groupIndex}
                                    className={`blog-group absolute inset-0 w-full h-full flex gap-6 transition-opacity duration-300 ${groupIndex === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                                >
                                    {chunk.map((post, postIndex) => (
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            key={post.id}
                                            className="flex-1 group flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-500"
                                        >
                                            {/* Colored Card Area */}
                                            <div className={`flex-1 relative ${post.color} rounded-2xl overflow-hidden p-5 flex flex-col items-center justify-center text-center shadow-sm`}>

                                                {/* Pill Label */}
                                                <div className="absolute top-4 left-4 bg-white/60 backdrop-blur-sm px-2 py-1 rounded text-[9px] font-bold tracking-widest uppercase text-black/60 shadow-sm border border-white/20">
                                                    {post.category}
                                                </div>

                                                {/* Content Overlay */}
                                                <div className="relative z-10 flex flex-col items-center gap-1 max-w-[320px] mx-auto">
                                                    {/* Title */}
                                                    <h2 className="text-2xl md:text-3xl font-bold text-black leading-none tracking-tight">
                                                        {post.title}
                                                    </h2>

                                                    {/* Excerpt */}
                                                    <p className="text-sm text-black/60 leading-tight line-clamp-3 mt-1">
                                                        {post.excerpt}
                                                    </p>

                                                    {/* CTA */}
                                                    <div className="mt-2 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                                        <ArrowUpRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer Area (Outside Card) */}
                                            <div className="flex items-center gap-3 px-1 mt-1">
                                                {/* Avatar */}
                                                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-2xl shrink-0 overflow-hidden relative">
                                                    {getAvatarDisplay(post.author)}
                                                </div>

                                                {/* Info */}
                                                <div className="flex flex-col text-left">
                                                    <span className="text-sm font-medium text-black leading-none mb-1">
                                                        By {post.author?.name || "Unknown"}
                                                    </span>
                                                    <span className="text-xs text-black/40 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                                        {post.author?.title || "Author"}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                    {itemsPerPage === 2 && chunk.length === 1 && <div className="flex-1 opacity-0 pointer-events-none"></div>}
                                </div>
                            ))
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-black/40 gap-2">
                                <Search className="w-8 h-8 opacity-20" />
                                <p className="text-sm font-medium">No results found for "{searchQuery}"</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination Indicators */}
                    {chunks.length > 1 && (
                        <div className="absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 flex flex-col gap-3">
                            {chunks.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-black scale-125' : 'bg-black/20'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <div className="shrink-0 w-full py-2">
            </div>
        </div>
    );
}
