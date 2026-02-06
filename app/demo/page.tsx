"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function DemoPage() {
    useEffect(() => {
        // Save original styles
        const originalHtmlOverflow = document.documentElement.style.overflow;
        const originalBodyOverflow = document.body.style.overflow;
        const originalBodyHeight = document.body.style.height;
        const originalBodyMinHeight = document.body.style.minHeight;

        // Force viewport constraints
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
        document.body.style.minHeight = "0";

        // Find the specific content wrapper in layout.tsx and constrain it
        // Structure: body > Navigation, div.flex-1, Footer
        const contentWrapper = document.body.querySelector('div.flex-1.flex.flex-col.w-full') as HTMLElement;
        let originalWrapperMinHeight = "";

        if (contentWrapper) {
            originalWrapperMinHeight = contentWrapper.style.minHeight;
            contentWrapper.style.minHeight = "0";
        }

        return () => {
            document.documentElement.style.overflow = originalHtmlOverflow;
            document.body.style.overflow = originalBodyOverflow;
            document.body.style.height = originalBodyHeight;
            document.body.style.minHeight = originalBodyMinHeight;

            if (contentWrapper) {
                contentWrapper.style.minHeight = originalWrapperMinHeight;
            }
        };
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
        <div className="h-full bg-white flex flex-col">
            {/* Cal.com embed - below navigation */}
            <main className="flex-1 pt-20 md:pt-24 flex flex-col overflow-hidden">
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
                <div className="w-full h-full flex-1 min-h-0 px-4 md:px-8 pb-4">
                    <Cal
                        namespace="15min"
                        calLink="clavr-inc-qy7nlq/15min"
                        style={{ width: "100%", height: "100%" }}
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
