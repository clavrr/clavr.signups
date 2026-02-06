import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5, // Allow zooming but keep layout stable
};

export const metadata: Metadata = {
    metadataBase: new URL("https://clavr.me"),
    title: {
        default: "Clavr - Your OS for Productivity | Join the Private Beta",
        template: "%s | Clavr"
    },
    description: "Clavr is an autonomous agent that converts natural language into reliable, cross-platform actions across your productivity stack. It's the intelligent layer that sits on top of Gmail, Calendar, Tasks, Slack, Notion, Asana, and Google Drive—making them work together autonomously.",
    keywords: [
        "memory",
        "autonomous",
        "speed",
        "privacy",
        "actions",
        "intelligence",
        "remembers",
        "learns",
        "personalized",
        "productivity",
        "Clavr"
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
        title: "Clavr - Your OS for Productivity",
        description: "Clavr is an autonomous agent that converts natural language into reliable, cross-platform actions. Works with Gmail, Calendar, Slack, Notion, Asana & Drive.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Clavr - Your OS for Productivity",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Clavr - Your OS for Productivity",
        description: "An autonomous agent that converts natural language into actions across Gmail, Calendar, Slack, Notion, Asana & Drive.",
        images: ["/og-image.png"],
        creator: "@clavrAI",
    },
    icons: {
        icon: "/favicon.png",
        apple: "/apple-icon.png",
    },
    manifest: "/manifest.json",
};

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
                <Navigation />
                <div className="flex-1 flex flex-col w-full pb-32">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}
