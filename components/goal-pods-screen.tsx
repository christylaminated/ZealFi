"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "./navigation"
import { Plus, Info, Users, Clock, Zap, Search } from "lucide-react"
import { CreateGoalPodDialog } from "./create-goal-pod-dialog"
import { useState } from "react"
import Image from "next/image"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { AvatarGroup } from "./avatar-group"
import { motion } from "framer-motion"

interface GoalPod {
  id: string
  title: string
  daysRemaining: number
  progress: number
  amount?: string
  image: string
  participants?: number
  category?: string
  avatars: string[]
}

export function GoalPodsScreen() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

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

  const goalPods: GoalPod[] = [
    {
      id: "1",
      title: "Read 20 Pages Daily",
      daysRemaining: 14,
      progress: 40,
      image: "/images/wellness-avatar.png",
      participants: 8,
      category: "learning",
      avatars: Array(4).fill("/images/default-avatar.png"),
    },
    {
      id: "2",
      title: "Finish Old Project",
      daysRemaining: 23,
      progress: 60,
      image: "/images/productivity-avatar.png",
      participants: 5,
      category: "productivity",
      avatars: Array(3).fill("/images/default-avatar.png"),
    },
    {
      id: "3",
      title: "Social Media Detox",
      daysRemaining: 9,
      progress: 30,
      amount: "558.00 USDC",
      image: "/images/wellness-avatar.png",
      participants: 12,
      category: "wellness",
      avatars: Array(4).fill("/images/default-avatar.png"),
    },
    {
      id: "4",
      title: "Workout 3x a Week",
      daysRemaining: 18,
      progress: 75,
      amount: "250.00 USDC",
      image: "/images/fitness-avatar.png",
      participants: 15,
      category: "fitness",
      avatars: Array(4).fill("/images/default-avatar.png"),
    },
    {
      id: "5",
      title: "Meditation Challenge",
      daysRemaining: 21,
      progress: 25,
      amount: "120.00 USDC",
      image: "/images/wellness-avatar.png",
      participants: 7,
      category: "wellness",
      avatars: Array(3).fill("/images/default-avatar.png"),
    },
    {
      id: "6",
      title: "No Sugar Diet",
      daysRemaining: 12,
      progress: 50,
      amount: "300.00 USDC",
      image: "/images/wellness-avatar.png",
      participants: 9,
      category: "health",
      avatars: Array(4).fill("/images/default-avatar.png"),
    },
    {
      id: "7",
      title: "Learn Piano Basics",
      daysRemaining: 30,
      progress: 15,
      amount: "200.00 USDC",
      image: "/images/wellness-avatar.png",
      participants: 6,
      category: "learning",
      avatars: Array(3).fill("/images/default-avatar.png"),
    },
    {
      id: "8",
      title: "Daily Journaling",
      daysRemaining: 25,
      progress: 40,
      amount: "150.00 USDC",
      image: "/images/productivity-avatar.png",
      participants: 11,
      category: "productivity",
      avatars: Array(4).fill("/images/default-avatar.png"),
    },
    {
      id: "9",
      title: "5K Run Training",
      daysRemaining: 45,
      progress: 20,
      amount: "400.00 USDC",
      image: "/images/fitness-avatar.png",
      participants: 14,
      category: "fitness",
      avatars: Array(4).fill("/images/default-avatar.png"),
    },
  ]

  const categories = [
    { id: "all", label: "All" },
    { id: "fitness", label: "Fitness" },
    { id: "wellness", label: "Wellness" },
    { id: "productivity", label: "Productivity" },
    { id: "learning", label: "Learning" },
    { id: "health", label: "Health" },
  ]

  const filteredPods = goalPods
    .filter((pod) => filter === "all" || pod.category === filter)
    .filter((pod) => searchQuery === "" || pod.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold glow-text">Goal Pods</h1>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="h-5 w-5 text-blue-400" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-4 pb-20 hexagon-grid">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search goal pods..."
            className="pl-9 bg-gray-900/80 border-gray-800 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                size="sm"
                className={`rounded-full px-4 ${
                  filter === category.id
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "border-blue-500/30 bg-transparent text-blue-400 hover:bg-blue-500/10"
                }`}
                onClick={() => setFilter(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            className="border-blue-500/50 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="h-4 w-4 mr-2" /> Create
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPods.map((pod, index) => (
            <motion.div
              key={pod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Card className="futuristic-card overflow-hidden group relative">
                <div className="absolute top-0 left-0 w-full h-full scanner-line z-10 opacity-0 group-hover:opacity-100"></div>
                <CardContent className="p-0">
                  <div className="relative h-32 w-full">
                    <Image
                      src={getCategoryImage(pod.category || "")}
                      alt={pod.title}
                      fill
                      className="object-cover brightness-75 group-hover:brightness-90 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute top-2 right-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60"
                      >
                        <Info className="h-4 w-4 text-blue-400" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{pod.title}</h3>
                      {pod.amount && (
                        <Badge className="bg-blue-900/30 text-blue-400">
                          <Zap className="h-3 w-3 mr-1" /> {pod.amount}
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{pod.daysRemaining} days left</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{pod.participants} joined</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-2 bg-gray-800 rounded-full flex-1 relative overflow-hidden">
                        <div className="progress-bar" style={{ width: `${pod.progress}%` }}></div>
                      </div>
                      <span className="text-xs text-blue-400">{pod.progress}%</span>
                    </div>

                    <AvatarGroup avatars={pod.avatars} hexagonal={true} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      <Navigation currentPath="/goal-pods" />

      <CreateGoalPodDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
