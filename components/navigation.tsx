"use client"

import { Home, BarChart2, User, Users } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface NavigationProps {
  currentPath?: string
}

export function Navigation({ currentPath = "/" }: NavigationProps) {
  const navItems = [
    {
      icon: Home,
      label: "Goal",
      href: "/",
    },
    {
      icon: Users,
      label: "Goal Pods",
      href: "/goal-pods",
    },
    {
      icon: BarChart2,
      label: "Leaderboard",
      href: "/leaderboard",
    },
    {
      icon: User,
      label: "Profile",
      href: "/profile",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-gray-800 z-10">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = currentPath === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-3 px-4 relative nav-item",
                isActive ? "text-blue-400 active" : "text-gray-400",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-500/10 rounded-t-xl -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
