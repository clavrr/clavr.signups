import { Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full py-4 md:py-6 flex flex-col items-center gap-4 bg-transparent z-50 relative">
            <a
                href="https://www.linkedin.com/company/clavr-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-blue-600 transition-all duration-300 hover:scale-110"
            >
                <Linkedin className="w-12 h-12 md:w-20 md:h-20" strokeWidth={0.8} />
            </a>
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
                    Terms
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
