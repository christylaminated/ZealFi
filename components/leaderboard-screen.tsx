"use client"
import { Navigation } from "./navigation"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Crown, Award, Star, Zap, Search, Filter, TrendingUp } from "lucide-react"
import { useState } from "react"
import { HexagonAvatar } from "./hexagon-avatar"
import { motion } from "framer-motion"
import { Input } from "./ui/input"

interface LeaderboardUser {
  id: string
  name: string
  score: number
  wins: number
  avatar: string
  rank?: number
  badge?: string
  streak?: number
  change?: "up" | "down" | "same"
  changeAmount?: number
}

export function LeaderboardScreen() {
  const [timeframe, setTimeframe] = useState("all-time")
  const [searchQuery, setSearchQuery] = useState("")

  const users: LeaderboardUser[] = [
    {
      id: "1",
      name: "Tim",
      score: 1450,
      wins: 15,
      avatar: "/images/default-avatar.png",
      rank: 1,
      badge: "Diamond",
      streak: 28,
      change: "up",
      changeAmount: 120,
    },
    {
      id: "2",
      name: "Anna",
      score: 1420,
      wins: 14,
      avatar: "/images/default-avatar.png",
      rank: 2,
      badge: "Platinum",
      streak: 21,
      change: "same",
      changeAmount: 0,
    },
    {
      id: "3",
      name: "Dave",
      score: 1320,
      wins: 13,
      avatar: "/images/default-avatar.png",
      rank: 3,
      badge: "Gold",
      streak: 14,
      change: "up",
      changeAmount: 80,
    },
    {
      id: "4",
      name: "Max",
      score: 1300,
      wins: 12,
      avatar: "/images/default-avatar.png",
      rank: 4,
      badge: "Silver",
      streak: 7,
      change: "down",
      changeAmount: 30,
    },
    {
      id: "5",
      name: "Hannah",
      score: 960,
      wins: 9,
      avatar: "/images/default-avatar.png",
      rank: 5,
      badge: "Bronze",
      streak: 5,
      change: "up",
      changeAmount: 50,
    },
    {
      id: "6",
      name: "Liam",
      score: 920,
      wins: 8,
      avatar: "/images/default-avatar.png",
      rank: 6,
      badge: "Bronze",
      streak: 3,
      change: "up",
      changeAmount: 40,
    },
    {
      id: "7",
      name: "Sophia",
      score: 880,
      wins: 7,
      avatar: "/images/default-avatar.png",
      rank: 7,
      badge: "Bronze",
      streak: 2,
      change: "down",
      changeAmount: 20,
    },
    {
      id: "8",
      name: "Noah",
      score: 820,
      wins: 6,
      avatar: "/images/default-avatar.png",
      rank: 8,
      badge: "Bronze",
      streak: 1,
      change: "same",
      changeAmount: 0,
    },
    {
      id: "9",
      name: "Emma",
      score: 780,
      wins: 5,
      avatar: "/images/default-avatar.png",
      rank: 9,
      badge: "Bronze",
      streak: 0,
      change: "up",
      changeAmount: 30,
    },
    {
      id: "10",
      name: "James",
      score: 720,
      wins: 4,
      avatar: "/images/default-avatar.png",
      rank: 10,
      badge: "Bronze",
      streak: 0,
      change: "down",
      changeAmount: 10,
    },
  ]

  const timeframes = [
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "all-time", label: "All Time" },
  ]

  const filteredUsers = users.filter(
    (user) => searchQuery === "" || user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold glow-text">Leaderboard</h1>
        <p className="text-sm text-gray-400">By Reputation</p>
      </header>

      <main className="flex-1 p-4 space-y-4 pb-20 hexagon-grid">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-9 bg-gray-900/80 border-gray-800 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {timeframes.map((tf) => (
              <Button
                key={tf.id}
                variant={timeframe === tf.id ? "default" : "outline"}
                size="sm"
                className={`rounded-full px-4 ${
                  timeframe === tf.id
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "border-blue-500/30 bg-transparent text-blue-400 hover:bg-blue-500/10"
                }`}
                onClick={() => setTimeframe(tf.id)}
              >
                {tf.label}
              </Button>
            ))}
          </div>

          <Button variant="outline" className="border-blue-500/30 bg-transparent text-blue-400">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>

        <div className="space-y-4">
          {filteredUsers.slice(0, 3).map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card
                className={`futuristic-card overflow-hidden ${
                  index === 0
                    ? "border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-transparent"
                    : index === 1
                      ? "border-gray-400/30 bg-gradient-to-r from-gray-400/10 to-transparent"
                      : "border-amber-700/30 bg-gradient-to-r from-amber-700/10 to-transparent"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <HexagonAvatar
                        src={user.avatar}
                        alt={user.name}
                        className="h-16 w-16 border-2 border-blue-500 avatar-glow"
                      />
                      <div className="absolute -top-2 -left-2 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                        {user.rank}
                      </div>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1">
                          <Crown className="h-5 w-5 text-yellow-400" fill="currentColor" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-lg">{user.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`
                              ${
                                index === 0
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : index === 1
                                    ? "bg-gray-400/20 text-gray-300"
                                    : "bg-amber-700/20 text-amber-600"
                              }
                            `}
                            >
                              <Award className="h-3 w-3 mr-1" /> {user.badge}
                            </Badge>
                            <Badge className="bg-blue-900/20 text-blue-400">
                              <Zap className="h-3 w-3 mr-1" /> {user.streak} day streak
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <p className="font-bold text-2xl text-blue-400 glow-text">{user.score}</p>
                            {user.change && (
                              <Badge
                                className={`
                                ${
                                  user.change === "up"
                                    ? "bg-green-500/20 text-green-400"
                                    : user.change === "down"
                                      ? "bg-red-500/20 text-red-400"
                                      : "bg-gray-500/20 text-gray-400"
                                }
                              `}
                              >
                                <TrendingUp className={`h-3 w-3 mr-1 ${user.change === "down" ? "rotate-180" : ""}`} />
                                {user.changeAmount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{user.wins} wins</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {filteredUsers.slice(3).map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 3) * 0.1, duration: 0.3 }}
            >
              <div className="flex items-center justify-between p-4 rounded-lg futuristic-card">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <HexagonAvatar
                      src={user.avatar}
                      alt={user.name}
                      className="h-12 w-12 border border-gray-700"
                      size="sm"
                    />
                    <div className="absolute -top-2 -left-2 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold bg-gray-800 text-gray-300 border border-gray-700">
                      {user.rank}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <div className="flex items-center gap-1">
                      <Badge className="bg-gray-800 text-gray-400 text-xs px-1.5 py-0">
                        <Star className="h-2.5 w-2.5 mr-0.5" /> {user.badge}
                      </Badge>
                      <p className="text-xs text-gray-500">{user.wins} wins</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-blue-400">{user.score}</p>
                  {user.change && (
                    <Badge
                      className={`
                      ${
                        user.change === "up"
                          ? "bg-green-500/20 text-green-400"
                          : user.change === "down"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-gray-500/20 text-gray-400"
                      }
                      text-xs px-1.5 py-0
                    `}
                    >
                      <TrendingUp className={`h-2.5 w-2.5 mr-0.5 ${user.change === "down" ? "rotate-180" : ""}`} />
                      {user.changeAmount}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Navigation currentPath="/leaderboard" />
    </div>
  )
}
