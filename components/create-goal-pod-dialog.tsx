"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Calendar, Zap, Users, ImageIcon, Target } from "lucide-react"
import { Badge } from "./ui/badge"

interface CreateGoalPodDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateGoalPodDialog({ open, onOpenChange }: CreateGoalPodDialogProps) {
  const [goal, setGoal] = useState("")
  const [stake, setStake] = useState("")
  const [duration, setDuration] = useState("1 month")
  const [category, setCategory] = useState("fitness")
  const [privacy, setPrivacy] = useState("public")
  const [maxParticipants, setMaxParticipants] = useState(10)

  const categories = [
    { id: "fitness", label: "Fitness", icon: "🏋️" },
    { id: "wellness", label: "Wellness", icon: "🧘" },
    { id: "productivity", label: "Productivity", icon: "⚡" },
    { id: "learning", label: "Learning", icon: "📚" },
    { id: "health", label: "Health", icon: "🥗" },
    { id: "finance", label: "Finance", icon: "💰" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the creation of the goal pod
    console.log({ goal, stake, duration, category, privacy, maxParticipants })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-effect border-blue-500/20 text-white max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-400 glow-text">Create Goal Pod</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-2 bg-gray-900/80">
            <TabsTrigger value="basic" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              Basic Info
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="goal" className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-400" />
                Goal
              </Label>
              <Input
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="bg-gray-800/80 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                placeholder="Enter your goal"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    type="button"
                    variant="outline"
                    className={`flex flex-col h-20 ${
                      category === cat.id
                        ? "border-blue-500 bg-blue-500/10 text-blue-400"
                        : "border-gray-700 bg-gray-800/80"
                    }`}
                    onClick={() => setCategory(cat.id)}
                  >
                    <span className="text-xl mb-1">{cat.icon}</span>
                    <span className="text-xs">{cat.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stake" className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-400" />
                Stake
              </Label>
              <div className="flex">
                <Input
                  id="stake"
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                  className="bg-gray-800/80 border-gray-700 rounded-r-none focus:border-blue-500 focus:ring-blue-500/20"
                  placeholder="Amount"
                  type="number"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-l-none border-l-0 bg-gray-800/80 border-gray-700 text-blue-400"
                >
                  USDC &gt;
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-400" />
                Pod duration
              </Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="bg-gray-800/80 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="1 week">1 week</SelectItem>
                  <SelectItem value="2 weeks">2 weeks</SelectItem>
                  <SelectItem value="1 month">1 month</SelectItem>
                  <SelectItem value="3 months">3 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="privacy" className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                Privacy
              </Label>
              <Select value={privacy} onValueChange={setPrivacy}>
                <SelectTrigger className="bg-gray-800/80 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue placeholder="Select privacy" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="public">Public - Anyone can join</SelectItem>
                  <SelectItem value="private">Private - Invite only</SelectItem>
                  <SelectItem value="friends">Friends only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="maxParticipants" className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  Max Participants
                </Label>
                <Badge className="bg-blue-900/30 text-blue-400">{maxParticipants}</Badge>
              </div>
              <Slider
                id="maxParticipants"
                min={2}
                max={50}
                step={1}
                value={[maxParticipants]}
                onValueChange={(value) => setMaxParticipants(value[0])}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-blue-400" />
                Cover Image
              </Label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-blue-500/50 transition-colors cursor-pointer">
                <ImageIcon className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                <p className="text-sm text-gray-400">Click to upload an image</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Button
          type="submit"
          onClick={handleSubmit}
          className="w-full gradient-button text-white font-medium py-6 rounded-xl"
        >
          Create Pod
        </Button>
      </DialogContent>
    </Dialog>
  )
}
