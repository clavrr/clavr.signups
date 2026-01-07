"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxK7wd382jfjZpD2o1lfAL90CtXL9slSu6GLqqPaKfhAckXY73z9wGfwrDSVyu2RS2-oA/exec";

export default function SignUpForm() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [step, setStep] = useState<"email" | "name">("email");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [signupCount, setSignupCount] = useState<number | null>(null);

    // Fetch signup count on mount and poll every 10 seconds for real-time updates
    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await fetch(APPS_SCRIPT_URL);
                const data = await response.json();
                setSignupCount(data.count);
            } catch (error) {
                console.error("Failed to fetch signup count:", error);
            }
        };

        // Fetch immediately
        fetchCount();

        // Poll every 10 seconds for real-time updates
        const interval = setInterval(fetchCount, 10000);

        return () => clearInterval(interval);
    }, []);

    // Auto-dismiss success message after 3 seconds to show counter
    useEffect(() => {
        if (status === "success") {
            const timeout = setTimeout(() => {
                setStatus("idle");
                setStep("email");
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [status]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step === "email" && email) {
            setStep("name");
            return;
        }

        if (step === "name" && name) {
            setIsLoading(true);
            setStatus("idle");
            setErrorMessage("");

            try {
                const response = await fetch(APPS_SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors", // Required for Apps Script
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, name }),
                });

                // With no-cors mode, we can't read the response, but if it doesn't throw, it succeeded
                setStatus("success");
                setEmail("");
                setName("");
                // Optimistically increment count
                setSignupCount((prev) => (prev !== null ? prev + 1 : 1));
            } catch (error) {
                console.error("Signup error:", error);
                setStatus("error");
                setErrorMessage("Something went wrong. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <form
            className="w-full max-w-lg mx-auto"
            onSubmit={handleSubmit}
        >

            {/* Main container */}
            <div className="relative flex items-center w-full max-w-lg mx-auto bg-black/5 border border-black/5 rounded-full p-1.5 sm:p-2 backdrop-blur-xl">
                <div className="w-4 sm:w-6 shrink-0" />
                <div className="flex-1 min-w-0 h-10 sm:h-14">
                    <AnimatePresence mode="wait">
                        {step === "email" ? (
                            <motion.input
                                key="email"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                type="email"
                                placeholder="Enter your email"
                                className="w-full h-full bg-transparent text-black text-sm sm:text-lg placeholder:text-black/60 focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                            />
                        ) : (
                            <motion.input
                                key="name"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                type="text"
                                placeholder="Enter your name"
                                className="w-full h-full bg-transparent text-black text-sm sm:text-lg placeholder:text-black/60 focus:outline-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                autoFocus
                            />
                        )}
                    </AnimatePresence>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="h-10 sm:h-14 px-5 sm:px-10 bg-black text-white font-semibold transform-gpu text-xs sm:text-base hover:bg-black/90 transition-all duration-200 rounded-full shrink-0 shadow-lg flex items-center justify-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-3 w-3 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span className="hidden sm:inline">Joining...</span>
                            <span className="sm:hidden">...</span>
                        </span>
                    ) : (
                        step === "email" ? "Get early access" : "Confirm access"
                    )}
                </button>
            </div>

            {/* Message container with smooth transitions */}
            <div className="mt-4 h-8 relative overflow-hidden">
                {/* Success message */}
                <div
                    className={`absolute inset-0 flex items-center justify-center text-center text-black font-medium transition-all duration-500 ease-out ${status === "success"
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                        }`}
                >
                    🎉 You're on the list! We'll be in touch soon.
                </div>

                {/* Error message */}
                <div
                    className={`absolute inset-0 flex items-center justify-center text-center text-red-600 font-medium transition-all duration-500 ease-out ${status === "error"
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                        }`}
                >
                    {errorMessage}
                </div>

                {/* Signup counter */}
                <div
                    className={`absolute inset-0 flex items-center justify-center text-center text-black/70 text-sm sm:text-base font-medium transition-all duration-500 ease-out ${status === "idle" && signupCount !== null
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                        }`}
                >
                    <span className="inline-flex items-center gap-1.5">
                        🧑 <span className="font-semibold text-black">{signupCount}</span> and counting
                    </span>
                </div>
            </div>
        </form>
    );
}
