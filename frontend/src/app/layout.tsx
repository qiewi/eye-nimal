import type React from "react"
import type { Metadata } from "next"
import { Instrument_Sans } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "EyeNimal",
  description: "Snap, Discover, and Learn about Animals",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`w-full flex justify-center bg-greyish ${instrumentSans.className}`}
      >
        <main className="w-full flex flex-col items-center">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}

