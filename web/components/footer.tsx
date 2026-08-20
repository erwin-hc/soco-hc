import { Copyright } from "lucide-react";
import { FacebookIcon } from "./icons/social-icons";
import { InstagramIcon } from "./icons/social-icons";
import Link from "next/link";
import { menuItems } from "@/lib/menu-items";

const socialUrl = {facebook: "https://www.facebook.com/socohxcx", instagram: "https://www.instagram.com/socohc/"}

export const Footer = () => {
    return ( 
        <div className="w-full border-t-2 border-white/15 opacity-80 ">
        <footer className="max-w-6xl mx-auto ">
            <div className="flex items-center justify-between p-4">
            <div className="flex gap-2">
                <Copyright/>
                <span>2026 - SOCO HARDCORE</span>   
            </div>
            <div className="flex gap-2">
                <Link href={menuItems.instagram.url || ""} target="_blank">
                <InstagramIcon size={34} className="cursor-pointer opacity-80 hover:opacity-100"/>
                </Link>
                <Link href={menuItems.facebook.url || ""} target="_blank">
                <FacebookIcon size={34} className="cursor-pointer opacity-80 hover:opacity-100"/>
                </Link>
            </div>
            </div>
        </footer>
        </div>
    );
}