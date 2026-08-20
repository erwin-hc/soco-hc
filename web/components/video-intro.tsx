"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { VolumeX, Volume2, Play } from "lucide-react"
import { Logo } from "./logo"

export function VideoIntro({
  showingVideo,
  setShowingVideo,
}: {
  showingVideo: boolean
  setShowingVideo: (value: boolean) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleShowVideo = () => {
    const timer = setTimeout(() => {
      setShowingVideo(false)
    }, 6200)
    return () => clearTimeout(timer)
  }

  // Função para iniciar o site COM som após o clique
  function handleStart() {
    setHasInteracted(true)
    // Damos um micro-timeout para o React renderizar o vídeo antes de dar play
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false
        videoRef.current
          .play()
          .catch((err) => console.log("Erro ao tocar:", err))
      }
    }, 50)
  }

  function toggleSound() {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  // Se não interagiu, mostra a tela de convite/preview
  if (!hasInteracted) {
    return (
      <section className="flex min-h-svh w-full flex-col items-center justify-center bg-background ">
        
        <Logo color="white" className="mb-10 h-76  opacity-85" />

        <Button
          onClick={() => {
            handleStart()
            handleShowVideo()
          }}
          size="sm"
          className="animate-bounce gap-2 rounded-full p-4 text-sm shadow-xl"
        >
          <Play className="h-5 w-5 fill-current" />
          Entrar
        </Button>
      </section>
    )
  }

  return (
    <section className="relative h-svh w-full overflow-hidden bg-background">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="h-full w-full object-cover"
      >
        <source src="/soco_hc_intro.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      <div className="absolute inset-0 bg-black/10 dark:bg-black/10" />

      {/* Botão para ativar/desativar som */}
      <Button
        onClick={toggleSound}
        variant="secondary"
        size="icon"
        className="absolute right-6 bottom-6 z-10 h-12 w-12 rounded-full shadow-lg"
        aria-label={isMuted ? "Ativar som" : "Desativar som"}
      >
        {isMuted ? (
          <VolumeX className="h-6 w-6" />
        ) : (
          <Volume2 className="h-6 w-6" />
        )}
      </Button>
    </section>
  )
}
