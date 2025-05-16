"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HexagonAvatar } from "./hexagon-avatar"
import { motion } from "framer-motion"

interface AvatarGroupProps {
  avatars: string[]
  max?: number
  size?: "sm" | "md" | "lg"
  hexagonal?: boolean
}

export function AvatarGroup({ avatars, max = 4, size = "sm", hexagonal = false }: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max)
  const remaining = avatars.length - max

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  return (
    <div className="flex -space-x-3">
      {displayAvatars.map((avatar, index) => (
        <motion.div
          key={index}
          className="relative"
          whileHover={{ y: -5, zIndex: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {hexagonal ? (
            <HexagonAvatar
              src={avatar}
              alt={`User ${index + 1}`}
              className={`border-2 border-gray-900 ${sizeClasses[size]}`}
            />
          ) : (
            <Avatar className={`border-2 border-gray-900 ${sizeClasses[size]}`}>
              <AvatarImage src={avatar || "/placeholder.svg"} alt={`User ${index + 1}`} />
              <AvatarFallback>U{index + 1}</AvatarFallback>
            </Avatar>
          )}

          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-blue-500 rounded-full border border-gray-900 flex items-center justify-center">
            <div className="h-2 w-2 bg-blue-200 rounded-full"></div>
          </div>
        </motion.div>
      ))}

      {remaining > 0 && (
        <motion.div
          className={`flex items-center justify-center ${sizeClasses[size]} rounded-full bg-gray-800 text-xs text-blue-400 border-2 border-gray-900`}
          whileHover={{ y: -5, zIndex: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          +{remaining}
        </motion.div>
      )}
    </div>
  )
}
