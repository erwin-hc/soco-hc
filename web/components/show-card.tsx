"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { CalendarDays, Clock, MapPin, Expand, X, TicketCheck } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { createPortal } from "react-dom"
import Link from "next/link"
import { StrapiBlocks } from "@/components/strapi-blocks"



export type Show = {
  id: string
  title: string
  local: string
  city: string
  date?: Date
  time: string
  image: string  
  isActive?: boolean
  description?: unknown
  linkIngresso?: string  
}

export function ShowCard({
  show,
  reverse = false,
}: {
  show: Show
  reverse?: boolean
}) {
  const [open, setOpen] = useState(false)
  // Armazena o valor inicial (montagem do componente) para evitar chamadas impuras durante o render
  const [isPast] = useState(
    () => (show.date ? show.date.getTime() < Date.now() : false),
  )


  return (
    <>
      <Card 
      className="uppercase overflow-hidden p-0 transition-shadow hover:shadow-lg border-2 border-white/25">
        <div
          className={cn(
            "flex flex-col md:items-stretch ",
            reverse ? "md:flex-row-reverse" : "md:flex-row",
          )}
        >
          {/* Flyer side (vertical / portrait) */}
          <div className="relative shrink-0 md:w-2/5 lg:w-1/3 ">
            <AspectRatio ratio={2 / 3} className="relative bg-muted md:h-full">
              <Image
                src={show.image || "/placeholder.svg"}
                alt={`Flyer do show ${show.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                loading="eager"
              />
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() => setOpen(true)}
                className="cursor-pointer absolute bottom-3 right-3 size-9 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                <Expand className=" size-4" aria-hidden="true" />
                <span className="sr-only">Ver flyer em tela cheia</span>
              </Button>
            </AspectRatio>
          </div>

          {/* Info side */}
          <div 
          className={`flex flex-1 flex-col justify-between gap-6 p-2 px-6 border-white/25 border-t-2 md:border-t-0 ${reverse ? "sm:border-r-2" : "sm:border-l-2"}`}>
            <div>
              <h3 className="text-balance text-2xl font-bold leading-tight md:text-3xl">
                {show.title}
              </h3>

              <dl className="mt-4 grid gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                  <dd className="font-medium text-foreground">
                    {show.date ? show.date.toLocaleDateString("pt-BR", { dateStyle: "long" }) : null}
                  </dd>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-4 shrink-0" aria-hidden="true" />
                  <dd>{show.time}</dd>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4 shrink-0" aria-hidden="true" />
                  <dd>
                    {show.local} &middot; {show.city}
                  </dd>
                </div>
              </dl>

              {show.description ? (
                <StrapiBlocks
                  content={show.description as never}
                  className="mt-4 text-pretty text-muted-foreground"
                />
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              {isPast 
              ? 
              <Badge className="p-4"  variant={"destructive"}>ENCERRADO</Badge> 
              : 
              <div>
              <h3 className="text-balance text-2xl font-bold leading-tight md:text-3xl">
                Ingressos
              </h3>
              <div className="flex gap-2 items-center text-muted-foreground">
                <TicketCheck />
              {show.linkIngresso
              ?
              <Badge variant={"default"}>  
              <Link className="uppercase " target="_blank" href={show.linkIngresso}>COMPRAR</Link>
              </Badge>
              :
              <p className="text-foreground">NO LOCAL</p>  
              }              
              </div>
              </div>
              }
            </div>
          </div>
        </div>
      </Card>

      <FlyerLightbox
        open={open}
        onClose={() => setOpen(false)}
        src={show.image}
        title={show.title}
      />
    </>
  )
}

function FlyerLightbox({
  open,
  onClose,
  src,
  title,
}: {
  open: boolean
  onClose: () => void
  src: string
  title: string
}) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Flyer do show ${title}`}
      onClick={onClose}
      className=" fixed inset-0 z-[9999] flex items-center justify-center bg-background/15  backdrop-blur-3xl "
    >
      <Button
        type="button"
        size="icon"
        variant="secondary"
        onClick={onClose}
        className="cursor-pointer absolute right-4 top-4 size-10 rounded-full"
      >
        <X className="size-5 " aria-hidden="true" />
        <span className="sr-only">Fechar</span>
      </Button>

      <div
        // onClick={(event) => event.stopPropagation()}
        className="relative h-screen w-auto"
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={`Flyer do show ${title}`}
          width={800}
          height={1200}
          className="h-screen w-auto rounded-lg object-contain shadow-2xl p-1 "
        />
      </div>,
    </div>,
    document.body,
  )
}
