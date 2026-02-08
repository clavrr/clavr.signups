"use client";

import React, { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted/declined
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Show after a short delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100]"
                >
                    <div className="bg-white/80 backdrop-blur-xl border border-black/5 rounded-3xl shadow-2xl p-6 relative overflow-hidden group">
                        {/* Decorative background accent */}
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-black/[0.02] rounded-full blur-2xl group-hover:bg-black/[0.04] transition-colors duration-500" />

                        <div className="relative flex flex-col gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center shrink-0">
                                    <Cookie className="w-5 h-5 text-black/60" />
                                </div>
                                <div className="flex-1 pt-1">
                                    <h3 className="text-sm font-bold text-black mb-1">Cookies & Privacy</h3>
                                    <p className="text-xs leading-relaxed text-black/50">
                                        We use cookies to improve your experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                                    </p>
                                </div>
                                <button
                                    onClick={handleDecline}
                                    className="p-1 hover:bg-black/5 rounded-full transition-colors text-black/30 hover:text-black/60"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 mt-2">
                                <Button
                                    onClick={handleAccept}
                                    className="flex-1 bg-black hover:bg-black/80 text-white rounded-2xl h-11 text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Accept all
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleDecline}
                                    className="px-6 border-black/5 hover:bg-black/5 text-black/60 rounded-2xl h-11 text-xs font-bold transition-all"
                                >
                                    Decline
                                </Button>
                            </div>

                            <p className="text-[10px] text-center text-black/20">
                                See our <Link href="/privacy" className="underline hover:text-black/40">Privacy Policy</Link> for more information.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Internal Link component to avoid dependency on next/link if not available or import issues
function Link({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
    return (
        <a href={href} className={className}>
            {children}
        </a>
    );
}
