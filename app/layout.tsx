import type { Metadata } from "next";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Дисплейный шрифт — эффектные заголовки
const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Основной шрифт интерфейса
const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans-default",
  display: "swap",
});

// Моноширинный — цифры, метрики, код
const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono-default",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEBULA — аналитика маркетплейсов",
  description:
    "Профессиональная футуристическая платформа для анализа бизнеса на маркетплейсах Ozon и Wildberries: юнит-экономика, продажи, кластеры.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">
        {/* Тонкий сканлайнер терминала */}
        <div className="scanline" aria-hidden />
        {children}
      </body>
    </html>
  );
}