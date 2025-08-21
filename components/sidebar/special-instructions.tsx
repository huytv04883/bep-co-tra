"use client"

import { Label } from "@/components/ui/label"
import { Input } from "../ui/input"

interface SpecialInstructionsProps {
  value: string
  onChange: (value: string) => void
}

export function SpecialInstructions({ value, onChange }: SpecialInstructionsProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="instructions" className="text-sm font-medium text-gray-700">
        Special instructions <span className="text-gray-400 font-normal">Optional</span>
      </Label>
      <Input
        id="instructions"
        placeholder="E.g. No onions please"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-gray-200 focus:border-green-500 focus:ring-green-500"
      />
    </div>
  )
}
