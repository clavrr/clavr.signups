"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-xl">
            <div className="flex flex-col w-full">
                {/* Top Spacer Buffer */}
                <div className="h-3 md:h-6 w-full" />

                <div className="flex items-center justify-between px-6 md:px-32 lg:px-48 relative">
                    {/* Logo */}
                    <div className="pointer-events-auto z-50">
                        <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
                            <Image
                                src="/logos/Clavr Logo - Black - Full Lockup.png"
                                alt="Clavr Logo"
                                width={140}
                                height={49}
                                className="h-6 md:h-10 w-auto"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links & CTA */}
                    <div className="hidden md:flex items-center gap-8 pointer-events-auto">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" asChild className="text-base text-black/60 hover:text-black hover:bg-black/5">
                                <Link href="/">Home</Link>
                            </Button>
                            <Button variant="ghost" asChild className="text-base text-black/60 hover:text-black hover:bg-black/5">
                                <Link href="/product">Product</Link>
                            </Button>
                            <Button variant="ghost" asChild className="text-base text-black/60 hover:text-black hover:bg-black/5">
                                <Link href="/blog">Blog</Link>
                            </Button>
                            <Button variant="ghost" asChild className="text-base text-black/60 hover:text-black hover:bg-black/5">
                                <Link href="/faqs">FAQs</Link>
                            </Button>
                        </div>

                        {/* Demo Button */}
                        <Link
                            href="/demo"
                            className="demo-btn px-5 py-2 bg-black text-sm font-medium rounded-full border border-black hover:bg-white transition-all duration-300"
                        >
                            Book Demo
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle & CTA */}
                    <div className="flex md:hidden items-center gap-3 pointer-events-auto z-50">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 outline-none"
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-black block origin-center"
                            />
                            <motion.span
                                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-6 h-0.5 bg-black block"
                            />
                            <motion.span
                                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-black block origin-center"
                            />
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-black/5 absolute top-full left-0 right-0 shadow-xl"
                        >
                            <div className="flex flex-col p-6 gap-4 items-center mb-6">
                                <Link
                                    href="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-black/80 hover:text-black py-2"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/product"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-black/80 hover:text-black py-2"
                                >
                                    Product
                                </Link>
                                <Link
                                    href="/blog"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-black/80 hover:text-black py-2"
                                >
                                    Blog
                                </Link>
                                <Link
                                    href="/faqs"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-black/80 hover:text-black py-2"
                                >
                                    FAQs
                                </Link>
                                <Link
                                    href="/demo"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="demo-btn mt-2 px-6 py-2.5 bg-black text-sm font-medium rounded-full border border-black hover:bg-white transition-all duration-300 w-full text-center max-w-[200px]"
                                >
                                    Book Demo
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
