"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import SignUpForm from "./SignUpForm";

const words = ["workflows", "daily momentum", "your next move", "decisions", "actions"];

export default function Hero() {
    const [index, setIndex] = useState(0);
    const badgeRef = useRef(null);

    useGSAP(() => {
        const chars = document.querySelectorAll(".meet-char");
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

        // Initial state
        gsap.set(chars, { y: 0, opacity: 1, filter: "blur(0px)" });

        // Animate out (scatter/break)
        tl.to(chars, {
            y: -20,
            x: () => gsap.utils.random(-10, 10),
            opacity: 0,
            filter: "blur(10px)",
            stagger: { amount: 0.3, from: "random" },
            duration: 0.5,
            ease: "power2.in"
        })
            // Reset positions (hidden)
            .set(chars, { y: 20, x: 0, opacity: 0, filter: "blur(10px)" })
            // Animate in (assemble)
            .to(chars, {
                y: 0,
                x: 0,
                opacity: 1,
                filter: "blur(0px)",
                stagger: { amount: 0.3, from: "start" },
                duration: 0.8,
                ease: "back.out(1.7)"
            });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="flex flex-col items-center justify-center text-center gap-4 md:gap-8 pt-8 md:pt-20 relative w-full mb-4 md:mb-12 z-20 pointer-events-none">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-gradient pointer-events-auto select-none">
                <span className="relative inline-block">
                    <div className="absolute -top-20 sm:-top-32 left-1 sm:left-2 pointer-events-auto">
                        <Badge
                            ref={badgeRef}
                            variant="outline"
                            className="px-4 py-1.5 sm:px-5 sm:py-2 text-sm sm:text-base font-medium tracking-wide rounded-full bg-white/90 backdrop-blur-xl border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white hover:scale-105 transition-all duration-300 gap-2 items-center text-black antialiased"
                        >
                            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
                            <span className="flex overflow-hidden">
                                {"Meet".split("").map((char, i) => (
                                    <span key={i} className="meet-char inline-block">
                                        {char}
                                    </span>
                                ))}
                            </span>
                        </Badge>
                    </div>
                    Clavr
                </span>
            </h1>

            <div className="text-lg sm:text-xl md:text-2xl text-muted-foreground flex flex-col sm:flex-row items-center gap-2 flex-wrap justify-center pointer-events-auto">
                <span>Where Conversations fuel</span>
                {/* Fixed width container to prevent layout shift ("sticky" sentence) */}
                <div className="relative inline-block w-[160px] sm:w-[220px] md:w-[260px] h-[28px] sm:h-[32px] md:h-[40px] text-center sm:text-left align-top sm:ml-2 overflow-visible">
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={words[index]}
                            initial={{ opacity: 0, position: "absolute", top: 0, left: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute left-0 top-0 block whitespace-nowrap font-semibold text-black px-1 py-1 bg-transparent border-b-2 border-black/20"
                        >
                            {words[index]}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground max-w-[280px] sm:max-w-md pointer-events-auto">
                The brain your productivity stack was missing.
            </p>

            <div className="mt-2 pointer-events-auto">
                <SignUpForm />
            </div>
        </section>
    );
}
