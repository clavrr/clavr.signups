"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Mail, Lock, Users, Database, Eye, Trash2, Cookie, Baby, Bell } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Sticky Back Button - Transparent and borderless per user request */}
            <div className="fixed top-0 left-0 right-0 z-50 py-5 px-8">
                <div className="max-w-2xl mx-auto">
                    <Link
                        href="/"
                        className="clay-back-btn inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm px-4 py-2 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </Link>
                </div>
            </div>

            <div style={{ paddingTop: '48px', paddingBottom: '32px', paddingLeft: '16px', paddingRight: '16px' }}>
                <div className="w-full max-w-2xl mx-auto">
                    {/* Header Card */}
                    <div className="clay-card p-4 mb-4 text-center" style={{ backgroundColor: '#ffffff' }}>
                        <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#000000', margin: 0 }}>Privacy Policy</h1>
                        <p className="text-gray-400 text-xs">Last updated: November 1, 2025</p>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-6 md:space-y-10">
                        <Section icon={<Shield className="w-5 h-5" />} title="Your Privacy Matters">
                            <p>
                                At Clavr, we take your privacy seriously. We built our autonomous intelligent productivity platform with privacy and security at the core.
                            </p>
                        </Section>

                        <Section icon={<Database className="w-5 h-5" />} title="Data We Access">
                            <p className="mb-3">All access is granted only with your explicit permission:</p>
                            <ul className="space-y-2">
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
                            <ul className="space-y-2">
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
                            <ul className="space-y-2">
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

                    {/* Footer */}
                    <div className="mt-8 md:mt-12 pt-4 md:pt-6 text-center">
                        <Link href="/" className="inline-flex items-center gap-1.5 md:gap-2 text-gray-500 hover:text-gray-900 text-xs md:text-sm transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Clavr
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
    return (
        <div className="clay-section" style={{ padding: '12px', marginBottom: '8px' }}>
            <div className="flex items-start gap-3" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div className="clay-icon" style={{ padding: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <h2 className="text-base font-semibold text-black mb-1" style={{ fontSize: '16px', fontWeight: 600, color: '#000000', marginBottom: '4px' }}>{title}</h2>
                    <div className="text-gray-600 text-sm leading-tight" style={{ color: '#4b5563', fontSize: '13px', lineHeight: 1.4 }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
