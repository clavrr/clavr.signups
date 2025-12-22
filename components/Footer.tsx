import { Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full py-2 md:py-4 flex flex-col items-center gap-2 bg-transparent z-50 relative">
            <a
                href="https://www.linkedin.com/company/clavr-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-blue-600 transition-all duration-300 hover:scale-110"
            >
                <Linkedin className="w-8 h-8 md:w-12 md:h-12" strokeWidth={0.8} />
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
