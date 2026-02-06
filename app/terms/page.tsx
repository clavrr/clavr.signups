"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Handshake, CreditCard, RefreshCw, XCircle, Shield, Scale, Gavel, Bell, Mail } from "lucide-react";

import Footer from "@/components/Footer";

export default function TermsOfService() {
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
                        <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2" style={{ color: '#000000', margin: 0 }}>Terms of Service</h1>
                        <p className="text-gray-400 text-xs md:text-sm">Last updated: November 1, 2025</p>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-8 md:space-y-10">
                        <Section icon={<FileText className="w-5 h-5" />} title="1. Service Agreement">
                            <p className="mb-3">
                                This Terms of Service agreement (&quot;Agreement&quot;) is a legal contract between you and Clavr, Inc. (&quot;Clavr&quot;) governing your subscription to and use of our paid services.
                            </p>
                            <p>
                                This Agreement supplements our <Link href="/use" className="font-medium hover:underline">Terms of Use</Link>, which governs acceptable use and behavior on our platform, and our <Link href="/privacy" className="font-medium hover:underline">Privacy Policy</Link>, which explains how we handle your data.
                            </p>
                        </Section>

                        <Section icon={<Handshake className="w-5 h-5" />} title="2. Subscription Plans">
                            <p className="mb-3">Clavr offers various subscription tiers:</p>
                            <ul className="space-y-3">
                                <li><strong>Free Tier:</strong> Limited access to core features with usage restrictions</li>
                                <li><strong>Pro Plan:</strong> Full access to all features for individual users</li>
                                <li><strong>Team Plan:</strong> Collaborative features for teams and organizations</li>
                                <li><strong>Enterprise:</strong> Custom solutions with dedicated support</li>
                            </ul>
                            <p className="mt-3">
                                Feature availability and limits vary by plan. Current pricing and features are available on our website.
                            </p>
                        </Section>

                        <Section icon={<CreditCard className="w-5 h-5" />} title="3. Billing and Payment">
                            <p className="mb-3">By subscribing to a paid plan, you agree to:</p>
                            <ul className="space-y-3">
                                <li>Pay all fees associated with your selected plan</li>
                                <li>Provide accurate and current billing information</li>
                                <li>Authorize recurring charges on a monthly or annual basis</li>
                                <li>Accept that subscription fees are billed in advance</li>
                            </ul>
                            <p className="mt-3">
                                We use secure third-party payment processors. We do not store your complete payment card details.
                            </p>
                        </Section>

                        <Section icon={<RefreshCw className="w-5 h-5" />} title="4. Automatic Renewal">
                            <p className="mb-3">
                                Subscriptions automatically renew at the end of each billing period unless cancelled. We will charge your payment method on file at the then-current rate.
                            </p>
                            <p>
                                We will notify you of any price changes at least 30 days before they take effect. Continued use after a price change constitutes acceptance.
                            </p>
                        </Section>

                        <Section icon={<XCircle className="w-5 h-5" />} title="5. Cancellation and Refunds">
                            <p className="mb-3">You may cancel your subscription at any time:</p>
                            <ul className="space-y-3">
                                <li>Access continues until the end of your current billing period</li>
                                <li>No refunds for partial billing periods</li>
                                <li>No refunds for unused time on annual plans</li>
                                <li>Data is retained for 30 days after cancellation, then permanently deleted</li>
                            </ul>
                            <p className="mt-3">
                                Refunds may be issued at our discretion for exceptional circumstances or as required by law.
                            </p>
                        </Section>

                        <Section icon={<Shield className="w-5 h-5" />} title="6. Service Availability">
                            <p className="mb-3">
                                We strive to maintain high availability but do not guarantee uninterrupted service. Scheduled maintenance will be communicated in advance when possible.
                            </p>
                            <p>
                                We reserve the right to modify, suspend, or discontinue features with reasonable notice. Critical changes affecting paid functionality will be communicated at least 30 days in advance.
                            </p>
                        </Section>

                        <Section icon={<Scale className="w-5 h-5" />} title="7. Limitation of Liability">
                            <p className="mb-3">
                                To the maximum extent permitted by law, Clavr&apos;s total liability for any claims arising from this Agreement shall not exceed the amount paid by you in the 12 months preceding the claim.
                            </p>
                            <p>
                                We are not liable for indirect, incidental, consequential, or punitive damages, including lost profits, lost data, or business interruption.
                            </p>
                        </Section>

                        <Section icon={<Gavel className="w-5 h-5" />} title="8. Dispute Resolution">
                            <p className="mb-3">
                                Any disputes arising from this Agreement shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except where prohibited by law.
                            </p>
                            <p>
                                This Agreement is governed by the laws of the State of Washington, USA, without regard to conflict of law principles.
                            </p>
                        </Section>

                        <Section icon={<Bell className="w-5 h-5" />} title="9. Changes to Terms">
                            <p>
                                We may modify this Agreement with 30 days notice for material changes. Continued use of paid services after changes take effect constitutes acceptance. If you disagree, you may cancel before the changes apply.
                            </p>
                        </Section>

                        <Section icon={<Mail className="w-5 h-5" />} title="10. Contact">
                            <p>
                                For billing inquiries or questions about this Agreement:
                                <br />Email: <a href="mailto:founders@clavr.me" className="font-medium hover:underline">founders@clavr.me</a>
                                <br />Address: Redmond, WA, USA
                            </p>
                        </Section>
                    </div>

                    {/* Summary Card */}
                    <div className="clay-card-highlight p-4 md:p-6 mt-5 md:mt-8">
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            <strong>Summary:</strong> This agreement covers your subscription, billing, and the contractual relationship between you and Clavr. For acceptable use policies, see our <Link href="/use" className="font-medium hover:underline">Terms of Use</Link>. For data handling, see our <Link href="/privacy" className="font-medium hover:underline">Privacy Policy</Link>.
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
