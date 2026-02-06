"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { Observer } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, TextPlugin, Observer);

const features = [
    {
        icon: "/product_icons/proactive.png",
        title: "Proactive",
        description: "Acts on signals before you have to ask."
    },
    {
        icon: "/product_icons/cross-platform.png",
        title: "Cross-Stack",
        description: "Bridges Gmail, Slack, Linear, and more."
    },
    {
        icon: "/product_icons/ambient.png",
        title: "Ambient",
        description: "Lives in your tools. No new dashboards."
    },
    {
        icon: "/product_icons/wave.png",
        title: "Voice",
        description: "Conversate with Clavr. It listens, understands, and executes."
    }
];

export default function ProductPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);

    // UI State for dots (visual only)
    const [currentIndex, setCurrentIndex] = useState(0);

    // Logic State (refs for stable GSAP callbacks)
    const currentIndexRef = useRef(0);
    const isAnimating = useRef(false);

    // 1. Stable Animations (Typewriter & Cursor)
    useGSAP(() => {
        // Typewriter Animation
        const text = "Your Proactive Coworker....";
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

        // Typing
        tl.to(textRef.current, {
            duration: 3.5,
            text: {
                value: text,
                delimiter: ""
            },
            ease: "none"
        })
            // Pause
            .to({}, { duration: 1.5 })
            // Deleting
            .to(textRef.current, {
                duration: 1.5,
                text: {
                    value: "",
                    delimiter: ""
                },
                ease: "none"
            });

        // Cursor Blinking
        gsap.to(cursorRef.current, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });
    }, { scope: containerRef });

    // 2. Initial Setup
    useGSAP(() => {
        const items = gsap.utils.toArray<HTMLElement>(".feature-item");
        gsap.set(items, { autoAlpha: 0, y: 50 });
        gsap.set(items[0], { autoAlpha: 1, y: 0 });
    }, { scope: containerRef, dependencies: [features] });

    // 3. Dynamic Interactions (Observer)
    useGSAP(() => {
        function goToFeature(direction: number) {
            if (isAnimating.current) return;

            const prevIndex = currentIndexRef.current;
            let nextIndex = prevIndex + direction;

            // Wrap around logic
            if (nextIndex >= features.length) {
                nextIndex = 0;
            } else if (nextIndex < 0) {
                nextIndex = features.length - 1;
            }

            // Update logic state immediately
            isAnimating.current = true;
            currentIndexRef.current = nextIndex;

            // Update UI state immediately (for snappy dots)
            setCurrentIndex(nextIndex);

            const items = gsap.utils.toArray<HTMLElement>(".feature-item");
            const currentItem = items[prevIndex];
            const nextItem = items[nextIndex];

            const tl = gsap.timeline({
                onComplete: () => {
                    isAnimating.current = false;
                }
            });

            // Animate OUT current
            tl.to(currentItem, {
                y: direction * -50,
                autoAlpha: 0,
                duration: 0.4,
                ease: "power2.in"
            })
                // Animate IN next
                .fromTo(nextItem,
                    { y: direction * 50, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
                    "-=0.1"
                );
        }

        const observer = Observer.create({
            target: featuresRef.current,
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            onDown: () => {
                goToFeature(-1);
                resetTimer();
            },
            onUp: () => {
                goToFeature(1);
                resetTimer();
            },
            tolerance: 10,
            preventDefault: true
        });

        // Auto-rotate every 4 seconds
        let timer = setInterval(() => {
            goToFeature(1);
        }, 4000);

        function resetTimer() {
            clearInterval(timer);
            timer = setInterval(() => {
                goToFeature(1);
            }, 4000);
        }

        return () => {
            observer.kill();
            clearInterval(timer);
        };

    }, { scope: containerRef, dependencies: [features] }); // Added dependency on features

    // 4. "Join the Beta" Broken Letters Animation
    useGSAP(() => {
        const chars = document.querySelectorAll(".beta-char");
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

        // Initial state
        gsap.set(chars, { y: 0, opacity: 1, filter: "blur(0px)" });

        // Animate out (scatter/break)
        tl.to(chars, {
            y: -10,
            x: () => gsap.utils.random(-5, 5),
            opacity: 0,
            filter: "blur(4px)",
            stagger: { amount: 0.2, from: "random" },
            duration: 0.4,
            ease: "power2.in"
        })
            // Reset positions (hidden)
            .set(chars, { y: 10, x: 0, opacity: 0, filter: "blur(4px)" })
            // Animate in (assemble)
            .to(chars, {
                y: 0,
                x: 0,
                opacity: 1,
                filter: "blur(0px)",
                stagger: { amount: 0.2, from: "start" },
                duration: 0.6,
                ease: "back.out(1.7)"
            });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col overflow-hidden">

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 pt-24 md:pt-32 pb-12">
                {/* Hero */}
                <div className="text-center max-w-4xl mx-auto mb-8 md:mb-16 scale-90 md:scale-100 origin-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black mb-4 md:mb-6 min-h-[1.2em] relative inline-block text-left">
                        {/* Ghost element to reserve width and center the container */}
                        <span className="invisible">Your Proactive Coworker....</span>

                        {/* Actual animated text positioned absolutely over the ghost */}
                        <span className="absolute top-0 left-0 whitespace-nowrap">
                            <span ref={textRef}></span>
                            <span ref={cursorRef} className="inline-block w-[2px] h-[1em] bg-black/70 ml-1 align-middle"></span>
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-black/50 max-w-xl mx-auto mb-6">
                        An AI that doesn't wait for prompts. It acts.
                    </p>

                    <p className="text-base md:text-lg text-black/40 max-w-xl mx-auto leading-relaxed">
                        Bridging Email, Slack, Linear, Calendar, and more so no revenue opportunity falls through the cracks.
                    </p>
                </div>

                {/* Features - GSAP Observer Controlled */}
                <div
                    ref={featuresRef}
                    className="w-full max-w-md mx-auto h-64 relative cursor-ns-resize touch-none select-none"
                    aria-label="Scroll to switch features"
                >
                    {/* Feature Items (Stacked Absolute) */}
                    <div className="relative w-full h-full">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="feature-item absolute inset-0 flex flex-col items-center justify-center text-center opacity-0"
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-4 md:mb-6 relative">
                                    <Image
                                        src={feature.icon}
                                        alt={feature.title}
                                        fill
                                        className="object-contain brightness-0"
                                    />
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold text-black mb-2 md:mb-3">{feature.title}</h3>
                                <p className="text-base md:text-lg text-black/50 leading-relaxed max-w-xs mx-auto">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Indicators */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 p-4">
                        {features.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-black' : 'bg-black/20'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Simple CTA */}
                <div className="mt-12 md:mt-16 text-center">
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-black/60 hover:text-black transition-colors"
                    >
                        <span className="flex">
                            {"Join the Beta".split("").map((char, i) => (
                                <span key={i} className="beta-char inline-block whitespace-pre">
                                    {char}
                                </span>
                            ))}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </main>
        </div>
    );
}
