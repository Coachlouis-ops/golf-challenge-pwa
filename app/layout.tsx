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

const previewImageUrl =
  "https://www.teezgolfchallenges.com/teez-whatsapp-preview.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.teezgolfchallenges.com"),

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
    url: "https://www.teezgolfchallenges.com/",
    siteName: "Teez Golf Challenges",
    type: "website",
    images: [
      {
        url: previewImageUrl,
        secureUrl: previewImageUrl,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Teez Golf Challenges - Build Your Golf Career",
      },
    ],
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