import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "UCP Documentation | Universal Commerce Protocol",
    template: "%s | UCP Documentation",
  },
  description: "Comprehensive documentation for the Universal Commerce Protocol (UCP) - the open standard enabling seamless interoperability between AI agents, platforms, and businesses for autonomous commerce.",
  keywords: ["UCP", "Universal Commerce Protocol", "AI commerce", "autonomous shopping", "e-commerce API", "AI agents", "MCP", "commerce protocol"],
  authors: [{ name: "UCPStore" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://docs.ucpstore.dev",
    siteName: "UCP Documentation",
    title: "UCP Documentation | Universal Commerce Protocol",
    description: "The open standard for AI-powered commerce. Learn how to integrate with UCP.",
    images: [
      {
        url: "https://docs.ucpstore.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "UCP Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UCP Documentation | Universal Commerce Protocol",
    description: "The open standard for AI-powered commerce. Learn how to integrate with UCP.",
    images: ["https://docs.ucpstore.dev/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {children}
        {/* Vercel Analytics */}
        <script defer src="/_vercel/insights/script.js"></script>
      </body>
    </html>
  );
}
