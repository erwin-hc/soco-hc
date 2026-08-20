"use client"
import Hero from "@/components/hero"
import { VideoIntro } from "@/components/video-intro"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useVideoContext } from "@/components/video-context"

const toggleVideo = true

export default function Page() {
  const [showingVideo, setShowingVideo] = useState(true)
  const { setIsVideoActive } = useVideoContext()
  const router = useRouter()

  useEffect(() => {
    setIsVideoActive(showingVideo)
  }, [showingVideo, setIsVideoActive])

  // Após o vídeo terminar, redireciona para /home
  useEffect(() => {
    if (!showingVideo && toggleVideo) {
      router.replace("/home")
    }
  }, [showingVideo, router])

  return (
    <div className="">
      {showingVideo && toggleVideo ? (
        <VideoIntro
          showingVideo={showingVideo}
          setShowingVideo={setShowingVideo}
        />
      ) : null}
    </div>
  )
}
