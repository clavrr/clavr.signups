"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import SignUpForm from "./SignUpForm";

const words = ["workflows", "daily momentum", "your next move", "decisions", "actions"];

export default function Hero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="flex flex-col items-center justify-center text-center gap-4 md:gap-8 pt-8 md:pt-20 relative w-full mb-4 md:mb-12 z-20 pointer-events-none">
            <div className="pointer-events-auto">
                <Badge
                    variant="outline"
                    className="px-4 py-1.5 text-sm border-black/10 bg-black/5 backdrop-blur-sm hover:bg-black/10 transition-all duration-300"
                >
                    <Lock className="w-3 h-3 mr-2 text-black/70" />
                    Join the Private Beta
                </Badge>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-gradient pointer-events-auto select-none">
                Clavr
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
