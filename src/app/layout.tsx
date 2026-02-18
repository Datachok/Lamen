import type { Metadata } from "next";
import { Inter, Space_Grotesk, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/lib/theme-context";
import { LocaleProvider } from "@/i18n/locale-context";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-brand" });
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lamen \u2014 V\u00e9rification d\u2019identit\u00e9 num\u00e9rique",
  description:
    "S\u00e9curisez vos transactions financi\u00e8res gr\u00e2ce \u00e0 une v\u00e9rification d\u2019identit\u00e9 num\u00e9rique rapide, fiable et conforme.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr" className="no-transitions" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("lamen-theme");if(!t)t="dark";document.documentElement.setAttribute("data-theme",t);var l=localStorage.getItem("lamen-locale");if(!l||["fr","en","ar"].indexOf(l)===-1)l="fr";document.documentElement.setAttribute("data-locale",l);document.documentElement.setAttribute("lang",l);document.documentElement.setAttribute("dir",l==="ar"?"rtl":"ltr")}catch(e){document.documentElement.setAttribute("data-theme","dark");document.documentElement.setAttribute("data-locale","fr");document.documentElement.setAttribute("lang","fr");document.documentElement.setAttribute("dir","ltr")}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.className} ${spaceGrotesk.variable} ${notoSansArabic.variable} bg-background text-text antialiased`}
      >
        <ThemeProvider>
          <LocaleProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
