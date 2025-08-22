"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/stores";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartTotal, cartList } = useCart();
  if (cartList.length === 0) return null;
  
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Giỏ đồ ăn</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-4 border-b">
            <h3 className="font-medium">Báo Đăng - Cơm Chiên, Mì Xào</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
              <span>Thời gian giao: 15 phút (Cách bạn 1,5 km)</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartList.map((c) => (
              <div key={c.id} className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full bg-transparent"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{c.count}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Item Info */}
                <Image
                  src={c.images[0].url || "/placeholder.svg"}
                  alt={c.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{c.name}</h4>
                </div>
                <div className="text-right">
                  <span className="font-medium">
                    {(Number(c.price) * (c.count ?? 1)).toLocaleString("vi-VN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Tổng</span>
              <span className="font-medium">
                {cartTotal.toLocaleString("vi-VN")} đ
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Delivery Fee will be shown after you review order
            </div>
            <div className="flex justify-between items-center text-lg font-semibold border-t pt-4">
              <span>Tổng cộng</span>
              <span>{cartTotal.toLocaleString("vi-VN")} đ</span>
            </div>
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
              Đăng nhập để đặt đơn
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
