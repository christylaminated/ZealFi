"use client";

import { ProfileScreen } from "@/components/profile-screen";
import { ProtectedRoute } from "@/components/aptos/ProtectedRoute";

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileScreen />
    </ProtectedRoute>
  );
}
