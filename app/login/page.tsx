"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (session) {
            router.push("/admin");
        }
    }, [session, router]);

    const handleCredentialsSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                redirect: false,
                callbackUrl: "/admin"
            });

            if (result?.error) {
                setError("Sign in failed. Please try again.");
            } else if (result?.ok) {
                router.push("/admin");
            }
        } catch (error) {
            console.error("Sign in error:", error);
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        setIsGoogleLoading(true);
        signIn("google", { callbackUrl: "/admin" });
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-black/30" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-sm sm:max-w-[380px]"
            >
                {/* Logo */}
                <Link href="/" className="block mb-10 sm:mb-12">
                    <Image
                        src="/logos/Clavr Logo - Black - Full Lockup.png"
                        alt="Clavr"
                        width={100}
                        height={28}
                        className="mx-auto"
                        priority
                    />
                </Link>

                {/* Header */}
                <div className="text-center mb-8 sm:mb-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-black">Sign in</h1>
                    <p className="text-black/40 text-base sm:text-lg mt-2">to continue to Clavr Admin</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 rounded-xl text-red-600 text-sm text-center">
                        {error}
                    </div>
                )}

                {/* Google Sign In */}
                <button
                    onClick={handleGoogleSignIn}
                    disabled={isGoogleLoading}
                    className="w-full flex items-center justify-center gap-3 h-14 sm:h-14 bg-white border border-black/10 rounded-2xl text-base sm:text-lg font-medium text-black hover:border-black/20 hover:shadow-sm active:scale-[0.98] transition-all disabled:opacity-50"
                >
                    {isGoogleLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                    )}
                    Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6 sm:my-8">
                    <div className="flex-1 h-px bg-black/10" />
                    <span className="text-sm sm:text-base text-black/30">or</span>
                    <div className="flex-1 h-px bg-black/10" />
                </div>

                {/* Email Sign In */}
                <form onSubmit={handleCredentialsSignIn} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full px-5 h-14 rounded-2xl border border-black/10 focus:border-black/20 focus:outline-none text-base sm:text-lg placeholder:text-black/30 transition-colors"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !email}
                        className="w-full h-14 bg-black text-white text-base sm:text-lg font-medium rounded-2xl hover:bg-black/90 active:scale-[0.98] transition-all disabled:opacity-40"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Continue"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm sm:text-base text-black/30 mt-8 sm:mt-10">
                    <Link href="/" className="hover:text-black/50 active:text-black/60 transition-colors">← Back to home</Link>
                </p>
            </motion.div>
        </div>
    );
}
