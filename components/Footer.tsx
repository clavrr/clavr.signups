import { Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

const XIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export default function Footer() {
    return (
        <footer className="w-full py-4 flex flex-col items-center gap-4 bg-white/90 backdrop-blur-sm z-50 fixed bottom-0 left-0">
            <div className="flex items-center gap-6 md:gap-10">
                <a
                    href="https://www.linkedin.com/company/clavr-ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-[#0077b5] transition-all duration-300 hover:scale-110"
                >
                    <Linkedin className="w-6.5 h-6.5 md:w-8.5 md:h-8.5" strokeWidth={1.5} />
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
                    <Youtube className="w-6.5 h-6.5 md:w-8.5 md:h-8.5" strokeWidth={1.5} />
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
