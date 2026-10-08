import type { Metadata } from "next";
import { Inter, Noto_Sans, Lora } from "next/font/google";
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION } from "@/lib/constants";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const headingFont = Noto_Sans({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const heroFont = Lora({
  variable: "--font-hero",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — ${APP_TAGLINE}`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
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
      className={`${sans.variable} ${headingFont.variable} ${heroFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-ivory-100 text-charcoal-900 selection:bg-gold-500/20 selection:text-green-950">
        {children}
      </body>
    </html>
  );
}
