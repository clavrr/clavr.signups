import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://clavr.me"),
    title: {
        default: "Clavr - AI-Powered Productivity Assistant | Join the Private Beta",
        template: "%s | Clavr"
    },
    description: "Clavr is the AI brain your productivity stack was missing. Autonomous, private, and personalized. Connect your tools, let Clavr handle the rest. Join the private beta today.",
    keywords: [
        "AI assistant",
        "productivity",
        "AI productivity",
        "autonomous AI",
        "personal AI",
        "productivity tools",
        "AI automation",
        "Clavr",
        "private beta",
        "intelligent assistant"
    ],
    authors: [{ name: "Clavr" }],
    creator: "Clavr",
    publisher: "Clavr",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://clavr.me",
        siteName: "Clavr",
        title: "Clavr - AI-Powered Productivity Assistant",
        description: "The AI brain your productivity stack was missing. Autonomous, private, and personalized. Join the private beta.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Clavr - AI-Powered Productivity Assistant",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Clavr - AI-Powered Productivity Assistant",
        description: "The AI brain your productivity stack was missing. Join the private beta.",
        images: ["/og-image.png"],
        creator: "@clavrAI",
    },
    icons: {
        icon: "/icon.png",
        apple: "/apple-icon.png",
    },
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}
