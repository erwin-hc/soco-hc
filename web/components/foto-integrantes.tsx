import Image from "next/image"
import { InstagramIcon } from "./icons/social-icons"
import { FacebookIcon } from "./icons/social-icons"
import Link from "next/link"
import { Music, User } from "lucide-react"
import type { IntegranteItem } from "@/lib/strapi-types"
import { getStrapiMedia } from "@/lib/strapi"
import { useState } from "react"

interface IntegranteProps {
  integrante: Omit<IntegranteItem, "id"> & { id?: number; imagem?: string }
  className?: string
}

export const Integrante = ({ integrante, className }: IntegranteProps) => {
  const imagem =
    getStrapiMedia(integrante.Imagem?.url) ?? integrante.imagem ?? "/fallback.png"
  const [imageSrc, setImageSrc] = useState(imagem)

  return (
    <div className=" flex flex-col justify-center items-center w-full sm:w-full border-2 border-white/15 rounded-2xl ">
      <div className="relative w-full overflow-hidden rounded-t-2xl">
        <Image
          src={imageSrc}
          alt={integrante.nome || "Integrante"}
          width={600}
          height={800}
          priority
          className={`object-cover ${className}`}
          onError={() => setImageSrc("/fallback.png")}
        />
      </div>
      <div className="transition-colors duration-500 flex flex-col items-start py-2 bg-white/15 group-hover:bg-white/35 border-white/25 w-full rounded-b-2xl ">
      <div className="flex gap-2 items-center px-2">
      <User/>
      <h1 className={`uppercase text-balance text-2xl font-bold leading-tight md:text-3xl`}>{integrante.nome}</h1>
      </div>
      <div className="flex gap-2 items-center px-2">
      <Music className="text-muted-foreground"/>
      <p className="text-pretty leading-relaxed text-muted-foreground uppercase ">{integrante.instrumento}</p>
      </div>
      <div className="flex gap-2 items-center px-2 my-4">
        <Link href={integrante.instagram || "#"} target="_blank">
        <InstagramIcon size={32}  className="text-white opacity-80 hover:opacity-100"/>
        </Link>
        <Link href={integrante.facebook || "#"} target="_blank">
        <FacebookIcon size={32}  className="text-white opacity-80 hover:opacity-100"/>
        </Link>
      </div>
      </div>
    </div>
  )
}