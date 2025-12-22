"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Mail, Lock, Users, Database, Eye, Trash2, Cookie, Baby, Bell } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-16 md:pt-24 pb-8 md:pb-16 px-3 md:px-8">
            {/* Sticky Back Button */}
            <div className="fixed top-0 left-0 right-0 z-50 py-3 md:py-5 px-3 md:px-8 bg-gradient-to-b from-gray-50 via-gray-50/95 to-gray-50/0">
                <div className="max-w-2xl mx-auto">
                    <Link
                        href="/"
                        className="clay-back-btn inline-flex items-center gap-1.5 md:gap-2 text-gray-600 hover:text-gray-900 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </Link>
                </div>
            </div>

            <div className="max-w-2xl mx-auto">
                {/* Header Card */}
                <div className="clay-card p-5 md:p-8 mb-5 md:mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2" style={{ color: '#000000' }}>Privacy Policy</h1>
                    <p className="text-gray-400 text-sm md:text-base">Last updated: November 1, 2025</p>
                </div>

                {/* Main Content */}
                <div className="space-y-4 md:space-y-6">
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

            <style jsx>{`
                .clay-card {
                    background: linear-gradient(145deg, #ffffff, #f0f0f0);
                    border-radius: 24px;
                    box-shadow: 
                        8px 8px 20px rgba(0, 0, 0, 0.08),
                        -8px -8px 20px rgba(255, 255, 255, 0.9),
                        inset 1px 1px 2px rgba(255, 255, 255, 0.8),
                        inset -1px -1px 2px rgba(0, 0, 0, 0.03);
                }
                
                .clay-card-highlight {
                    background: linear-gradient(145deg, #fafafa, #f5f5f5);
                    border-radius: 20px;
                    box-shadow: 
                        6px 6px 16px rgba(0, 0, 0, 0.06),
                        -6px -6px 16px rgba(255, 255, 255, 0.9),
                        inset 1px 1px 2px rgba(255, 255, 255, 0.9),
                        inset -1px -1px 2px rgba(0, 0, 0, 0.02);
                }
                
                .clay-section {
                    background: linear-gradient(145deg, #ffffff, #f5f5f5);
                    border-radius: 20px;
                    box-shadow: 
                        5px 5px 15px rgba(0, 0, 0, 0.05),
                        -5px -5px 15px rgba(255, 255, 255, 0.95),
                        inset 1px 1px 1px rgba(255, 255, 255, 0.8);
                    transition: all 0.3s ease;
                }
                
                .clay-section:hover {
                    box-shadow: 
                        7px 7px 18px rgba(0, 0, 0, 0.07),
                        -7px -7px 18px rgba(255, 255, 255, 1),
                        inset 1px 1px 1px rgba(255, 255, 255, 0.9);
                    transform: translateY(-2px);
                }
                
                .clay-icon {
                    background: linear-gradient(145deg, #f8f8f8, #e8e8e8);
                    border-radius: 12px;
                    box-shadow: 
                        3px 3px 8px rgba(0, 0, 0, 0.08),
                        -3px -3px 8px rgba(255, 255, 255, 0.9),
                        inset 1px 1px 2px rgba(255, 255, 255, 0.7);
                }
                
                .clay-back-btn {
                    background: linear-gradient(145deg, #ffffff, #f0f0f0);
                    border-radius: 12px;
                    box-shadow: 
                        4px 4px 10px rgba(0, 0, 0, 0.06),
                        -4px -4px 10px rgba(255, 255, 255, 0.9),
                        inset 1px 1px 2px rgba(255, 255, 255, 0.8);
                    transition: all 0.2s ease;
                }
                
                .clay-back-btn:hover {
                    box-shadow: 
                        5px 5px 12px rgba(0, 0, 0, 0.08),
                        -5px -5px 12px rgba(255, 255, 255, 1),
                        inset 1px 1px 2px rgba(255, 255, 255, 0.9);
                }
            `}</style>
        </main>
    );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
    return (
        <div className="clay-section p-3 md:p-5">
            <div className="flex items-start gap-3 md:gap-4">
                <div className="clay-icon p-2 md:p-2.5 text-gray-600 shrink-0">
                    {icon}
                </div>
                <div>
                    <h2 className="text-base md:text-lg font-semibold text-black mb-1.5 md:mb-2">{title}</h2>
                    <div className="text-gray-700 text-sm md:text-base leading-relaxed [&_ul]:list-disc [&_ul]:ml-4 [&_li]:pl-1">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
