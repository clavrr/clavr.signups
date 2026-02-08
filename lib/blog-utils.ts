"use client";

export const CATEGORIES = [
    "Engineering",
    "Revenue",
    "Sales",
    "Productivity",
    "Workflows",
    "Strategy",
    "TalkLY"
];

// Extract plain text from TipTap JSON content
export function extractTextFromContent(content: any): string {
    if (!content) return "";

    let text = "";

    function traverse(node: any) {
        if (node.type === "text" && node.text) {
            text += node.text + " ";
        }
        if (node.content && Array.isArray(node.content)) {
            node.content.forEach(traverse);
        }
    }

    traverse(content);
    return text.trim();
}

// Calculate word count
export function countWords(text: string): number {
    if (!text) return 0;
    return text.split(/\s+/).filter(word => word.length > 0).length;
}

// Calculate read time (average reading speed: 200 words per minute)
export function calculateReadTime(wordCount: number): string {
    const wordsPerMinute = 200;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    if (minutes < 1) return "< 1m";
    return `${minutes}m`;
}
