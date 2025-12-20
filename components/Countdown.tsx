"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: "00",
        hours: "00",
        min: "00",
        sec: "00",
    });

    useEffect(() => {
        const targetDate = new Date("2026-01-10T00:00:00");

        const updateCountdown = () => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const sec = Math.floor((diff % (1000 * 60)) / 1000);

                setTimeLeft({
                    days: days.toString().padStart(2, "0"),
                    hours: hours.toString().padStart(2, "0"),
                    min: min.toString().padStart(2, "0"),
                    sec: sec.toString().padStart(2, "0"),
                });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    const timeUnits = [
        { label: "DAYS", value: timeLeft.days },
        { label: "HOURS", value: timeLeft.hours },
        { label: "MIN", value: timeLeft.min },
        { label: "SEC", value: timeLeft.sec },
    ];

    return (
        <div className="z-20 relative flex flex-col items-center">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
                {timeUnits.map((unit) => (
                    <div key={unit.label} className="flex flex-col items-center">
                        <div className="border border-black/5 rounded-lg sm:rounded-xl px-3 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 min-w-[64px] sm:min-w-[72px] md:min-w-[88px] bg-white/10 backdrop-blur-sm">
                            <span className="block text-4xl sm:text-4xl md:text-5xl font-semibold text-black tabular-nums text-center">
                                {unit.value}
                            </span>
                        </div>
                        <span className="text-[8px] sm:text-[10px] md:text-xs text-black/40 mt-2 sm:mt-3 tracking-widest font-medium">
                            {unit.label}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10 text-black/40 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium">
                <Calendar className="w-3 h-3" />
                <span>Until Beta Launch</span>
            </div>
        </div>
    );
}
