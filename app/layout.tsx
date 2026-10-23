import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/src/lib/AuthContext";
import { TeezNotificationProvider } from "@/src/components/TeezNotificationProvider";










const geistSans = Barlow({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const stadiumDisplay = Barlow_Condensed({
  variable: "--font-stadium-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.teezgolfchallenges.com";

const previewImageUrl =
  "https://www.teezgolfchallenges.com/teez-link-preview-v3.jpg";

export const viewport: Viewport = {
  themeColor: "#07111e",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Teez Golf Challenges",
    template: "%s | Teez Golf Challenges",
  },

  description:
    "Real golf. Real golfers. Real stakes.",

  manifest: "/site.webmanifest",

  icons: {
    icon: [
      {
        url: "/brand/teez-stadium-icon-512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/brand/teez-stadium-icon-512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: ["/brand/teez-stadium-icon-512.png"],
  },

  appleWebApp: {
    capable: true,
    title: "Teez Golf Challenges",
    statusBarStyle: "black",
  },

  openGraph: {
    title: "Teez Golf Challenges",
    description:
      "Real golf. Real golfers. Real stakes.",
    url: siteUrl,
    siteName: "Teez Golf Challenges",
    images: [
      {
        url: previewImageUrl,
        width: 1200,
        height: 630,
        alt: "Teez Golf Challenges - Real golf. Real stakes.",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Teez Golf Challenges",
    description:
      "Real golf. Real golfers. Real stakes.",
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
      className={`${geistSans.variable} ${stadiumDisplay.variable} ${geistMono.variable} h-full antialiased`}
    >
     <body className="min-h-full flex flex-col bg-[#07111e] text-[#f3f7fb]">
  <AuthProvider>
    <TeezNotificationProvider>
      {children}
    </TeezNotificationProvider>
  </AuthProvider>
  <footer className="stadium-responsible">
    <span className="stadium-age">18+</span>
    <p>
      Play responsibly. Deposit limits, time-outs and self-exclusion.
      National Responsible Gambling Programme 0800 006 008. Demo preview.
      No real money.
    </p>
  </footer>
</body>
    </html>
  );
}
