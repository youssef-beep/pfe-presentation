import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "REMEdion - PFE Presentation",
  description: "Intelligent Self-Healing System for Cloud Infrastructure",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
