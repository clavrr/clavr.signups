import Hero from "@/components/Hero";
import FeaturedActions from "@/components/FeaturedActions";
import BackgroundBubbles from "@/components/BackgroundBubbles";
import FeaturedPost from "@/components/FeaturedPost";

export default function Home() {
    return (
        <div className="fixed inset-0 w-full h-[100dvh] bg-white flex flex-col overscroll-none">
            {/* Bubbles at root level */}
            <BackgroundBubbles className="fixed inset-0 z-0 overflow-hidden" />

            {/* Main content - takes remaining space */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 gap-1 md:gap-4 pointer-events-none">
                <FeaturedPost />
                <div className="scale-[0.85] sm:scale-[0.85] md:scale-[0.9] lg:scale-[0.85] flex flex-col items-center">
                    <Hero />
                </div>

                <div className="pointer-events-auto z-20 scale-[0.6] sm:scale-[0.65] md:scale-[0.75] lg:scale-[0.7] -mt-16 md:-mt-32">
                    <FeaturedActions />
                </div>
            </main>
        </div>
    );
}

