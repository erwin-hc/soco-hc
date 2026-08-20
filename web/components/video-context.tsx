"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface VideoContextType {
  isVideoActive: boolean
  setIsVideoActive: (value: boolean) => void
}

const VideoContext = createContext<VideoContextType | undefined>(undefined)

export function VideoProvider({ children }: { children: ReactNode }) {
  const [isVideoActive, setIsVideoActive] = useState(true)

  return (
    <VideoContext.Provider value={{ isVideoActive, setIsVideoActive }}>
      {children}
    </VideoContext.Provider>
  )
}

export function useVideoContext() {
  const context = useContext(VideoContext)
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider")
  }
  return context
}