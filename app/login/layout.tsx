export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="fixed inset-0 bg-white z-50">
            {children}
        </div>
    );
}
