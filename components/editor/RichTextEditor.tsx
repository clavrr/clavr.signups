"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useState, useCallback, useEffect, useRef } from "react";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    Code2,
    Link as LinkIcon,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Quote,
    Undo,
    Redo,
    RefreshCw,
    Loader2,
} from "lucide-react";

interface RichTextEditorProps {
    content: any;
    onChange: (content: any) => void;
    placeholder?: string;
    title?: string;
}

export default function RichTextEditor({
    content,
    onChange,
    placeholder = "Start writing your story...",
    title = "",
}: RichTextEditorProps) {
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [aiMode, setAiMode] = useState<string | null>(null);
    const [completion, setCompletion] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");

    // Use ref for completion to access in event listener
    const completionRef = useRef("");
    useEffect(() => {
        completionRef.current = completion;
    }, [completion]);

    const handleAiComplete = useCallback(async (mode: string) => {
        if (!editor || isAiLoading) return;

        setIsAiLoading(true);
        setAiMode(mode);

        try {
            // Get current text content
            const text = editor.getText();

            // Get selected text or use last paragraph
            const { from, to } = editor.state.selection;
            const selectedText = editor.state.doc.textBetween(from, to, " ");

            const prompt = selectedText || text.slice(-500); // Last 500 chars for context

            // Check if we have text or title to work with
            const hasContent = prompt && prompt.trim().length > 0;
            const hasTitle = title && title.trim().length > 0;

            if (!hasContent && !hasTitle) {
                alert("Please write some text or add a title first.");
                setIsAiLoading(false);
                setAiMode(null);
                return;
            }

            const response = await fetch("/api/ai/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: hasContent ? prompt : "",
                    title: title || "",
                    mode: hasContent ? mode : "draft", // Use "draft" mode if no content
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to get AI completion");
            }

            const data = await response.json();

            if (data.completion) {
                if (mode === "rewrite" && selectedText) {
                    // Replace selected text
                    editor.chain().focus().deleteSelection().insertContent(data.completion).run();
                } else {
                    // Insert at cursor or end
                    editor.chain().focus().insertContent(" " + data.completion).run();
                }
            }
        } catch (error) {
            console.error("AI completion error:", error);
        } finally {
            setIsAiLoading(false);
            setAiMode(null);
        }
    }, [isAiLoading, title]); // Removed editor dependency to avoid stale closure issues if editor recreates (unlikely but safe)

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline',
                },
            }),
        ],
        content,
        immediatelyRender: false, // Fix SSR hydration mismatch
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
            setDebouncedValue(editor.getText());
        },
        editorProps: {
            attributes: {
                class:
                    "prose prose-lg max-w-none focus:outline-none min-h-[400px] px-6 py-4",
            },
            handleKeyDown: (view, event) => {
                // Tab + Space for specific manual trigger if needed, but we use the listener below for general Tab
                if (event.key === "Tab" && !event.shiftKey && completionRef.current) {
                    // This might not catch it if the React state hasn't propagated to this closure
                    // prompting us to use the DOM listener which reads the Ref
                    return true;
                }
                return false;
            },
        },
    });

    // Update handleAiComplete to use the editor instance
    // I moved handleAiComplete *above* useEditor but it needs 'editor'.
    // In React, functions using 'editor' must be defined *after* 'editor' or use a ref. 
    // BUT 'useEditor' returns the instance. 
    // Let's move handleAiComplete back down or use 'editor' from the hook result.

    // Actually, I'll just put handleAiComplete definition AFTER editor creation below in the final code.
    // Making it a bit cleaner.

    // Fetch completion buffer
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!editor || !debouncedValue || debouncedValue.length < 50) return;

            // Only suggest if at end of paragraph or sentence
            const selection = editor.state.selection;
            const { $head } = selection;
            const isAtEnd = $head.parentOffset === $head.parent.content.size;

            if (!isAtEnd) return;

            try {
                const response = await fetch("/api/ai/complete", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        prompt: debouncedValue.slice(-200), // Context
                        title: title || "",
                        mode: "complete",
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.completion) {
                        // Simple check to avoid annoyances: don't suggest if it's just punctuation
                        if (data.completion.trim().length > 3) {
                            setCompletion(data.completion);
                        }
                    }
                }
            } catch (error) {
                console.error("Autocomplete error:", error);
            }
        }, 1500); // 1.5s pause

        return () => clearTimeout(timer);
    }, [debouncedValue, editor, title]);

    // Handle Tab to accept completion
    useEffect(() => {
        if (!editor) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Tab" && completionRef.current) {
                event.preventDefault();
                event.stopPropagation(); // Stop other handlers
                editor.chain().focus().insertContent(" " + completionRef.current).run();
                setCompletion("");
                return;
            }
            // Clear completion on other typing
            if (completionRef.current && !event.metaKey && !event.ctrlKey && !event.altKey && event.key.length === 1) {
                setCompletion("");
            }
        };

        const dom = editor.view.dom;
        dom.addEventListener('keydown', handleKeyDown);

        return () => {
            dom.removeEventListener('keydown', handleKeyDown);
        };
    }, [editor]);

    // Re-define handleAiComplete to access the editor instance correctly
    const triggerAi = useCallback(async (mode: string) => {
        if (!editor || isAiLoading) return;

        setIsAiLoading(true);
        setAiMode(mode);

        try {
            const text = editor.getText();
            const { from, to } = editor.state.selection;
            const selectedText = editor.state.doc.textBetween(from, to, " ");
            const prompt = selectedText || text.slice(-500);

            const hasContent = prompt && prompt.trim().length > 0;
            const hasTitle = title && title.trim().length > 0;

            if (!hasContent && !hasTitle) {
                alert("Please write some text or add a title first.");
                setIsAiLoading(false);
                setAiMode(null);
                return;
            }

            const response = await fetch("/api/ai/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: hasContent ? prompt : "",
                    title: title || "",
                    mode: hasContent ? mode : "draft",
                }),
            });

            if (!response.ok) throw new Error("Failed to get AI completion");

            const data = await response.json();

            if (data.completion) {
                if (mode === "rewrite" && selectedText) {
                    editor.chain().focus().deleteSelection().insertContent(data.completion).run();
                } else {
                    editor.chain().focus().insertContent(" " + data.completion).run();
                }
            }
        } catch (error) {
            console.error("AI completion error:", error);
        } finally {
            setIsAiLoading(false);
            setAiMode(null);
        }
    }, [editor, isAiLoading, title]);

    if (!editor) {
        return null;
    }

    const ToolbarButton = ({ onClick, isActive, children, title, disabled }: any) => (
        <button
            type="button"
            onClick={onClick}
            title={title}
            disabled={disabled}
            className={`p-2 rounded-lg transition-colors ${disabled
                ? "opacity-50 cursor-not-allowed"
                : isActive
                    ? "bg-black text-white"
                    : "text-black/40 hover:text-black hover:bg-black/5"
                }`}
        >
            {children}
        </button>
    );

    const AiButton = ({ onClick, children, title, mode }: any) => (
        <button
            type="button"
            onClick={onClick}
            title={title}
            disabled={isAiLoading}
            className={`p-2 rounded-lg transition-all flex items-center gap-1 text-sm ${isAiLoading && aiMode === mode
                ? "bg-black/10 text-black"
                : "text-black/60 hover:bg-black/5 hover:text-black"
                }`}
        >
            {isAiLoading && aiMode === mode ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
        </button>
    );

    return (
        <div className="flex flex-col w-full min-h-[500px] border border-black/10 rounded-2xl overflow-hidden bg-white group focus-within:ring-2 focus-within:ring-black/5 transition-all">
            {/* Toolbar - Sticky at the top of the editor container */}
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-20 w-full overflow-x-auto scrollbar-hide">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                    title="Bold"
                >
                    <Bold className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                    title="Italic"
                >
                    <Italic className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    isActive={editor.isActive("underline")}
                    title="Underline"
                >
                    <UnderlineIcon className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive("strike")}
                    title="Strikethrough"
                >
                    <Strikethrough className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-5 bg-black/10 mx-2" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    isActive={editor.isActive("code")}
                    title="Inline Code"
                >
                    <Code className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    isActive={editor.isActive("codeBlock")}
                    title="Code Block"
                >
                    <Code2 className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => {
                        const url = window.prompt('Enter URL');
                        if (url) {
                            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                        }
                    }}
                    isActive={editor.isActive("link")}
                    title="Insert Link"
                >
                    <LinkIcon className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-5 bg-black/10 mx-2" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive("heading", { level: 1 })}
                    title="Heading 1"
                >
                    <Heading1 className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive("heading", { level: 2 })}
                    title="Heading 2"
                >
                    <Heading2 className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-6 bg-gray-200 mx-2" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive("bulletList")}
                    title="Bullet List"
                >
                    <List className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive("orderedList")}
                    title="Ordered List"
                >
                    <ListOrdered className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive("blockquote")}
                    title="Quote"
                >
                    <Quote className="w-4 h-4" />
                </ToolbarButton>

                <div className="flex-1" />

                {/* AI Buttons */}
                <div className="flex items-center gap-1 px-3 py-1.5 bg-black/5 rounded-xl">
                    <AiButton
                        onClick={() => triggerAi("rewrite")}
                        title="Refine selected text"
                        mode="rewrite"
                    >
                        <span className="hidden sm:inline">Refine</span>
                        <RefreshCw className="w-4 h-4 sm:hidden" />
                    </AiButton>
                </div>

                <div className="w-px h-6 bg-gray-200 mx-2" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    title="Undo"
                >
                    <Undo className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    title="Redo"
                >
                    <Redo className="w-4 h-4" />
                </ToolbarButton>
            </div>

            {/* AI Status Bar */}
            {isAiLoading && (
                <div className="flex items-center gap-2 px-4 py-2 bg-black/5 border-b border-black/5 text-black/60 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>
                        {aiMode === "complete" && "Generating continuation..."}
                        {aiMode === "expand" && "Expanding content..."}
                        {aiMode === "rewrite" && "Rewriting text..."}
                        {aiMode === "draft" && "Drafting content..."}
                    </span>
                </div>
            )}

            {/* Editor Content - Scrollable area */}
            <div className="relative flex-1 overflow-y-auto max-h-[700px] scrollbar-thin scrollbar-thumb-black/10 scrollbar-track-transparent">
                <EditorContent editor={editor} />

                {/* Autocomplete Hint */}
                {completion && (
                    <div className="absolute bottom-6 right-6 z-20 pointer-events-none">
                        <div className="flex items-center gap-2 text-black/40 text-sm bg-white/80 backdrop-blur-sm border border-black/5 shadow-lg rounded-xl px-4 py-2.5 animate-in fade-in slide-in-from-bottom-4">
                            <span className="font-bold text-black/60 px-2 py-0.5 bg-black/5 rounded-lg text-xs tracking-tight">Tab</span>
                            <span>to complete:</span>
                            <span className="italic truncate max-w-[200px] sm:max-w-md text-black/50">
                                "{completion.slice(0, 40)}{completion.length > 40 ? "..." : ""}"
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Keyboard hint */}
            <div className="px-4 py-2 border-t border-black/5 bg-black/[0.01] text-[10px] sm:text-xs text-black/30 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                    <span>Markdown supported</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 bg-black/5 rounded text-black/50 mx-1">Tab</kbd> to AI complete</span>
                </div>
                {completion && (
                    <button
                        onClick={() => {
                            editor.chain().focus().insertContent(" " + completion).run();
                            setCompletion("");
                        }}
                        className="text-black/60 font-bold hover:text-black transition-colors"
                    >
                        Accept Suggestion →
                    </button>
                )}
            </div>

            <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror:focus {
          outline: none;
        }
        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .ProseMirror p {
          margin-bottom: 1rem;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          font-style: italic;
          color: #6b7280;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .ProseMirror code {
          background: #f3f4f6;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }
        .ProseMirror pre {
          background: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-bottom: 1rem;
        }
        .ProseMirror pre code {
          background: none;
          padding: 0;
          color: inherit;
        }
        .ProseMirror s {
          text-decoration: line-through;
        }
        .ProseMirror u {
          text-decoration: underline;
        }
        .ProseMirror a {
          color: #2563eb;
          text-decoration: underline;
        }
      `}</style>
        </div>
    );
}
