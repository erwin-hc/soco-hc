import { Geist_Mono, Poppins } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { VideoProvider } from "@/components/video-context"
import { LayoutContent } from "@/components/layout-content"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const SITE_URL = "https://socohc.underground.eu.cc"
const PREVIEW_IMAGE = "/preview.png?v=2"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "SOCO-HC [ANTIFASCISTA]",
  description:
    "SOCO-HC é uma banda de hardcore antifascista. Confira shows, músicas e merchs.",
  openGraph: {
    title: "SOCO-HC [ANTIFASCISTA]",
    description:
      "SOCO-HC é uma banda de hardcore antifascista. Confira shows, músicas e merchs.",
    type: "website",
    url: SITE_URL,
    siteName: "SOCO-HC",
    images: [
      {
        url: PREVIEW_IMAGE,
        width: 1200,
        height: 630,
        alt: "SOCO-HC [ANTIFASCISTA]",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOCO-HC [ANTIFASCISTA]",
    description:
      "SOCO-HC é uma banda de hardcore antifascista. Confira shows, músicas e merchs.",
    images: [PREVIEW_IMAGE],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-br"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        poppins.variable
      )}
    >
      <body>
        <ThemeProvider forcedTheme="dark">
          <VideoProvider>
            <LayoutContent>{children}</LayoutContent>
          </VideoProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}