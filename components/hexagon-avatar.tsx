"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { motion } from "framer-motion"

interface HexagonAvatarProps {
  src: string
  alt: string
  className?: string
  size?: "sm" | "md" | "lg"
  glowing?: boolean
}

export function HexagonAvatar({ src, alt, className, size = "md", glowing = false }: HexagonAvatarProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }

  return (
    <div
      className={cn("relative", sizeClasses[size], className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {glowing && (
        <motion.div
          className="absolute inset-0 bg-blue-500 rounded-full opacity-20 z-0"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.2, 0.4, 0.2] : 0.2,
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      )}

      <div className="hexagon-avatar overflow-hidden relative z-10">
        <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />

        {isHovered && <div className="absolute inset-0 bg-gradient-to-t from-blue-500/50 to-transparent" />}
      </div>

      {isHovered && (
        <motion.div
          className="absolute inset-0 border-2 border-blue-400 hexagon-avatar z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  )
}
