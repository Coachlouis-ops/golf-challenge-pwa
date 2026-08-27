import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/src/lib/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.teezgolfchallenges.com";

const previewImageUrl =
  "https://www.teezgolfchallenges.com/teez-link-preview-v3.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Teez Golf Challenges",
    template: "%s | Teez Golf Challenges",
  },

  description:
    "Compete in global golf challenges, climb rankings, and build your golf career.",

  manifest: "https://golf-challenge-pwa.vercel.app/manifest.json",

  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },

  openGraph: {
    title: "Teez Golf Challenges",
    description:
      "Compete in global golf challenges, climb rankings, and build your golf career.",
    url: siteUrl,
    siteName: "Teez Golf Challenges",
    images: [
      {
        url: previewImageUrl,
        width: 1200,
        height: 630,
        alt: "Teez Golf Challenges - Build Your Golf Career",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Teez Golf Challenges",
    description:
      "Compete in global golf challenges, climb rankings, and build your golf career.",
    images: [previewImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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