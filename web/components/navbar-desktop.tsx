import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { MenuItemsProps } from "@/lib/menu-items"
import { FacebookIcon, InstagramIcon } from "./icons/social-icons"
import Link from "next/link"

interface NavProps {
  className?: string
  dados: MenuItemsProps
}

export const NavbarDesktop = ({ className, dados }: NavProps) => {
  return (
    <div className={`${className}`}>
      <NavigationMenu orientation={"horizontal"}>
        <NavigationMenuList>
          {Object.entries(dados).filter(([key]) => key !== "facebook" && key !== "instagram" ).map(([key, item]) => (
            <NavigationMenuItem key={key}>
              <NavigationMenuLink
                href={item.url}
                target={key === "merch" ? "_blank" : undefined}
                className="p-0 m-0 hover:bg-transparent bg-transparent"
              >
                <span className="px-2 text-[16px] hover:underline transition-colors hover:opacity-80 cursor-pointer ">{item.title}</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          <div className="ml-4 flex gap-2 opacity-80">            
            <Link href={dados.instagram.url || ""} target="_blank"><InstagramIcon/></Link>
            <Link href={dados.facebook.url || ""} target="_blank"><FacebookIcon/></Link>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
