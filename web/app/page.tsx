"use client"
import Hero from "@/components/hero"
import { VideoIntro } from "@/components/video-intro"
import { useEffect, useState } from "react"
import { useVideoContext } from "@/components/video-context"

const toggleVideo = true

export default function Page() {
  const [showingVideo, setShowingVideo] = useState(true)
  const { setIsVideoActive } = useVideoContext()

  useEffect(() => {
    setIsVideoActive(showingVideo)
  }, [showingVideo, setIsVideoActive])

  return (
    <div className="">
      {showingVideo && toggleVideo ? (
        <VideoIntro
          showingVideo={showingVideo}
          setShowingVideo={setShowingVideo}
        />
      ) : (        
          <Hero />        
      )}
    </div>
  )
}
