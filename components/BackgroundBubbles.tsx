"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef, memo, useCallback } from "react";

const baseImages = [
    "/pictures/ -2.jpg",
    "/pictures/ -3.jpg",
    "/pictures/ -5.jpg",
    "/pictures/ -6.jpg",
    "/pictures/ -7.jpg",
    "/pictures/jouneyart.jpg",
    "/pictures/road.jpg",
    "/pictures/20 Helpful Africa Tips BEFORE Traveling To Africa.jpg",
    "/pictures/African Savannah.jpg",
    "/pictures/Buy my products and support me.jpg",
    "/pictures/Clavr Bubble - 1.png",
    "/pictures/Clavr Bubble - 2.png",
    "/pictures/Clavr Bubble - 3.png",
    "/pictures/Clavr Bubble - 4.png",
    "/pictures/Clavr Bubble - 5.png",
    "/pictures/Clavr Bubble - 6.png",
    "/pictures/Clavr Bubble - 7.png",
    "/pictures/Clavr Bubble - 8.png",
    "/pictures/Clavr Bubble - 9.png",
    "/pictures/Clavr Bubble - 10.png",
    "/pictures/Clavr Bubble - 10 copy.png",
    "/pictures/Elephant.jpg",
    "/pictures/How to Feel Happy Again_ 8 Realistic Ways.jpg",
    "/pictures/Lake Tahoe's Least Crowded and Most Photogenic Campsite.jpg",
    "/pictures/Majestic Victoria Falls – The Smoke That Thunders.jpg",
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
    // Creative motion properties
    phase: number;           // Oscillation phase offset
    waveAmplitude: number;   // How much to wobble
    waveFrequency: number;   // Wobble speed
    baseSpeed: number;       // Original speed for reference
}

