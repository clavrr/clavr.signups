"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/all";

gsap.registerPlugin(Observer);

const conversations = [
    {
        icon: "/integrations/linear.svg",
        message: "Drafted that Linear ticket from the Slack bug report.",
        color: "#FEF9E1",
    },
    {
        icon: "/integrations/Gmail_icon_png.webp",
        message: "Caught a lead in Gmail. Syncing context to Salesforce.",
        color: "#E1EEDD",
    },
    {
        icon: "/integrations/notion.png",
        message: "Context from the morning sync is summarized in Notion.",
        color: "#FEF9E1",
    },
    {
        icon: "/integrations/slack.png",
        message: "Shared the project roadmap updates with the team on Slack.",
        color: "#E1EEDD",
    },
    {
        icon: "/integrations/asana.svg",
        message: "Synced the latest product milestones to the Asana board.",
        color: "#FEF9E1",
    },
    {
        icon: "/integrations/Google_Task.png",
        message: "Added high-priority action items to your Google Tasks.",
        color: "#E1EEDD",
    },
    {
        icon: "/integrations/Google_Calendar_icon.png",
        message: "Scheduled the project kickoff on your Google Calendar.",
        color: "#FEF9E1",
    }
];

export default function FeaturedActions() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isAnimating = useRef(false);

    const goToConversation = useCallback((direction: number) => {
        if (isAnimating.current) return;

        isAnimating.current = true;
        setCurrentIndex((prev) => (prev + direction + conversations.length) % conversations.length);

        // Give it a small cooldown like the product page
        setTimeout(() => {
            isAnimating.current = false;
        }, 600);
    }, []);

    // Auto-rotate every 3 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            goToConversation(1);
        }, 5000);

        return () => clearInterval(timer);
    }, [goToConversation, currentIndex]);

    useGSAP(() => {
        const observer = Observer.create({
            target: containerRef.current,
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            onDown: () => goToConversation(-1),
            onUp: () => goToConversation(1),
            tolerance: 10,
            preventDefault: false // Allow page scroll if not inside container? 
        });

        return () => observer.kill();
    }, [goToConversation]);

    return (
        <div
            ref={containerRef}
            className="z-20 relative h-[200px] w-full max-w-xl flex flex-col items-center justify-center cursor-ns-resize touch-none"
        >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-6 sm:gap-8 px-4"
                    >
                        {/* Integration Icon - Compact & Professional */}
                        <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0">
                            <img
                                src={conversations[currentIndex].icon}
                                alt="Integration"
                                width={36}
                                height={36}
                                className="w-full h-full object-contain filter drop-shadow-sm select-none"
                            />
                        </div>

                        {/* Chat Bubble - Premium Modern Design */}
                        <div
                            className="relative px-8 py-5 sm:px-10 sm:py-7 rounded-[2.2rem] sm:rounded-[2.8rem] shadow-xl border border-white/40 w-fit max-w-[280px] sm:max-w-[500px] backdrop-blur-2xl"
                            style={{
                                backgroundColor: conversations[currentIndex].color,
                                boxShadow: `0 20px 50px -12px rgba(0, 0, 0, 0.12)`
                            }}
                        >
                            <p className="text-[15px] sm:text-[18px] font-medium text-black/80 leading-relaxed">
                                {conversations[currentIndex].message}
                            </p>

                            {/* Authentic Bubble Tail */}
                            <div
                                className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rotate-45"
                                style={{
                                    backgroundColor: conversations[currentIndex].color,
                                    clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
                                    borderBottomLeftRadius: '4px'
                                }}
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination dots like the product page */}
            <div className="flex gap-2 mt-4">
                {conversations.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-black' : 'bg-black/20'}`}
                    />
                ))}
            </div>

            <p className="mt-2 text-[10px] sm:text-xs font-black tracking-[0.4em] uppercase text-black/20">
                Your Workflow, Evolved
            </p>
        </div>
    );
}
