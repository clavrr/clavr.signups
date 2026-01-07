"use client";

import Image from "next/image";

export default function Navigation() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-xl">
            <div className="flex flex-col w-full">
                {/* Top Spacer Buffer */}
                <div className="h-3 md:h-6 w-full" />

                <div className="flex items-center">
                    {/* Left Spacer Buffer - ONLY ON DESKTOP */}
                    <div className="hidden md:block md:w-64 shrink-0" />

                    <div className="flex-1 flex justify-center md:justify-start">
                        <Image
                            src="/logos/Clavr - Full Lockup - Black.png"
                            alt="Clavr Logo"
                            width={140}
                            height={36}
                            className="h-6 md:h-12 w-auto mb-3 md:mb-6"
                            priority
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
