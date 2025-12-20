import { Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full py-4 md:py-6 flex justify-center bg-transparent z-50 relative">
            <a
                href="https://www.linkedin.com/company/109910207/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-blue-600 transition-all duration-300 hover:scale-110"
            >
                <Linkedin className="w-16 h-16 md:w-20 md:h-20" strokeWidth={0.8} />
            </a>
        </footer>
    );
}
