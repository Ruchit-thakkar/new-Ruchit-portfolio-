import { Anton, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const metadata = {
  title: "Ruchit Thakkar | Full-Stack Developer & Data Scientist",
  description:
    "Portfolio of Ruchit Thakkar, a full-stack developer and data scientist building modern, secure, and scalable digital products.",
  keywords: [
    "Ruchit Thakkar",
    "Full-Stack Developer",
    "Data Scientist",
    "Next.js Developer",
    "Portfolio",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${anton.variable}`}>{children}</body>
    </html>
  );
}
