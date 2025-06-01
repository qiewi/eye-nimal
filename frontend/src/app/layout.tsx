import type React from "react"
import type { Metadata } from "next"
import { Instrument_Sans } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

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
    <html lang="en" className="h-full">
      <body className={`${instrumentSans.className} min-h-screen flex flex-col bg-greyish`}>
        <Navbar />
        <main className="flex-1 w-full flex flex-col items-center pt-24 lg:pt-28">
            {children}
          </main>
        <Footer />
      </body>
    </html>
  )
}

