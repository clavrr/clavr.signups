"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Upload, Loader2, Save } from "lucide-react";

export default function ProfilePage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        title: "",
        bio: "",
        image: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/user/profile");
            if (!res.ok) throw new Error("Failed to fetch profile");
            const data = await res.json();
            setFormData({
                name: data.name || "",
                email: data.email || "",
                title: data.title || "",
                bio: data.bio || "",
                image: data.image || "",
            });
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: "Failed to load profile" });
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setMessage(null);

        try {
            const res = await fetch(`/api/upload?filename=${file.name}`, {
                method: "POST",
                body: file,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            setFormData(prev => ({ ...prev, image: data.url }));
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: "Failed to upload image" });
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update profile");

            setMessage({ type: 'success', text: "Saved" });
            setTimeout(() => setMessage(null), 2000);
            router.refresh(); // Update session data in layout
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: "Failed to save" });
            setTimeout(() => setMessage(null), 3000);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 animate-spin text-black/20" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-4 pl-10 md:pl-0">
            <div className="flex items-center gap-3 sm:gap-4">
                <Link href="/admin" className="p-2 -ml-2 text-black/40 hover:text-black transition-colors rounded-lg hover:bg-black/5">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black">Edit Profile</h1>
                    <p className="text-xs sm:text-sm text-black/60">Manage your personal information</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Avatar Section */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-black">Profile Picture</label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                        <div className="relative group">
                            {formData.image ? (
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-black/5 relative">
                                    <Image
                                        src={formData.image}
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                        sizes="96px"
                                    />
                                </div>
                            ) : (
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/5 flex items-center justify-center text-black/40 border border-black/5">
                                    <span className="text-xl sm:text-2xl font-medium">
                                        {formData.name?.[0]?.toUpperCase() || "U"}
                                    </span>
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-white"
                            >
                                <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="px-4 py-2 text-sm font-medium text-black border border-black/10 rounded-xl hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {uploading ? "Uploading..." : "Change Picture"}
                            </button>
                            <p className="text-xs text-black/40">
                                Recommended: Square JPG, PNG. Max 2MB.
                            </p>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-black">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-white text-base"
                            placeholder="Your full name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-black">Job Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-white text-base"
                            placeholder="e.g. Senior Editor"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-black">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            disabled
                            className="w-full px-4 py-3 rounded-xl border border-black/5 bg-black/5 text-black/50 cursor-not-allowed text-base"
                        />
                        <p className="text-xs text-black/40">Email cannot be changed</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-black">Bio</label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-white h-24 sm:h-20 resize-none text-base"
                            placeholder="Tell us a little about yourself..."
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={saving}
                        className="text-sm text-black/60 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                    {message && (
                        <span
                            className={`text-xs animate-fade-in ${message.type === 'success' ? 'text-black/40' : 'text-red-500'}`}
                        >
                            {message.text}
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}
