import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { Playfair_Display as FontSerif } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const fontText = localFont({
  src: "../../public/Switzer-Variable.ttf",
  variable: "--font-text",
  display: "swap",
});

const fontHeadline = localFont({
  src: "../../public/romanabt_roman.otf",
  variable: "--font-headline",
  display: "swap",
});

const fontEssayTitle = localFont({
  src: "../../public/perfectly-nineties-regular.otf",
  variable: "--font-essay-title",
  display: "swap",
});

const fontMono = localFont({
  src: [
    { path: "../../public/SFMono-Regular.otf",      weight: "400", style: "normal" },
    { path: "../../public/SFMono-RegularItalic.otf", weight: "400", style: "italic" },
    { path: "../../public/SFMono-Medium.otf",        weight: "500", style: "normal" },
    { path: "../../public/SFMono-MediumItalic.otf",  weight: "500", style: "italic" },
    { path: "../../public/SFMono-Semibold.otf",      weight: "600", style: "normal" },
    { path: "../../public/SFMono-SemiboldItalic.otf",weight: "600", style: "italic" },
    { path: "../../public/SFMono-Bold.otf",          weight: "700", style: "normal" },
    { path: "../../public/SFMono-BoldItalic.otf",    weight: "700", style: "italic" },
  ],
  variable: "--font-mono",
  display: "swap",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-mono antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
          fontText.variable,
          fontHeadline.variable,
          fontEssayTitle.variable,
          fontMono.variable,
          fontSerif.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}