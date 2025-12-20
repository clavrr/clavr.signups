"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwBjJFxYEmKv7MmRG2tDZPaiI6iursoNM6sdKJZEVW2l7e1c4ovbYnd5tjGnrMWlUAW/exec";

export default function SignUpForm() {
    const [email, setEmail] = useState("");
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
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [status]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                body: JSON.stringify({ email }),
            });

            // With no-cors mode, we can't read the response, but if it doesn't throw, it succeeded
            setStatus("success");
            setEmail("");
            // Optimistically increment count
            setSignupCount((prev) => (prev !== null ? prev + 1 : 1));
        } catch (error) {
            console.error("Signup error:", error);
            setStatus("error");
            setErrorMessage("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            className="w-full max-w-lg mx-auto"
            onSubmit={handleSubmit}
        >

            {/* Main container */}
            <div className="relative flex items-center w-[95%] sm:w-full mx-auto bg-black/5 border border-black/5 rounded-full p-1.5 sm:p-2 backdrop-blur-xl">
                <div className="w-6 sm:w-8 shrink-0" />
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 h-12 sm:h-16 bg-transparent text-black text-base sm:text-lg placeholder:text-black/60 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="h-12 sm:h-16 bg-black text-white font-semibold transform-gpu text-sm sm:text-base hover:bg-black/90 transition-all duration-200 rounded-full shrink-0 shadow-lg flex items-center justify-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    <div className="w-10 sm:w-14 shrink-0" />
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span className="hidden sm:inline">Joining...</span>
                            <span className="sm:hidden">...</span>
                        </span>
                    ) : (
                        "Get early access"
                    )}
                    <div className="w-10 sm:w-14 shrink-0" />
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
