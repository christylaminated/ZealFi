"use client";

import { LeaderboardScreen } from "@/components/leaderboard-screen";
import { ProtectedRoute } from "@/components/aptos/ProtectedRoute";

export default function Leaderboard() {
  return (
    <ProtectedRoute>
      <LeaderboardScreen />
    </ProtectedRoute>
  );
}
