import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(request: NextRequest) {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { prompt, title, mode } = await request.json();

        // Check if API key is configured
        if (!process.env.GOOGLE_API_KEY) {
            return NextResponse.json(
                { error: "AI feature not configured. Please add GOOGLE_API_KEY to your environment." },
                { status: 503 }
            );
        }

        // Need either prompt or title
        if (!prompt && !title) {
            return NextResponse.json(
                { error: "Please provide either text to improve or a title to write about." },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({
            model: process.env.AI_MODEL || "gemini-2.5-flash",
        });

        let systemPrompt = "";

        switch (mode) {
            case "draft":
                // Write from scratch based on title
                systemPrompt = `You are an expert blog writer helping to draft professional content.

The user wants to write a blog post with this title: "${title}"

Write an engaging opening paragraph (3-4 sentences) that:
- Hooks the reader immediately
- Sets up the topic clearly
- Uses a professional but conversational tone
- Avoids clichés and generic openings

Only provide the opening paragraph, no headings or titles. Do not use markdown formatting (no bold **, no italics *, no headers #). Return plain text only.`;
                break;

            case "complete":
                // Continue writing
                systemPrompt = `You are a helpful writing assistant for a professional blog.

${title ? `The blog post is titled: "${title}"` : ""}

Continue the following text naturally and seamlessly. Write 1-2 sentences that flow naturally from what's written. Do not repeat the input text, only provide the continuation. Keep the same tone and style. Do not use markdown formatting.

Text to continue:`;
                break;

            case "rewrite":
                // Improve/refine existing text
                systemPrompt = `You are an expert editor helping improve blog content.

${title ? `The blog post is titled: "${title}"` : ""}

Rewrite the following text to be:
- Clearer and more engaging
- More professional but still conversational
- Better structured with improved flow
- Free of redundancy and filler words

Keep the same core meaning. Only return the improved text, no explanations. Do not use markdown formatting (no bold **, no italics *). Return plain text only.

Text to improve:`;
                break;

            case "expand":
                systemPrompt = `You are a helpful writing assistant for a professional blog.

${title ? `The blog post is titled: "${title}"` : ""}

Expand the following text with more detail, examples, or explanation. Keep the same tone and style. Write 2-3 additional paragraphs. Do not use markdown formatting.

Text to expand:`;
                break;

            case "summarize":
                systemPrompt = `You are a helpful writing assistant. Summarize the following text into a concise 1-2 sentence summary. Do not use markdown formatting.

Text to summarize:`;
                break;

            default:
                systemPrompt = `You are a helpful writing assistant for a professional blog.

${title ? `The blog post is titled: "${title}"` : ""}

Help improve or complete the following text:`;
        }

        const fullPrompt = prompt ? `${systemPrompt}\n\n${prompt}` : systemPrompt;
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        let text = response.text();

        // Clean up any remaining markdown
        text = text.replace(/\*\*/g, "").replace(/\*/g, "").replace(/#/g, "").replace(/`/g, "").trim();

        return NextResponse.json({ completion: text });
    } catch (error: any) {
        console.error("AI completion error:", error?.message || error);
        return NextResponse.json(
            { error: "Failed to generate completion", details: (error as Error).message },
            { status: 500 }
        );
    }
}
