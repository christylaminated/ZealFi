"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Bookmark, Zap, TrendingUp, Trophy, MessageCircle, Share2, Bell, Plus } from "lucide-react"
import { Navigation } from "./navigation"
import Image from "next/image"
import { Badge } from "./ui/badge"
import { useState } from "react"
import Link from "next/link"
import { ActivityFeed } from "./activity-feed"
import { HexagonAvatar } from "./hexagon-avatar"
import { AvatarGroup } from "./avatar-group"
import { CreateGoalPodDialog } from "./create-goal-pod-dialog"
import { WalletDisplay } from "./aptos/WalletDisplay"

export function HomeScreen() {
  const [verified, setVerified] = useState(true)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const featuredGoalPods = [
    {
      id: "1",
      title: "Exercise 3x a week",
      amount: "USDC 20",
      image: "/images/fitness-avatar.png",
      participants: 8,
      category: "fitness",
      avatars: Array(4).fill("/images/default-avatar.png"),
    },
    {
      id: "2",
      title: "Read 30 mins daily",
      amount: "USDC 15",
      image: "/images/wellness-avatar.png",
      participants: 12,
      category: "wellness",
      avatars: Array(4).fill("/images/default-avatar.png"),
    },
    {
      id: "3",
      title: "Meditation challenge",
      amount: "USDC 10",
      image: "/images/wellness-avatar.png",
      participants: 5,
      category: "wellness",
      avatars: Array(3).fill("/images/default-avatar.png"),
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-400 glow-text">ZealFi</h1>
            <p className="text-xl font-semibold text-white">
              Stake Your Goals.
              <br />
              Share Your Wins.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full bg-gray-900/80 hover:bg-gray-800 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center text-[10px]">
                3
              </span>
            </Button>
            <WalletDisplay />
            <HexagonAvatar src="/images/default-avatar.png" alt="User" className="h-10 w-10 border-2 border-blue-500" />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6 pb-20 hexagon-grid">
        <div className="flex items-center gap-4">
          <HexagonAvatar
            src="/images/default-avatar.png"
            alt="User"
            className="h-16 w-16 border-2 border-blue-500 avatar-glow"
          />
          <div>
            <p className="font-semibold text-lg">Lauren</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-400">Godia • Goal Pod</p>
              <Badge className="bg-blue-500/20 text-blue-400 badge-glow">
                <Zap className="h-3 w-3 mr-1" /> Level 5
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-blue-400 glow-text">Activity Feed</h2>
            <Button variant="outline" className="text-blue-400 text-sm border-blue-500/30 bg-blue-500/10">
              <Bell className="h-3.5 w-3.5 mr-1.5" /> Following
            </Button>
          </div>

          <ActivityFeed />
        </div>

        <Card className="futuristic-card overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-56 w-full">
              <Image src="/images/fitness-avatar.png" alt="Workout" fill className="object-cover rounded-t-lg" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <Badge className="bg-blue-500/80 backdrop-blur-sm text-white">
                  {verified ? "✓ Verified" : "Pending"}
                </Badge>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">Staked USDC to read 10 books</p>
                <Badge className="bg-blue-900/30 text-blue-400">
                  <TrendingUp className="h-3 w-3 mr-1" /> 8/10
                </Badge>
              </div>
              <div className="h-2 bg-gray-800 rounded-full">
                <div className="progress-bar" style={{ width: "80%" }}></div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">Yesterday</p>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <Avatar key={i} className="h-6 w-6 border-2 border-gray-900">
                      <AvatarImage src="/images/default-avatar.png" alt="Supporter" />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 text-xs text-blue-400 border-2 border-gray-900">
                    +5
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`px-2 ${liked ? "text-pink-500" : "text-gray-400"}`}
                    onClick={() => setLiked(!liked)}
                  >
                    <Heart className="h-5 w-5" />
                    <span className="ml-1">12</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="px-2 text-gray-400">
                    <MessageCircle className="h-5 w-5" />
                    <span className="ml-1">4</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`px-2 ${bookmarked ? "text-blue-400" : "text-gray-400"}`}
                    onClick={() => setBookmarked(!bookmarked)}
                  >
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-blue-400 glow-text">Featured Goal Pods</h2>
            <Link href="/goal-pods">
              <Button variant="ghost" className="text-blue-400 text-sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGoalPods.map((pod) => (
              <Card key={pod.id} className="futuristic-card overflow-hidden group">
                <CardContent className="p-0">
                  <div className="relative h-32 w-full">
                    <Image
                      src={pod.image || "/placeholder.svg"}
                      alt={pod.title}
                      fill
                      className="object-cover brightness-75 group-hover:brightness-90 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="font-medium text-white">{pod.title}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-blue-400 font-semibold">{pod.amount}</p>
                        <Badge className="bg-blue-900/30 text-blue-300">
                          <Trophy className="h-3 w-3 mr-1" /> {pod.participants} joined
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <AvatarGroup avatars={pod.avatars} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            className="w-full gradient-button text-white font-medium py-6 rounded-xl"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="h-5 w-5 mr-2" /> Create Goal Pod
          </Button>
        </div>
      </main>

      <Navigation />
      <CreateGoalPodDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
