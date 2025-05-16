"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Check, Trophy, Star, TrendingUp, Zap, Award, Medal, Target, Clock } from "lucide-react"
import { Navigation } from "./navigation"
import Link from "next/link"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { HexagonAvatar } from "./hexagon-avatar"
import { motion } from "framer-motion"

interface CompletedGoal {
  id: string
  title: string
  timeAgo: string
  completed: boolean
  image: string
  reward?: string
  category?: string
}

export function ProfileScreen() {
  const user = {
    name: "Lauren",
    reputation: 1220,
    avatar: "/images/default-avatar.png",
    level: 5,
    streak: 14,
    badges: ["Fitness Pro", "Early Adopter", "Streak Master"],
    achievements: [
      { name: "First Goal", icon: Target, date: "Jan 15, 2023" },
      { name: "10 Day Streak", icon: Zap, date: "Mar 22, 2023" },
      { name: "5 Goals Completed", icon: Trophy, date: "Apr 10, 2023" },
    ],
  }

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

  const completedGoals: CompletedGoal[] = [
    {
      id: "1",
      title: "Workout 3x a Week",
      timeAgo: "3 weeks ago",
      completed: true,
      image: "/images/fitness-avatar.png",
      reward: "120 USDC",
      category: "fitness",
    },
    {
      id: "2",
      title: "Start a YouTube Channel",
      timeAgo: "1 month ago",
      completed: true,
      image: "/images/productivity-avatar.png",
      reward: "200 USDC",
      category: "productivity",
    },
    {
      id: "3",
      title: "No Dairy for 30 Days",
      timeAgo: "4 weeks ago",
      completed: true,
      image: "/images/wellness-avatar.png",
      reward: "150 USDC",
      category: "wellness",
    },
  ]

  const stats = [
    { label: "Goals Completed", value: 12, icon: Trophy },
    { label: "Current Streak", value: "14 days", icon: Zap },
    { label: "Total Earned", value: "1,450 USDC", icon: Star },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-10 flex items-center">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold glow-text">Profile</h1>
      </header>

      <main className="flex-1 p-4 space-y-6 pb-20 hexagon-grid">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent rounded-xl -z-10"></div>
          <Card className="glass-effect border-blue-500/20 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative">
                  <HexagonAvatar
                    src={user.avatar}
                    alt={user.name}
                    className="h-24 w-24 border-2 border-blue-500 avatar-glow"
                    glowing={true}
                  />
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                    {user.level}
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-3xl font-bold glow-text">{user.name}</h2>
                  <p className="text-gray-400">Reputation {user.reputation}</p>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                    <Badge className="bg-blue-900/30 text-blue-400 px-3 py-1">
                      <Award className="h-3 w-3 mr-1" /> NFT Holder
                    </Badge>
                    {user.badges.map((badge, i) => (
                      <Badge key={i} className="bg-gray-800/80 text-gray-300 px-3 py-1">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              <Card className="futuristic-card relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                <CardContent className="p-4 text-center">
                  <stat.icon className="h-5 w-5 mx-auto mb-2 text-blue-400" />
                  <p className="font-bold text-lg text-blue-400">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center">
            <Medal className="h-5 w-5 mr-2 text-blue-400" />
            Achievements
          </h3>

          <div className="grid grid-cols-3 gap-3">
            {user.achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <Card className="futuristic-card holographic">
                  <CardContent className="p-3 text-center">
                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
                      <achievement.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <p className="font-medium text-sm">{achievement.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-blue-400" />
            Goal Pods Completed
          </h3>

          <div className="space-y-4">
            {completedGoals.map((goal, i) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <Card className="futuristic-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="relative h-24 w-24">
                        <Image
                          src={getCategoryImage(goal.category || "")}
                          alt={goal.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                      </div>
                      <div className="flex-1 p-3 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <p className="font-medium">{goal.title}</p>
                            {goal.completed && (
                              <Badge className="bg-blue-900/20 text-blue-400">
                                <Check className="h-3 w-3 mr-1" />
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3 text-gray-500" />
                            <p className="text-sm text-gray-400">{goal.timeAgo}</p>
                          </div>
                        </div>
                        {goal.reward && (
                          <Badge className="self-start bg-green-900/20 text-green-400">
                            <TrendingUp className="h-3 w-3 mr-1" /> Earned {goal.reward}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Navigation currentPath="/profile" />
    </div>
  )
}
