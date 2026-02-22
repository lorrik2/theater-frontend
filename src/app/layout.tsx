import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Драматический театр «Круг» — Афиша, билеты, события",
  description:
    "Официальный сайт драматического театра «Круг». Афиша спектаклей, покупка билетов, труппа, события и контакты.",
  icons: {
    icon: "/logo/лого круг.png",
  },
  openGraph: {
    title: "Драматический театр «Круг»",
    description: "Афиша, билеты, команда, события.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${montserrat.variable} font-sans`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
