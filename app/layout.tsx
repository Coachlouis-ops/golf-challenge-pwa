import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Teez Golf Challenges",
    template: "%s | Teez Golf Challenges",
  },

  description:
    "Compete in global golf challenges, climb rankings, win rewards, and build your golf career.",

  manifest: "/site.webmanifest",

  icons: {
    icon: [
      {
        url: "/teez-app-icon-v4.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/teez-app-icon-v4.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: ["/teez-app-icon-v4.png"],
  },

  appleWebApp: {
    capable: true,
    title: "Teez Golf Challenges",
    statusBarStyle: "black",
  },

  openGraph: {
    title: "Teez Golf Challenges",
    description:
      "Compete in global golf challenges, climb rankings, win rewards, and build your golf career.",
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
      "Compete in global golf challenges, climb rankings, win rewards, and build your golf career.",
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
      <body className="min-h-full flex flex-col bg-black">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
