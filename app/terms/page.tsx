"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Handshake, CreditCard, RefreshCw, XCircle, Shield, Scale, Gavel, Bell, Mail } from "lucide-react";

export default function TermsOfService() {
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
                    <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2" style={{ color: '#000000' }}>Terms of Service</h1>
                    <p className="text-gray-400 text-sm md:text-base">Last updated: November 1, 2025</p>
                </div>

                {/* Main Content */}
                <div className="space-y-4 md:space-y-6">
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
                        <ul className="space-y-2">
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
                        <ul className="space-y-2">
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
                        <ul className="space-y-2">
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
