import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import BackgroundBubbles from "@/components/BackgroundBubbles";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="relative h-screen overflow-hidden bg-white flex flex-col items-center justify-between py-2 md:py-6">
            {/* Bubbles at root level */}
            <BackgroundBubbles className="fixed inset-0 z-0 overflow-hidden" />

            <Navigation />

            <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center px-4 pt-12 md:pt-0 gap-2 md:gap-12 pointer-events-none">
                <div className="scale-[0.8] sm:scale-90 md:scale-100 flex flex-col items-center">
                    <Hero />
                </div>

                <div className="pointer-events-auto z-20 scale-[0.55] sm:scale-75 md:scale-90">
                    <Countdown />
                </div>
            </main>

            <div className="pointer-events-auto z-20 w-full mt-auto">
                <Footer />
            </div>
        </div>
    );
}