export default function BackgroundBubbles({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    const [bubbleData, setBubbleData] = useState<{ src: string; word: string; bgColor: string; size: number }[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const animationRef = useRef<number | null>(null);
    const screenRef = useRef({ w: 1200, h: 800, isMobile: false, minY: 100, maxY: 250, textExclusionZones: [] as { minX: number; maxX: number; minY: number; maxY: number }[] });

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        // On mobile, use fewer bubbles to prevent cluttering
        const images = isMobile ? baseImages.slice(0, Math.ceil(baseImages.length * 0.6)) : baseImages;

        const w = window.innerWidth;
        const h = window.innerHeight;
        // Bubbles float behind the hero section up to the email form
        // They should NOT appear below the email input area
        const minY = isMobile ? 80 : 120;       // Below navbar
        // maxY stops bubbles AT the email input (not beyond):
        // - Navbar, badge, logo, taglines = covered
        // - Email input bottom edge and below = bubble-free zone
        const maxY = isMobile ? h * 0.48 : h * 0.50;

        // No exclusion zones - bubbles move freely within the hero area
        const textExclusionZones: { minX: number; maxX: number; minY: number; maxY: number }[] = [];

        screenRef.current = { w, h, isMobile, minY, maxY, textExclusionZones };

        // Create bubble display data for React
        // Desktop bubbles: 30-54px, Mobile bubbles: 25-43px
        // Clavr Bubble images get a size boost (1.5x larger)
        const displayData = images.map((src, i) => {
            const isClavrBubble = src.includes('Clavr Bubble');
            const baseSize = isMobile ? 25 : 30;
            let size = baseSize + (i % 4) * (isMobile ? 6 : 6);

            // Make Clavr Bubble images larger (less on mobile to prevent overlap)
            if (isClavrBubble) {
                size = Math.round(size * (isMobile ? 1.25 : 1.5));
            }

            return {
                src,
                word: HOVER_WORDS[i % HOVER_WORDS.length],
                bgColor: i % 2 === 0 ? '#FEF9E1' : '#E1EEDD',
                size
            };
        });
        setBubbleData(displayData);

        // Create physics particles - distribute across screen in a grid pattern
        const cols = Math.ceil(Math.sqrt(displayData.length * (w / (maxY - minY))));
        const rows = Math.ceil(displayData.length / cols);
        const cellWidth = w / cols;
        const cellHeight = (maxY - minY) / rows;

        particlesRef.current = displayData.map((data, i) => {
            const radius = data.size / 2;
            const col = i % cols;
            const row = Math.floor(i / cols);

            // Position in grid cell with some randomness
            const cellX = col * cellWidth;
            const cellY = minY + row * cellHeight;
            const x = cellX + cellWidth * 0.2 + Math.random() * cellWidth * 0.6;
            const y = cellY + cellHeight * 0.2 + Math.random() * cellHeight * 0.6;

            // Random direction - ensure good mix of left and right movement
            const angle = Math.random() * Math.PI * 2;

            // Mobile bubbles move slightly slower but still dynamic
            const speedMultiplier = isMobile ? 0.7 : 1.0;
            const speed = (0.5 + Math.random() * 0.5) * speedMultiplier;

            return {
                id: i,
                x: Math.max(radius, Math.min(w - radius, x)),
                y: Math.max(minY + radius, Math.min(maxY - radius, y)),
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed * 0.5,  // Less vertical movement
                radius,
                word: data.word,
                bgColor: data.bgColor,
                src: data.src,
                // Creative motion properties - randomized per bubble
                phase: Math.random() * Math.PI * 2,
                waveAmplitude: 0.3 + Math.random() * 0.5,
                waveFrequency: 0.01 + Math.random() * 0.02,
                baseSpeed: speed
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

        let frameCount = 0;

        const animate = () => {
            const { w, minY, maxY } = screenRef.current;
            const particles = particlesRef.current;
            frameCount++;

            // Update each particle
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Creative wave motion - adds organic wobble to movement
                // Reduce wave intensity on mobile for smoother animation
                const { isMobile: mobile } = screenRef.current;
                const waveMultiplier = mobile ? 0.85 : 1.0;
                const waveOffset = Math.sin(frameCount * p.waveFrequency + p.phase) * p.waveAmplitude * waveMultiplier;

                // Move with wave influence
                p.x += p.vx + waveOffset * 0.3;
                p.y += p.vy + Math.cos(frameCount * p.waveFrequency * 0.7 + p.phase) * p.waveAmplitude * 0.2 * waveMultiplier;

                // Random gentle nudges every ~2 seconds (120 frames) to keep things interesting
                if (frameCount % 120 === Math.floor(p.id * 4.7) % 120) {
                    p.vx += (Math.random() - 0.5) * 0.3;
                    p.vy += (Math.random() - 0.5) * 0.15;
                    // Keep velocity within bounds
                    const maxSpeed = p.baseSpeed * 1.5;
                    const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                    if (currentSpeed > maxSpeed) {
                        p.vx = (p.vx / currentSpeed) * maxSpeed;
                        p.vy = (p.vy / currentSpeed) * maxSpeed;
                    }
                }

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

                // Enhanced anti-clustering: stronger repulsion when bubbles get close
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p2.x - p.x;
                    const dy = p2.y - p.y;
                    const distSq = dx * dx + dy * dy;
                    const minDist = p.radius + p2.radius;
                    const repulsionDist = minDist * 2.5; // Start repelling before collision

                    if (distSq < repulsionDist * repulsionDist) {
                        const dist = Math.sqrt(distSq) || 1;
                        const nx = dx / dist;
                        const ny = dy / dist;

                        if (distSq < minDist * minDist) {
                            // Collision - separate and bounce
                            const overlap = (minDist - dist) / 2;
                            p.x -= nx * overlap;
                            p.y -= ny * overlap;
                            p2.x += nx * overlap;
                            p2.y += ny * overlap;

                            const v1n = p.vx * nx + p.vy * ny;
                            const v2n = p2.vx * nx + p2.vy * ny;

                            if (v1n - v2n > 0) {
                                p.vx -= (v1n - v2n) * nx;
                                p.vy -= (v1n - v2n) * ny;
                                p2.vx += (v1n - v2n) * nx;
                                p2.vy += (v1n - v2n) * ny;
                            }
                        } else {
                            // Gentle repulsion to prevent clustering
                            const repelStrength = (1 - dist / repulsionDist) * 0.02;
                            p.vx -= nx * repelStrength;
                            p.vy -= ny * repelStrength;
                            p2.vx += nx * repelStrength;
                            p2.vy += ny * repelStrength;
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
        <div className={`fixed inset-0 pointer-events-none overflow-hidden opacity-100 ${className || ''}`} style={{ zIndex: 0 }}>
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
                    alt="Clavr Bubble"
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
