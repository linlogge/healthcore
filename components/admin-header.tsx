"use client"

import { useAuth } from "@/lib/auth-context"
import type { Doctor } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Heart, LogOut } from "lucide-react"

interface AdminHeaderProps {
  doctor: Doctor
}

export function AdminHeader({ doctor }: AdminHeaderProps) {
  const { logout } = useAuth()

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
            <Heart className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Admin Portal</h1>
            <p className="text-sm text-muted-foreground">{doctor.institution}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </header>
  )
}
