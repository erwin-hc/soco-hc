"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useVideoContext } from "@/components/video-context"
import { LogoPequeno } from "@/components/logo"
import { NavbarMobile } from "@/components/navbar-mobile"
import { NavbarDesktop } from "@/components/navbar-desktop"
import { menuItems } from "@/lib/menu-items"
import Link from "next/link"

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isVideoActive } = useVideoContext()

  const hideNavbar = pathname === "/" && isVideoActive

  useEffect(() => {
    const pageTitles: Record<string, string> = {
      "/": "SOCO-HC [ANTIFASCISTA]",
      "/home": "Ínicio [SOCO-HC]",
      "/shows": "Shows [SOCO-HC]",
      "/musicas": "Músicas [SOCO-HC]",
      "/merch": "Merchs [SOCO-HC]",      
    }
    document.title = pageTitles[pathname] ?? "SOCOHC"
  }, [pathname])

  return (
    <>
      <AnimatePresence>
        {!hideNavbar && (
          <motion.div
            key="navbar"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="borda sticky top-0 z-10 mx-auto w-full border-b bg-background/40 backdrop-blur-sm"
          >
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <Link href={'/'}><LogoPequeno color={"white"} className="w-30 p-2 opacity-80 cursor-pointer" /></Link>
              <div className={"hidden sm:flex"}>
                <NavbarDesktop dados={menuItems} />
              </div>
              <div className={"flex w-full justify-end sm:hidden"}>
                <NavbarMobile dados={menuItems} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}