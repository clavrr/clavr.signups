"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpForm() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Handle signup logic
        console.log("Signing up with:", email);
        setTimeout(() => setIsLoading(false), 1000);
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
        </form>
    );
}
