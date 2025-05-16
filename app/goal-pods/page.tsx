"use client";

import { GoalPodsScreen } from "@/components/goal-pods-screen";
import { ProtectedRoute } from "@/components/aptos/ProtectedRoute";

export default function GoalPods() {
  return (
    <ProtectedRoute>
      <GoalPodsScreen />
    </ProtectedRoute>
  );
}
