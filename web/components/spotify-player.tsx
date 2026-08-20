"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

export function SpotifyPlayer() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#171717]">
          <Loader2 className="h-10 w-10 animate-spin text-white/70" />          
        </div>
      )}
      <iframe
        title="Player do Spotify com as músicas da banda"
        src="https://open.spotify.com/embed/artist/6Rifvut8hIuWSOYElWI9WC?utm_source=generator&si=11a76df62ed54555&theme=0"
        width="100%"
        height={750}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
        className="rounded-xl"
      />
    </div>
  )
}