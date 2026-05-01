import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auditoría de Ingresos Dentales",
  description: "Descubre cuánto estás perdiendo y cómo recuperarlo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} antialiased h-full`}>
      <body className="h-full bg-gray-100 flex justify-center items-center m-0 p-0 overflow-hidden">
        <main className="w-full h-full max-w-[420px] bg-background relative shadow-2xl sm:h-[95vh] sm:rounded-[32px] sm:border-[8px] sm:border-gray-800 flex flex-col overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
