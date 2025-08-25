"use client"

import { Button } from "@/components/ui/button"

interface AddToBasketButtonProps {
  totalPrice: number
  onAddToCart: () => void
}

export function AddToBasketButton({ totalPrice, onAddToCart }: AddToBasketButtonProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN")
  }

  return (
    <div className="p-4 border-t bg-white">
      <Button
        onClick={onAddToCart}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
      >
        Thêm vào giỏ hàng - {formatPrice(totalPrice)} đ
      </Button>
    </div>
  )
}
