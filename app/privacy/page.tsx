"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Mail, Lock, Users, Database, Eye, Trash2, Cookie, Baby, Bell } from "lucide-react";

import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col">
            {/* Sticky Back Button - Transparent and borderless per user request */}
            <div className="fixed top-0 left-0 right-0 z-50 py-5 px-8 md:py-8 md:px-20 flex justify-center pointer-events-none">
                <div className="w-full max-w-3xl pointer-events-auto">
                    <Link
                        href="/"
                        className="clay-back-btn inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm px-4 py-2 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </Link>
                </div>
            </div>

            <div className="flex-1 pt-12 md:pt-32 pb-8 md:pb-16 px-10 md:px-8 flex flex-col items-center">
                <div className="w-full max-w-2xl">
                    {/* Header Card */}
                    <div className="clay-card p-4 md:p-10 mb-4 md:mb-10 text-center" style={{ backgroundColor: '#ffffff' }}>
                        <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2" style={{ color: '#000000', margin: 0 }}>Privacy Policy</h1>
                        <p className="text-gray-400 text-xs md:text-sm">Last updated: November 1, 2025</p>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-8 md:space-y-10">
                        <Section icon={<Shield className="w-5 h-5" />} title="Your Privacy Matters">
                            <p>
                                At Clavr, we take your privacy seriously. We built our autonomous intelligent productivity platform with privacy and security at the core.
                            </p>
                        </Section>

                        <Section icon={<Database className="w-5 h-5" />} title="Data We Access">
                            <p className="mb-3">All access is granted only with your explicit permission:</p>
                            <ul className="space-y-3">
                                <li>Email messages you explicitly grant access to</li>
                                <li>Sent emails (to learn your writing style)</li>
                                <li>Google Calendar events</li>
                                <li>Google Tasks</li>
                                <li>Slack messages and channels</li>
                                <li>Notion pages and databases</li>
                                <li>Basic account information</li>
                            </ul>
                        </Section>

                        <Section icon={<Mail className="w-5 h-5" />} title="How We Handle Your Emails">
                            <p>
                                <strong>We don&apos;t store your emails.</strong> Emails are fetched in real-time, processed for context, and not kept. We only store minimal metadata needed for the service.
                            </p>
                        </Section>

                        <Section icon={<Users className="w-5 h-5" />} title="Third-Party Integrations">
                            <p>
                                For Google Calendar, Slack, and Notion: we access data only with your permission, process it in real-time, and don&apos;t store it permanently. You can revoke access anytime.
                            </p>
                        </Section>

                        <Section icon={<Shield className="w-5 h-5" />} title="Google Security Verification">
                            <p>
                                Clavr has passed Google&apos;s extensive security checks and maintains compliance with Google&apos;s API Services User Data Policy.
                            </p>
                        </Section>

                        <Section icon={<Database className="w-5 h-5" />} title="What We Store">
                            <ul className="space-y-3">
                                <li>Writing style profile (patterns, not content)</li>
                                <li>User preferences and settings</li>
                                <li>Usage data</li>
                                <li>Tasks and reminders you create</li>
                            </ul>
                        </Section>

                        <Section icon={<Lock className="w-5 h-5" />} title="Data Encryption">
                            <p>
                                All data is encrypted in transit (TLS/SSL) and at rest (AES-256).
                            </p>
                        </Section>

                        <Section icon={<Eye className="w-5 h-5" />} title="We Never Share Your Data">
                            <p>
                                We will never sell, rent, or share your personal data with third parties for marketing. We only share when legally required or necessary for our service.
                            </p>
                        </Section>

                        <Section icon={<Users className="w-5 h-5" />} title="Your Control">
                            <ul className="space-y-3">
                                <li>Revoke access anytime via Google Account settings</li>
                                <li>Request deletion of all your data</li>
                                <li>Export your data</li>
                                <li>Review permissions</li>
                            </ul>
                        </Section>

                        <Section icon={<Trash2 className="w-5 h-5" />} title="Data Retention">
                            <p>
                                Data is retained while your account is active. After cancellation, data is kept for 30 days then permanently deleted.
                            </p>
                        </Section>

                        <Section icon={<Cookie className="w-5 h-5" />} title="Cookies">
                            <p>
                                We use minimal cookies for authentication and preferences. No tracking or advertising cookies.
                            </p>
                        </Section>

                        <Section icon={<Baby className="w-5 h-5" />} title="Children's Privacy">
                            <p>
                                Clavr is not intended for users under 13.
                            </p>
                        </Section>

                        <Section icon={<Bell className="w-5 h-5" />} title="Contact">
                            <p>
                                Email: <a href="mailto:founders@clavr.me" className="font-medium hover:underline">founders@clavr.me</a>
                                <br />Redmond, WA, USA
                            </p>
                        </Section>
                    </div>

                    {/* Summary Card */}
                    <div className="clay-card-highlight p-4 md:p-6 mt-5 md:mt-8">
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            <strong>Summary:</strong> We access your emails only with permission, don&apos;t store them, passed Google&apos;s security checks, encrypt everything, never share your data, and you can delete anytime.
                        </p>
                    </div>

                    {/* Back Link */}
                    <div className="mt-8 md:mt-12 pt-4 md:pt-6 text-center">
                        <Link href="/" className="inline-flex items-center gap-1.5 md:gap-2 text-gray-500 hover:text-gray-900 text-xs md:text-sm transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Clavr
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="pb-8">
                <Footer />
            </div>
        </main>
    );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
    return (
        <div className="clay-section p-4 md:p-8 mb-4 md:mb-6">
            <div className="flex items-start gap-3 md:gap-6">
                <div className="clay-icon p-2 md:p-3 flex-shrink-0 flex items-center justify-center">
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-base md:text-xl font-semibold text-black mb-1 md:mb-2" style={{ color: '#000000' }}>{title}</h2>
                    <div className="text-gray-600 text-sm md:text-base leading-tight md:leading-relaxed" style={{ color: '#4b5563' }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
