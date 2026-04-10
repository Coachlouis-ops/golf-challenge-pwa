import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../src/lib/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.teezgolfchallenges.com"),

  title: {
    default: "Teez Golf Challenges",
    template: "%s | Teez Golf Challenges",
  },

  description:
    "Compete in global golf challenges, climb rankings, and win real rewards. Play with purpose.",

  // ✅ THIS WAS MISSING
  manifest: "/manifest.json",

  // ✅ THIS WAS MISSING
  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },

  openGraph: {
    title: "Teez Golf Challenges",
    description:
      "Compete in global golf challenges, climb rankings, and win real rewards.",
    url: "https://www.teezgolfchallenges.com",
    siteName: "Teez Golf Challenges",
    images: [
      {
        url: "/teezman_1.png",
        width: 1200,
        height: 630,
        alt: "Teez Golf Challenges",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Teez Golf Challenges",
    description:
      "Compete in global golf challenges and win rewards.",
    images: ["/teezman_1.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}