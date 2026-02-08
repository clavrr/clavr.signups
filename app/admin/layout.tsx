import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    // Fetch fresh user data including image/name
    // We cast the email to string because we know it exists if session is valid (or redirect handles it)
    // But safely handling it is better
    const userEmail = session.user?.email;

    if (!userEmail) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: userEmail },
        select: { name: true, image: true, email: true }
    });

    const displayUser = user || {
        name: session.user?.name || "User",
        image: session.user?.image || null,
        email: session.user?.email || "",
    };

    return (
        <div className="absolute inset-0 top-[72px] bg-white flex overflow-hidden pl-4 md:pl-32 lg:pl-48">
            <AdminSidebar user={displayUser} />

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
                <div className="h-full max-w-5xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-4 sm:py-6">{children}</div>
            </main>
        </div>
    );
}
