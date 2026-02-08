"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[] | string[];
    placeholder?: string;
    className?: string;
}

export function Select({
    value,
    onChange,
    options,
    placeholder = "Select",
    className,
}: SelectProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Close on click outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Only for desktop where it's not a modal
            if (window.innerWidth >= 640 && containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Lock body scroll when mobile menu is open
    React.useEffect(() => {
        if (isOpen && window.innerWidth < 640) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const normalizedOptions: SelectOption[] = React.useMemo(() => {
        return options.map((opt) => {
            if (typeof opt === "string") {
                return { label: opt, value: opt };
            }
            return opt;
        });
    }, [options]);

    const selectedOption = normalizedOptions.find((opt) => opt.value === value);

    return (
        <div className={cn("relative w-full", className)} ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between py-2 text-left bg-transparent border-b border-black/10 transition-colors focus:outline-none",
                    isOpen ? "border-black/30" : "hover:border-black/20",
                    !value && "text-black/30"
                )}
            >
                <span className={cn("text-sm sm:text-base", !selectedOption && "text-black/30")}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    className={cn(
                        "w-4 h-4 text-black/40 transition-transform duration-200",
                        isOpen && "transform rotate-180"
                    )}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Mobile Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/20 z-[60] sm:hidden backdrop-blur-[2px]"
                        />

                        {/* Dropdown / Bottom Sheet */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: typeof window !== 'undefined' && window.innerWidth < 640 ? "100%" : -10,
                                scale: typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : 0.95
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1
                            }}
                            exit={{
                                opacity: 0,
                                y: typeof window !== 'undefined' && window.innerWidth < 640 ? "100%" : -10,
                                scale: typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : 0.95
                            }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={cn(
                                // Base styles
                                "bg-white overflow-hidden py-1 overflow-y-auto",
                                // Desktop styles (absolute dropdown)
                                "sm:absolute sm:z-50 sm:w-full sm:mt-1 sm:rounded-xl sm:shadow-lg sm:border sm:border-black/5 sm:max-h-60 sm:left-0 sm:bottom-auto sm:right-auto",
                                // Mobile styles (fixed bottom sheet)
                                "fixed z-[70] bottom-0 left-0 right-0 rounded-t-2xl shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] border-t border-black/5 max-h-[50vh] pb-safe"
                            )}
                        >
                            {/* Mobile Header (optional but good for UX) */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-black/5 sm:hidden sticky top-0 bg-white z-10">
                                <span className="font-medium text-black/40 text-xs uppercase tracking-wider">Select Category</span>
                                <button onClick={() => setIsOpen(false)} className="p-1 -mr-1 text-black/40 hover:text-black">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {normalizedOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-center justify-between px-4 py-3 sm:px-3 sm:py-2 text-left transition-colors hover:bg-black/5 active:bg-black/5",
                                        "text-base sm:text-sm", // Larger text on mobile
                                        option.value === value && "bg-black/5 font-medium"
                                    )}
                                >
                                    <span>{option.label}</span>
                                    {option.value === value && (
                                        <Check className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-black" />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
