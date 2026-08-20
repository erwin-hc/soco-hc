"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Footer } from "@/components/footer"
import { Logo } from "@/components/logo"
import { SpotifyPlayer } from "@/components/spotify-player"


export default function MusicasPage() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <AnimatePresence>
      <motion.main
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 0.8 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        key={"musicas"}
        className="min-h-screen w-full px-2 py-4 md:px-8 md:py-16 opacity-80"
      >
        <header className="mx-auto mb-4 max-w-5xl">
          <h1 className="font-[Russo_One] uppercase px-4 text-balance text-3xl font-bold tracking-tight md:text-5xl">
            Nossas músicas
          </h1>
        </header>

        <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4">

          <motion.div 
          key={"video-clip"}
          initial={{ x: -150, opacity: 0 }}
          whileInView={{ x:0, opacity: 0.9 }} 
          viewport={{ once: false, amount: 0.1 }} 
          transition={{ duration: 0.5, ease: "easeInOut" }}

          className="aspect-video w-full overflow-hidden rounded-xl border-2 border-white/25 bg-card">
            {!isPlaying ? (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="group relative h-full w-full overflow-hidden text-left focus:outline-none"
                aria-label="Tocar vídeo clipe da banda"
              >
                {/* Imagem de capa personalizada */}
                <div className="flex items-center justify-center p-4">
                  <Logo width={350} color={"white"} className="h-auto max-h-full w-auto max-w-full"/>
                </div>
                {/* Overlay escuro + Ícone de Play */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/20">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/85 shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <svg
                      className="ml-1 h-8 w-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            ) : (
              <iframe
                title="Vídeo clipe da banda no YouTube"
                src="https://www.youtube-nocookie.com/embed/_g9TWBrziwQ?rel=0&modestbranding=1&autoplay=1"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className=" h-full w-full rounded-xl border-2 border-white/25"
              />
            )}
          </motion.div>

          <motion.div 
          key={"spotify"}
          initial={{ x: -150, opacity: 0 }}
          whileInView={{ x:0, opacity: 0.9 }} 
          viewport={{ once: false, amount: 0.1 }} 
          transition={{ duration: 0.5, ease: "easeInOut" }}
          
          className="overflow-hidden rounded-xl border-2 border-white/25 bg-[#434343]">
            <SpotifyPlayer />
          </motion.div>
        </section>

      </motion.main>
      <Footer />
    </AnimatePresence>
  )
}