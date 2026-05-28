import Link from "next/link";

// Root not-found for when the locale is invalid or missing
export default function NotFound() {
  return (
    <html suppressHydrationWarning>
      <body className="flex items-center justify-center min-h-screen font-space-grotesk bg-white" suppressHydrationWarning>
        <div className="text-center">
          <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
          <p className="text-slate-500 mb-8">Page Not Found</p>
          <Link href="/" className="px-6 py-3 bg-[hsl(160,84%,39%)] text-white rounded-lg">
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}
