"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function DemoPage() {
    // Removed aggressive scroll locking to allow mobile scrolling
    useEffect(() => {
        // Only ensuring the cal instance is ready
    }, []);

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ namespace: "15min" });
            cal("ui", {
                theme: "light",
                hideEventTypeDetails: false,
                layout: "month_view"
            });
        })();
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Cal.com embed - below navigation */}
            <main className="flex-1 pt-24 md:pt-32 flex flex-col pb-20">
                {/* Header with description */}
                <div className="text-center px-4 md:px-8 mb-4 shrink-0">
                    <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
                        Book a Demo
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
                        Schedule a personalized demo to see how Clavr can transform your productivity
                    </p>
                </div>

                {/* Calendar */}
                <div className="w-full flex-1 px-4 md:px-8">
                    <Cal
                        namespace="15min"
                        calLink="clavr-inc-qy7nlq/15min"
                        style={{ width: "100%", height: "100%", minHeight: "600px" }}
                        config={{
                            layout: "month_view",
                            theme: "light"
                        }}
                    />
                </div>
            </main>
        </div>
    );
}
