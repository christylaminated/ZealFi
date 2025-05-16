"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Award, Zap, Trophy, BookOpen, Dumbbell, Coffee, Brain } from "lucide-react"
import { useState } from "react"
import { HexagonAvatar } from "./hexagon-avatar"
import { motion } from "framer-motion"

interface FeedItem {
  id: string
  user: {
    name: string
    avatar: string
    level?: number
  }
  action: string
  goal: string
  icon: React.ElementType
  timeAgo: string
  likes: number
  comments: number
  image?: string
  achievement?: string
  category?: string
}

export function ActivityFeed() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const getCategoryImage = (category: string) => {
    switch (category) {
      case "fitness":
        return "/images/fitness-avatar.png"
      case "wellness":
        return "/images/wellness-avatar.png"
      case "productivity":
        return "/images/productivity-avatar.png"
      default:
        return "/images/default-avatar.png"
    }
  }

  const feedItems: FeedItem[] = [
    {
      id: "1",
      user: {
        name: "Alex",
        avatar: "/images/default-avatar.png",
        level: 7,
      },
      action: "completed",
      goal: "Morning Workout Challenge",
      icon: Dumbbell,
      timeAgo: "2 hours ago",
      likes: 24,
      comments: 5,
      achievement: "Fitness Warrior",
      category: "fitness",
    },
    {
      id: "2",
      user: {
        name: "Sophia",
        avatar: "/images/default-avatar.png",
        level: 4,
      },
      action: "achieved",
      goal: "Reading 5 Books in a Month",
      icon: BookOpen,
      timeAgo: "5 hours ago",
      likes: 18,
      comments: 3,
      achievement: "Bookworm",
      category: "wellness",
    },
    {
      id: "3",
      user: {
        name: "Marcus",
        avatar: "/images/default-avatar.png",
        level: 6,
      },
      action: "completed",
      goal: "No Social Media for 30 Days",
      icon: Brain,
      timeAgo: "Yesterday",
      likes: 32,
      comments: 7,
      achievement: "Digital Detox Master",
      category: "wellness",
    },
    {
      id: "4",
      user: {
        name: "Olivia",
        avatar: "/images/default-avatar.png",
        level: 3,
      },
      action: "started",
      goal: "Daily Meditation Practice",
      icon: Brain,
      timeAgo: "2 days ago",
      likes: 15,
      comments: 2,
      category: "wellness",
    },
    {
      id: "5",
      user: {
        name: "Ethan",
        avatar: "/images/default-avatar.png",
        level: 5,
      },
      action: "reached milestone in",
      goal: "Learning Spanish",
      icon: Trophy,
      timeAgo: "3 days ago",
      likes: 27,
      comments: 4,
      achievement: "Language Explorer",
      category: "productivity",
    },
    {
      id: "6",
      user: {
        name: "Zoe",
        avatar: "/images/default-avatar.png",
        level: 8,
      },
      action: "completed",
      goal: "No Coffee for 2 Weeks",
      icon: Coffee,
      timeAgo: "4 days ago",
      likes: 21,
      comments: 6,
      achievement: "Caffeine Free",
      category: "wellness",
    },
  ]

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="space-y-3">
      {feedItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <Card className="futuristic-card overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-400"></div>
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                <HexagonAvatar
                  src={item.user.avatar}
                  alt={item.user.name}
                  className="h-12 w-12 border-2 border-blue-500"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{item.user.name}</p>
                        {item.user.level && (
                          <Badge className="bg-blue-500/20 text-blue-400 text-xs px-1.5 py-0">
                            <Zap className="h-2.5 w-2.5 mr-0.5" /> {item.user.level}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        <span className="text-blue-400">{item.action}</span> {item.goal}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">{item.timeAgo}</p>
                  </div>

                  {item.achievement && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <Badge className="bg-gradient-to-r from-blue-500/30 to-cyan-400/30 text-white backdrop-blur-sm">
                        <Award className="h-3 w-3 mr-1 text-yellow-400" /> {item.achievement}
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-3">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-400 hover:text-pink-500">
                        <Heart className="h-4 w-4 mr-1" />
                        <span className="text-xs">{item.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-400 hover:text-blue-400">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">{item.comments}</span>
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-full bg-blue-500/10 text-blue-400"
                      onClick={() => toggleExpand(item.id)}
                    >
                      <item.icon className="h-4 w-4" />
                    </Button>
                  </div>

                  {expandedItems[item.id] && (
                    <div className="mt-3 p-2 bg-blue-500/5 rounded-lg border border-blue-500/10">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                          <img
                            src={getCategoryImage(item.category || "")}
                            alt={item.category}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm text-gray-300">
                          {item.user.name} has earned {item.likes} reputation points for completing this goal!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
