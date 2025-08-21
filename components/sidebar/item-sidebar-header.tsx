"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ItemSidebarHeaderProps {
  onClose: () => void
}

export function ItemSidebarHeader({ onClose }: ItemSidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="text-lg font-semibold text-gray-900">Chi tiết món</h2>
      <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 hover:bg-gray-100">
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
