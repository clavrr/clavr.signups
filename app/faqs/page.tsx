"use client";

import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const faqs = [
    {
        question: "What exactly is Clavr?",
        answer: "Clavr is an autonomous agent that acts as an ambient layer across your productivity stack (Calendar, Linear, Slack, Email, and more). Unlike reactive tools, it proactively executes cross-platform tasks, like drafting a Linear ticket from a Slack bug report, before you even ask. It's designed to end \"AI amnesia\" by bridging the gap between communication and execution."
    },
    {
        question: "How does it integrate?",
        answer: "Clavr integrates directly with your core tools, Linear, Slack, and Gmail, to automate the \"connective tissue\" of your workflow. By being event-driven rather than prompt-driven, it solves the \"Revenue Leak\" caused by fragmented apps, ensuring no critical bug or high-value lead slips through the cracks."
    },
    {
        question: "Is my data secure?",
        answer: "Security is our top priority. We use SOC2 compliant infrastructure and encrypted storage. We never train our public AI models on your private customer data."
    },
    {
        question: "Can I cancel anytime?",
        answer: "Absolutely. Our Starter plan is month-to-month with no long-term contracts. You can export your data and leave whenever you want."
    }
];

function AccordionItem({ item, isOpen, onClick }: { item: typeof faqs[0], isOpen: boolean, onClick: () => void }) {
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(contentRef.current, {
                height: "auto",
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            });
        } else {
            gsap.to(contentRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });
        }
    }, [isOpen]);

    return (
        <div className="border-t border-black/10 last:border-b">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between group hover:bg-black/[0.02] transition-colors px-4 -mx-4 rounded-lg"
            >
                <h3 className="text-base md:text-lg font-medium text-black text-left pr-8 leading-tight">
                    {item.question}
                </h3>
                <div className="relative flex-shrink-0 w-4 h-4">
                    <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"}`}>
                        <Plus className="w-4 h-4 text-black/40 group-hover:text-black transition-colors" />
                    </span>
                    <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"}`}>
                        <Minus className="w-4 h-4 text-black" />
                    </span>
                </div>
            </button>
            <div
                ref={contentRef}
                className="overflow-hidden h-0 opacity-0"
            >
                <p className="text-sm text-black/60 pb-6 leading-relaxed max-w-2xl">
                    {item.answer}
                </p>
            </div>
        </div>
    );
}

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-white font-sans">

            <main className="pt-24 md:pt-32 pb-24 px-6 md:px-24">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-20 text-center md:text-left">
                        <span className="inline-block text-xs font-bold tracking-[0.2em] text-black/40 uppercase mb-4">
                            Support
                        </span>
                        <h1 className="text-2xl md:text-4xl font-bold text-black mb-6 tracking-tight">
                            Common Questions
                        </h1>
                        <p className="text-base text-black/50 max-w-xl leading-relaxed">
                            Everything you need to know about Clavr's platform, security, and billing.
                        </p>
                    </div>

                    {/* Accordion List */}
                    <div className="flex flex-col">
                        {faqs.map((item, index) => (
                            <AccordionItem
                                key={index}
                                item={item}
                                isOpen={openIndex === index}
                                onClick={() => handleToggle(index)}
                            />
                        ))}
                    </div>
                </div>
            </main>

            {/* Spacer for Fixed Footer */}
            <div className="h-24"></div>
        </div>
    );
}
