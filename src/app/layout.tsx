import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniTracker - University Application Tracker",
  description: "Track your university applications, deadlines, and scholarships in one place",
  icons: {
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ncmFkdWF0aW9uLWNhcC1pY29uIGx1Y2lkZS1ncmFkdWF0aW9uLWNhcCI+PHBhdGggZD0iTTIxLjQyIDEwLjkyMmExIDEgMCAwIDAtLjAxOS0xLjgzOEwxMi44MyA1LjE4YTIgMiAwIDAgMC0xLjY2IDBMMi42IDkuMDhhMSAxIDAgMCAwIDAgMS44MzJsOC41NyAzLjkwOGEyIDIgMCAwIDAgMS42NiAweiIvPjxwYXRoIGQ9Ik0yMiAxMHY2Ii8+PHBhdGggZD0iTTYgMTIuNVYxNmE2IDMgMCAwIDAgMTIgMHYtMy41Ii8+PC9zdmc+", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
