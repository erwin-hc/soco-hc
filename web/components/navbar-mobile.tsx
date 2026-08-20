import {
  Sheet,
  SheetClose,
  SheetContent,  
  SheetFooter,
  SheetHeader,  
  SheetTrigger,
} from "@/components/ui/sheet"

import { MenuItemsProps } from "@/lib/menu-items"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { Logo } from "./logo"
import { Menu } from "lucide-react"
import { FacebookIcon, InstagramIcon } from "./icons/social-icons"

interface NavProps {
  className?: string
  dados: MenuItemsProps
}

export const NavbarMobile = ({ className, dados }: NavProps) => {
  return (
    <Sheet >
      <SheetTrigger>
        <Menu size={16} className={"cursor-pointer hover:opacity-80"} />
      </SheetTrigger>
      <SheetContent className={cn(className) + `border-l border-white/25`}>
        <SheetHeader className="mx-auto mt-4">
          <Logo color="white" className="w-45 opacity-60" />
        </SheetHeader>
        <div className="flex flex-col gap-2 py-4">
          {Object.entries(dados).filter(([key]) => key !== "facebook" && key !== "instagram").map(([key, item]) => (
            <Link
              key={key}
              href={item.url || ""}
              target={key === "merch" ? "_blank" : undefined}
              className="pl-6 py-1 transition-colors hover:opacity-70"
            >
              <SheetClose className="flex w-full cursor-pointer items-center justify-start text-2xl sm:text-xl">
                <span className="opacity-80">{item.title}</span>
              </SheetClose>
            </Link>
          ))}
        </div>
        <SheetFooter className="p-0 h-32 opacity-80">
          <div className="flex gap-6 p-4 border-t border-white/25">
            <Link href={dados.instagram.url || ""} target="_blank"><InstagramIcon className="cursor-pointer"/></Link>
            <Link href={dados.facebook.url || ""} target="_blank"><FacebookIcon className="cursor-pointer"/></Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
