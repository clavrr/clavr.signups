"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef, memo, useCallback } from "react";

const baseImages = [
    "/pictures/ -2.jpg", "/pictures/ -3.jpg", "/pictures/ -4.jpg", "/pictures/ -5.jpg",
    "/pictures/ -6.jpg", "/pictures/ -7.jpg", "/pictures/ .jpg", "/pictures/African Savannah.jpg",
    "/pictures/Architecture africaine.jpg", "/pictures/Elephant.jpg",
    "/pictures/Majestic Victoria Falls – The Smoke That Thunders.jpg", "/pictures/dark academia.jpg",
    "/pictures/winter semester study session.jpg", "/pictures/Lake Tahoe's Least Crowded and Most Photogenic Campsite.jpg",
];

const HOVER_WORDS = [
    'autonomous', 'speed', 'privacy', 'actions', 'intelligence',
    'remembers', 'learns', 'memory', 'personalized'
];

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    word: string;
    bgColor: string;
    src: string;
    element?: HTMLDivElement | null;
}

export default function BackgroundBubbles({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    const [bubbleData, setBubbleData] = useState<{ src: string; word: string; bgColor: string; size: number }[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const animationRef = useRef<number | null>(null);
    const screenRef = useRef({ w: 1200, h: 800, isMobile: false, minY: 100, maxY: 250 });

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        // Use ALL images with duplicates - 20 bubbles on mobile, 28 on desktop
        const allImages = [...baseImages, ...baseImages];
        const images = isMobile ? allImages.slice(0, 20) : allImages;

        const w = window.innerWidth;
        const h = window.innerHeight;
        // Bubbles can move in the HERO SECTION BACKGROUND (top 55% of screen)
        // but never go to the bottom (countdown, footer area)
        const minY = isMobile ? 100 : 120;     // Below navbar
        const maxY = h * 0.55;                   // Top 55% of screen only

        screenRef.current = { w, h, isMobile, minY, maxY };

        // Create bubble display data for React
        // Desktop bubbles: 30-54px, Mobile bubbles: 25-43px (smaller now)
        const displayData = images.map((src, i) => {
            const baseSize = isMobile ? 25 : 30;
            const size = baseSize + (i % 4) * (isMobile ? 6 : 6);
            return {
                src,
                word: HOVER_WORDS[i % HOVER_WORDS.length],
                bgColor: i % 2 === 0 ? '#FEF9E1' : '#E1EEDD',
                size
            };
        });
        setBubbleData(displayData);

        // Create physics particles
        particlesRef.current = displayData.map((data, i) => {
            const radius = data.size / 2;
            const x = radius + Math.random() * (w - radius * 2);
            const y = minY + Math.random() * (maxY - minY - radius * 2);
            const dir = Math.random() > 0.5 ? 1 : -1;

            // Mobile bubbles move slower than desktop
            const speedMultiplier = isMobile ? 0.4 : 1.0;

            return {
                id: i,
                x,
                y,
                vx: (0.5 + Math.random() * 0.5) * dir * speedMultiplier,  // Mobile: 0.2-0.4, Desktop: 0.5-1.0
                vy: (Math.random() - 0.5) * 0.3 * speedMultiplier,        // Slower vertical too
                radius,
                word: data.word,
                bgColor: data.bgColor,
                src: data.src
            };
        });

        setMounted(true);
    }, []);

    // Start animation loop AFTER elements are mounted
    useEffect(() => {
        if (!mounted || bubbleData.length === 0) return;

        // Link particles to DOM elements
        particlesRef.current.forEach((p, i) => {
            p.element = bubbleRefs.current[i];
        });

        const animate = () => {
            const { w, minY, maxY } = screenRef.current;
            const particles = particlesRef.current;

            // Update each particle
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Wall collisions (left/right)
                if (p.x - p.radius < 0) {
                    p.x = p.radius;
                    p.vx = Math.abs(p.vx);
                } else if (p.x + p.radius > w) {
                    p.x = w - p.radius;
                    p.vx = -Math.abs(p.vx);
                }

                // Wall collisions (top/bottom of band)
                if (p.y - p.radius < minY) {
                    p.y = minY + p.radius;
                    p.vy = Math.abs(p.vy);
                } else if (p.y + p.radius > maxY) {
                    p.y = maxY - p.radius;
                    p.vy = -Math.abs(p.vy);
                }

                // Particle-particle collisions (BOUNCE, don't cross!)
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p2.x - p.x;
                    const dy = p2.y - p.y;
                    const distSq = dx * dx + dy * dy;
                    const minDist = p.radius + p2.radius;

                    if (distSq < minDist * minDist) {
                        const dist = Math.sqrt(distSq) || 1;
                        const nx = dx / dist;
                        const ny = dy / dist;

                        // Separate overlapping particles
                        const overlap = (minDist - dist) / 2;
                        p.x -= nx * overlap;
                        p.y -= ny * overlap;
                        p2.x += nx * overlap;
                        p2.y += ny * overlap;

                        // Exchange velocity components along collision normal
                        const v1n = p.vx * nx + p.vy * ny;
                        const v2n = p2.vx * nx + p2.vy * ny;

                        // Only bounce if moving towards each other
                        if (v1n - v2n > 0) {
                            p.vx -= (v1n - v2n) * nx;
                            p.vy -= (v1n - v2n) * ny;
                            p2.vx += (v1n - v2n) * nx;
                            p2.vy += (v1n - v2n) * ny;
                        }
                    }
                }

                // Update DOM directly (no React state!)
                if (p.element) {
                    p.element.style.transform = `translate(${p.x - p.radius}px, ${p.y - p.radius}px)`;
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [mounted, bubbleData.length]);

    if (!mounted || bubbleData.length === 0) return null;

    return (
        <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className || ''}`} style={{ zIndex: 0 }}>
            {bubbleData.map((bubble, index) => (
                <div
                    key={index}
                    ref={el => { bubbleRefs.current[index] = el; }}
                    className="absolute top-0 left-0"
                    style={{
                        width: bubble.size,
                        height: bubble.size,
                        willChange: 'transform'
                    }}
                >
                    <BubbleImage
                        src={bubble.src}
                        index={index}
                        word={bubble.word}
                        bgColor={bubble.bgColor}
                        size={bubble.size}
                    />
                </div>
            ))}
        </div>
    );
}

const BubbleImage = memo(({ src, index, word, bgColor, size }: { src: string; index: number; word: string; bgColor: string; size: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative pointer-events-auto cursor-pointer flex items-center justify-center"
            style={{ width: size, height: size }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="w-full h-full rounded-full overflow-hidden relative"
                style={{
                    boxShadow: "inset 4px 4px 8px rgba(255, 255, 255, 0.4), inset -4px -4px 8px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.08)",
                    border: "1px solid rgba(255,255,255,0.4)"
                }}
            >
                <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover scale-125 select-none"
                    draggable={false}
                    sizes="120px"
                    priority={index < 4}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20 rounded-full" />
            </div>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, scale: 0.8, x: "-50%", transition: { duration: 0.15 } }}
                        transition={{ type: "spring", stiffness: 450, damping: 25 }}
                        className="absolute -top-10 left-1/2 px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold text-black whitespace-nowrap shadow-xl pointer-events-none z-[100] flex items-center justify-center border border-black/5"
                        style={{ backgroundColor: bgColor }}
                    >
                        <span className="relative z-10">{word}</span>
                        <div
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b border-black/5"
                            style={{ backgroundColor: bgColor }}
                        ></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

BubbleImage.displayName = "BubbleImage";
