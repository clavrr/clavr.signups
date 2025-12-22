import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-white text-gray-900 py-12 px-4 md:px-8">
            <div className="max-w-2xl mx-auto">
                <Link
                    href="/"
                    className="text-gray-500 hover:text-black text-sm mb-8 inline-block"
                >
                    ← Back
                </Link>

                <h1 className="text-3xl font-bold mb-1">Privacy Policy</h1>
                <p className="text-gray-400 text-sm mb-10">Last updated: November 1, 2025</p>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Your Privacy Matters</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        At Clavr, we take your privacy seriously. We built our autonomous intelligent productivity platform with privacy and security at the core.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Data We Access</h2>
                    <p className="text-gray-600 text-sm mb-3">All access is granted only with your explicit permission:</p>
                    <ul className="text-gray-600 text-sm space-y-1 ml-4 list-disc">
                        <li>Email messages you explicitly grant access to</li>
                        <li>Sent emails (to learn your writing style)</li>
                        <li>Google Calendar events</li>
                        <li>Google Tasks</li>
                        <li>Slack messages and channels</li>
                        <li>Notion pages and databases</li>
                        <li>Basic account information</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">How We Handle Your Emails</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        <strong>We don&apos;t store your emails.</strong> Emails are fetched in real-time, processed for context, and not kept. We only store minimal metadata needed for the service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Third-Party Integrations</h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        For Google Calendar, Slack, and Notion: we access data only with your permission, process it in real-time, and don&apos;t store it permanently. You can revoke access anytime.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Google Security Verification</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Clavr has passed Google&apos;s extensive security checks and maintains compliance with Google&apos;s API Services User Data Policy.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">What We Store</h2>
                    <ul className="text-gray-600 text-sm space-y-1 ml-4 list-disc">
                        <li>Writing style profile (patterns, not content)</li>
                        <li>User preferences and settings</li>
                        <li>Usage data</li>
                        <li>Tasks and reminders you create</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Data Encryption</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        All data is encrypted in transit (TLS/SSL) and at rest (AES-256).
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">We Never Share Your Data</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        We will never sell, rent, or share your personal data with third parties for marketing. We only share when legally required or necessary for our service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Your Control</h2>
                    <ul className="text-gray-600 text-sm space-y-1 ml-4 list-disc">
                        <li>Revoke access anytime via Google Account settings</li>
                        <li>Request deletion of all your data</li>
                        <li>Export your data</li>
                        <li>Review permissions</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Data Retention</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Data is retained while your account is active. After cancellation, data is kept for 30 days then permanently deleted.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Cookies</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        We use minimal cookies for authentication and preferences. No tracking or advertising cookies.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Children&apos;s Privacy</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Clavr is not intended for users under 13.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Contact</h2>
                    <p className="text-gray-600 text-sm">
                        Email: <a href="mailto:founders@clavr.me" className="text-gray-900 hover:underline">founders@clavr.me</a>
                        <br />Redmond, WA, USA
                    </p>
                </section>

                <section className="bg-gray-50 rounded-lg p-5 mt-10">
                    <p className="text-gray-700 text-sm leading-relaxed">
                        <strong>Summary:</strong> We access your emails only with permission, don&apos;t store them, passed Google&apos;s security checks, encrypt everything, never share your data, and you can delete anytime.
                    </p>
                </section>

                <div className="mt-10 pt-6 border-t border-gray-100 text-center">
                    <Link href="/" className="text-gray-500 hover:text-black text-sm">
                        ← Back to Clavr
                    </Link>
                </div>
            </div>
        </main>
    );
}
