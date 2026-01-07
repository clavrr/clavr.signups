import { Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

const XIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
);

export default function Footer() {
    return (
        <footer className="w-full py-2 md:py-4 flex flex-col items-center gap-2 bg-transparent z-50 relative">
            <div className="flex items-center gap-6 md:gap-10">
                <a
                    href="https://www.linkedin.com/company/clavr-ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-[#0077b5] transition-all duration-300 hover:scale-110"
                >
                    <Linkedin className="w-6.5 h-6.5 md:w-8.5 md:h-8.5" strokeWidth={0.8} />
                </a>
                <a
                    href="https://x.com/clavrrr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-black transition-all duration-300 hover:scale-110"
                >
                    <XIcon className="w-6 h-6 md:w-8 md:h-8" />
                </a>
                <a
                    href="https://www.youtube.com/@Clavr_0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-[#FF0000] transition-all duration-300 hover:scale-110"
                >
                    <Youtube className="w-6.5 h-6.5 md:w-8.5 md:h-8.5" strokeWidth={0.8} />
                </a>
            </div>
            <div className="flex gap-4">
                <Link
                    href="/privacy"
                    className="text-gray-600 hover:text-black text-sm transition-colors duration-300"
                >
                    Privacy
                </Link>
                <Link
                    href="/terms"
                    className="text-gray-600 hover:text-black text-sm transition-colors duration-300"
                >
                    Service
                </Link>
                <Link
                    href="/use"
                    className="text-gray-600 hover:text-black text-sm transition-colors duration-300"
                >
                    Use
                </Link>
            </div>
        </footer>
    );
}
