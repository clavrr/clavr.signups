import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as any,
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
            },
            async authorize(credentials) {
                if (!credentials?.email) return null;

                const email = (credentials.email as string).toLowerCase();

                try {
                    let user = await prisma.user.findUnique({
                        where: { email },
                    });

                    if (!user) {
                        user = await prisma.user.create({
                            data: {
                                email,
                                name: email.split("@")[0],
                                role: "author",
                            },
                        });
                    }

                    return user;
                } catch (error) {
                    console.error("Database error in authorize:", error);
                    // Fallback for dev without database
                    return {
                        id: "dev-user",
                        email,
                        name: email.split("@")[0],
                        role: "author",
                    };
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/login",
    },
    callbacks: {
        async signIn({ user, account }) {
            // Only allow @clavr.me emails
            const email = user.email?.toLowerCase();
            if (!email?.endsWith("@clavr.me")) {
                return "/login?error=AccessDenied";
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role ?? "author";
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
};
