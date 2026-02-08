import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    const body = request.body;

    if (!body || !filename) {
        return NextResponse.json({ error: "File and filename are required" }, { status: 400 });
    }

    try {
        const blob = await put(filename, body, {
            access: 'public',
        });

        return NextResponse.json({ success: true, url: blob.url });
    } catch (error) {
        console.error("Error uploading to Vercel Blob:", error);
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}
