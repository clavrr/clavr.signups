"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-black/5",
                className
            )}
        />
    );
}

// Common skeleton patterns
export function PostCardSkeleton() {
    return (
        <div className="flex-1 flex flex-col gap-3">
            {/* Card body */}
            <div className="flex-1 relative bg-gray-100/50 rounded-2xl overflow-hidden p-5 flex flex-col items-center justify-center">
                {/* Category pill */}
                <Skeleton className="absolute top-4 left-4 h-5 w-16" />
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-3 max-w-[320px] mx-auto w-full">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-8 w-8 rounded-full mt-2" />
                </div>
            </div>
            {/* Footer */}
            <div className="flex items-center gap-3 px-1 mt-1">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                </div>
            </div>
        </div>
    );
}

export function PostListSkeleton() {
    return (
        <div className="space-y-1">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3 sm:py-2.5">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Skeleton className="w-2 h-2 rounded-full shrink-0" />
                        <div className="flex-1 min-w-0 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-16 sm:hidden" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 ml-4">
                        <Skeleton className="h-3 w-16 hidden sm:block" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function DashboardStatsSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="p-4 rounded-2xl bg-black/[0.02] border border-black/5">
                    <Skeleton className="h-3 w-16 mb-2" />
                    <Skeleton className="h-8 w-12" />
                </div>
            ))}
        </div>
    );
}

export function BlogPostSkeleton() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 animate-pulse">
            {/* Back link */}
            <Skeleton className="h-4 w-24 mb-8" />

            {/* Header */}
            <div className="mb-12">
                <Skeleton className="h-5 w-20 mb-4" />
                <Skeleton className="h-12 w-full mb-2" />
                <Skeleton className="h-12 w-2/3 mb-6" />

                {/* Author */}
                <div className="flex items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-6 w-full" />
            </div>
        </div>
    );
}
