"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, FileText, PlusCircle, LogOut, ArrowUpRight, Menu, X } from "lucide-react";

interface AdminSidebarProps {
    user: {
        name: string | null;
        image: string | null;
        email: string | null;
    };
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/posts", label: "Posts", icon: FileText },
        { href: "/admin/posts/new", label: "New Post", icon: PlusCircle },
    ];

    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {/* Mobile hamburger button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-[84px] left-4 z-50 p-2 bg-white rounded-lg shadow-sm border border-black/5 md:hidden"
                aria-label="Toggle menu"
            >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:relative inset-y-0 left-0 z-40 
                w-64 flex flex-col bg-white shrink-0
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                md:transform-none pt-4 md:pt-0 pl-4 md:pl-0
            `}>
                {/* User Profile */}
                <div className="pr-4 py-4 mt-12 md:mt-0">
                    <Link href="/admin/profile" className="flex items-center gap-3 group" onClick={closeSidebar}>
                        {user?.image ? (
                            <img
                                src={user.image}
                                alt={user.name || "User"}
                                className="w-9 h-9 rounded-full object-cover group-hover:opacity-80 transition-opacity"
                            />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                <span className="text-sm font-medium text-black/60">
                                    {user?.name?.[0]?.toUpperCase() || "U"}
                                </span>
                            </div>
                        )}
                        <span className="font-medium text-sm text-black truncate group-hover:text-black/70 transition-colors">
                            {user?.name || "Admin"}
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="pr-4 space-y-1">
                    {navItems.map((item) => {
                        // Exact match for most items, special handling for posts list
                        const isActive = pathname === item.href ||
                            (item.href === "/admin/posts" && pathname?.startsWith("/admin/posts/") && !pathname?.includes("/new"));
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeSidebar}
                                className={`flex items-center gap-3 pl-0 pr-4 py-2.5 md:py-2 rounded-xl transition-all duration-200 ${isActive
                                    ? "bg-black/5 text-black font-semibold"
                                    : "text-black/40 hover:text-black"
                                    }`}
                            >
                                <Icon className="w-5 h-5 md:w-4 md:h-4" />
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions */}
                <div className="pr-4 pt-6 space-y-1">
                    <Link
                        href="/"
                        onClick={closeSidebar}
                        className="flex items-center gap-2 py-2 md:py-1.5 text-sm md:text-xs text-black/30 hover:text-black/60 transition-colors"
                    >
                        <span>View Site</span>
                        <ArrowUpRight className="w-3 h-3 md:w-2.5 md:h-2.5" />
                    </Link>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-2 py-2 md:py-1.5 text-sm md:text-xs text-black/30 hover:text-black/60 transition-colors"
                    >
                        <LogOut className="w-4 h-4 md:w-3 md:h-3" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
