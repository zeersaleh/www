import Link from "next/link";

/**
 * Root not-found for URLs that match no locale route (bot probes, typos,
 * bad locales). Because the app is fully nested under app/[locale] and has
 * no root layout, this page renders its own <html> document. Without it,
 * unmatched requests throw an internal NoFallbackError into the logs.
 */
export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#071524",
          color: "#f8f5ef",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          textAlign: "center",
        }}
      >
        <main style={{ padding: "2rem" }}>
          <p style={{ fontSize: "3rem", fontWeight: 700, color: "#c6a15b", margin: 0 }}>
            404
          </p>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 600, marginTop: "0.5rem" }}>
            Page not found · الصفحة غير موجودة
          </h1>
          <p style={{ marginTop: "1rem" }}>
            <Link href="/en" style={{ color: "#e0c795", marginInline: "0.5rem" }}>
              Home
            </Link>
            <Link href="/ar" style={{ color: "#e0c795", marginInline: "0.5rem" }}>
              الرئيسية
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
