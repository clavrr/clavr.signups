"use client";

import Link from "next/link";
import { ArrowLeft, FileText, UserCheck, Shield, Ban, Cpu, AlertTriangle, Copyright, Globe, RefreshCw, Link2, MessageSquare, Lock, Scale, Gavel, XCircle, Bell, Mail } from "lucide-react";

import Footer from "@/components/Footer";

export default function TermsOfUse() {
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
                        <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2" style={{ color: '#000000', margin: 0 }}>Terms of Use</h1>
                        <p className="text-gray-400 text-xs md:text-sm">Last updated: November 1, 2025</p>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-8 md:space-y-10">
                        <Section icon={<FileText className="w-5 h-5" />} title="1. Overview">
                            <p className="mb-3">
                                Welcome to Clavr, Inc. (&quot;Clavr,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms of Use govern your access to and use of Clavr&apos;s products, software, services, websites, and applications (collectively, the &quot;Services&quot;).
                            </p>
                            <p className="mb-3">
                                Clavr provides an autonomous intelligent productivity platform that allows you to transform conversations into actions across your entire workflow. Our ecosystem includes:
                            </p>
                            <ul className="space-y-3">
                                <li><strong>The Clavr platform</strong> - your intelligent productivity hub, accessible through web or app</li>
                                <li><strong>Clavr software</strong> - tools for orchestrating workflows, managing tasks, scheduling meetings, and automating actions</li>
                                <li><strong>Third-party integrations</strong> - including Gmail, Google Calendar, Google Tasks, Slack, and Notion</li>
                            </ul>
                            <p className="mt-3">
                                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, you may not use Clavr&apos;s Services.
                            </p>
                        </Section>

                        <Section icon={<UserCheck className="w-5 h-5" />} title="2. Eligibility">
                            <p>
                                You must be at least 16 years old and capable of forming a binding contract to use Clavr. If you use Clavr on behalf of an organization, you represent that you are authorized to accept these Terms on its behalf.
                            </p>
                        </Section>

                        <Section icon={<Shield className="w-5 h-5" />} title="3. Your Account">
                            <p className="mb-3">To use many of our Services, you must create an account. You agree to:</p>
                            <ul className="space-y-3">
                                <li>Provide accurate and complete information</li>
                                <li>Maintain the confidentiality of your credentials</li>
                                <li>Notify us immediately of any unauthorized access</li>
                                <li>Be responsible for all activity under your account</li>
                            </ul>
                            <p className="mt-3">
                                Clavr reserves the right to suspend or terminate accounts that violate these Terms or pose security risks.
                            </p>
                        </Section>

                        <Section icon={<Scale className="w-5 h-5" />} title="4. Use of the Services">
                            <p className="mb-3">You may use the Services only for lawful, personal, and non-commercial purposes, unless expressly authorized. You agree not to:</p>
                            <ul className="space-y-3">
                                <li>Access or use the Services in any unlawful or harmful way</li>
                                <li>Attempt to copy, reverse-engineer, or modify our systems or software</li>
                                <li>Circumvent security or encryption technologies</li>
                                <li>Upload or share content that infringes on intellectual property or privacy rights</li>
                                <li>Use the Services to develop competing products or machine learning models</li>
                                <li>Interfere with the operation or integrity of Clavr&apos;s systems</li>
                            </ul>
                        </Section>

                        <Section icon={<Cpu className="w-5 h-5" />} title="5. Autonomous Actions and AI-Generated Content">
                            <p className="mb-3">Clavr uses artificial intelligence to orchestrate workflows and transform conversations into actions. You understand and agree that:</p>
                            <ul className="space-y-3">
                                <li>AI-generated actions and content may contain errors or inaccuracies</li>
                                <li>You are responsible for reviewing and approving all actions before execution</li>
                                <li>Clavr is not liable for actions taken through your account, including emails sent, tasks created, or meetings scheduled</li>
                                <li>The AI learns from your patterns and preferences but may not perfectly replicate your style</li>
                                <li>You should verify all important information in AI-orchestrated actions</li>
                                <li>Clavr acts autonomously based on your conversations, but you maintain final control and responsibility</li>
                            </ul>
                        </Section>

                        <Section icon={<Ban className="w-5 h-5" />} title="6. Prohibited Activities">
                            <p className="mb-3">When using Clavr, you must NOT:</p>
                            <ul className="space-y-3">
                                <li>Send spam, phishing emails, or unsolicited commercial communications</li>
                                <li>Use the platform to harass, abuse, or harm others</li>
                                <li>Violate any applicable laws or regulations</li>
                                <li>Attempt to bypass or circumvent security features</li>
                                <li>Reverse engineer, decompile, or disassemble the platform</li>
                                <li>Use automated scripts or bots to access the service</li>
                                <li>Share your account with others</li>
                                <li>Impersonate any person or entity</li>
                                <li>Collect or harvest user data without permission</li>
                                <li>Interfere with or disrupt the service or servers</li>
                                <li>Post or transmit malicious code or viruses</li>
                            </ul>
                        </Section>

                        <Section icon={<Copyright className="w-5 h-5" />} title="7. Content Ownership">
                            <p className="mb-3">
                                <strong>Your Content:</strong> You retain full ownership of your emails, data, conversations, and any content you provide to Clavr. By using the platform, you grant us a limited license to process your content solely for the purpose of providing our services.
                            </p>
                            <p>
                                <strong>Our Content:</strong> All content on the Clavr website and platform, including text, graphics, logos, designs, and software, is owned by or licensed to Clavr and is protected by copyright, trademark, and other intellectual property laws.
                            </p>
                        </Section>

                        <Section icon={<Globe className="w-5 h-5" />} title="8. Third-Party Services">
                            <p>
                                Clavr integrates with third-party services including Gmail, Google Calendar, Google Tasks, Slack, and Notion. Your use of these services is subject to their respective terms of service and privacy policies. We are not responsible for the practices or content of third-party services. You grant Clavr permission to access and interact with these services on your behalf to provide the Services.
                            </p>
                        </Section>

                        <Section icon={<RefreshCw className="w-5 h-5" />} title="9. Service Modifications">
                            <p>
                                We reserve the right to modify, suspend, or discontinue any aspect of Clavr at any time, with or without notice. We may also impose limits on certain features or restrict your access to parts or all of the platform without liability.
                            </p>
                        </Section>

                        <Section icon={<Link2 className="w-5 h-5" />} title="10. Links to Other Websites">
                            <p>
                                Our platform may contain links to third-party websites or resources. We are not responsible for the content, privacy policies, or practices of these external sites. Accessing third-party links is at your own risk.
                            </p>
                        </Section>

                        <Section icon={<MessageSquare className="w-5 h-5" />} title="11. User Feedback">
                            <p>
                                We welcome your feedback, suggestions, and ideas about Clavr. By providing feedback, you grant us a non-exclusive, worldwide, royalty-free license to use, modify, and incorporate your suggestions into our platform without compensation or attribution.
                            </p>
                        </Section>

                        <Section icon={<Lock className="w-5 h-5" />} title="12. Privacy and Data">
                            <p>
                                Your use of Clavr is also governed by our <Link href="/privacy" className="font-medium hover:underline">Privacy Policy</Link>, which explains how we collect, use, and protect your data. We process your conversations and data in real-time to fuel actions.
                            </p>
                        </Section>

                        <Section icon={<AlertTriangle className="w-5 h-5" />} title="13. Disclaimers">
                            <p className="mb-3">Clavr is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee that:</p>
                            <ul className="space-y-3">
                                <li>The platform will be uninterrupted, secure, or error-free</li>
                                <li>AI-generated actions and content will be accurate or suitable for your needs</li>
                                <li>Defects will be corrected</li>
                                <li>The platform will meet your specific requirements</li>
                                <li>Data or information will not be lost</li>
                            </ul>
                        </Section>

                        <Section icon={<Scale className="w-5 h-5" />} title="14. Limitation of Liability">
                            <p>
                                To the fullest extent permitted by law, Clavr shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform, including but not limited to lost profits, data loss, or damage to reputation.
                            </p>
                        </Section>

                        <Section icon={<XCircle className="w-5 h-5" />} title="15. Termination">
                            <p>
                                We may terminate or suspend your access to Clavr immediately, without prior notice, if you violate these Terms of Use or engage in prohibited activities. Upon termination, your right to use the platform ceases, and we may delete your account data after 30 days.
                            </p>
                        </Section>

                        <Section icon={<Bell className="w-5 h-5" />} title="16. Changes to Terms">
                            <p>
                                We may update these Terms of Use from time to time. We will notify you of significant changes by email or through the platform. Your continued use of Clavr after changes take effect constitutes acceptance of the revised terms.
                            </p>
                        </Section>

                        <Section icon={<Gavel className="w-5 h-5" />} title="17. Governing Law">
                            <p>
                                These Terms of Use are governed by the laws of the State of Washington, USA. Any disputes arising from these terms or your use of Clavr shall be resolved in the courts located in Washington State.
                            </p>
                        </Section>

                        <Section icon={<Mail className="w-5 h-5" />} title="18. Contact Us">
                            <p>
                                If you have questions about these Terms of Use, please contact us:
                                <br />Email: <a href="mailto:founders@clavr.me" className="font-medium hover:underline">founders@clavr.me</a>
                                <br />Address: Redmond, WA, USA
                            </p>
                        </Section>
                    </div>

                    {/* Summary Card */}
                    <div className="clay-card-highlight p-4 md:p-6 mt-5 md:mt-8">
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            <strong>Quick Summary:</strong> Use Clavr responsibly for workflow orchestration and productivity automation, keep your account secure, review AI-orchestrated actions before execution, don&apos;t spam or break laws, and understand that you&apos;re responsible for all actions taken through your account—whether emails sent, tasks created, meetings scheduled, or messages sent.
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
