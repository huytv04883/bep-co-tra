"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Minus, Plus } from "lucide-react"

interface QuantityControlsProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
}

export function QuantityControls({ quantity, onQuantityChange }: QuantityControlsProps) {
  const handleDecrease = () => {
    onQuantityChange(Math.max(1, quantity - 1))
  }

  const handleIncrease = () => {
    onQuantityChange(quantity + 1)
  }

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-gray-700">Quantity</Label>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className="h-10 w-10 rounded-full border-gray-300 hover:border-green-500 hover:text-green-600 bg-transparent"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-xl font-semibold text-gray-900 min-w-[2rem] text-center">{quantity}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleIncrease}
          className="h-10 w-10 rounded-full border-gray-300 hover:border-green-500 hover:text-green-600 bg-transparent"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
