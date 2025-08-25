"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/types/product";
import { Plus } from "lucide-react";
import Image from "next/image";

interface FoodItemCardProps {
  item: Product;
  onAddToCart: (item: Product & {
    count?: number;
  }) => void;
  onItemClick: (item: Product) => void;
}

export function FoodItemCard({
  item,
  onAddToCart,
  onItemClick,
}: FoodItemCardProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN");
  };

  return (
    <Card className="p-4 bg-white shadow-sm border-0 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]">
      <div
        className="flex items-center gap-3"
        onClick={() => onItemClick(item)}
      >
        <div className="grid grid-cols-[64px_1fr] items-center gap-3cursor-pointer overflow-hidden rounded-2xl">
          <Image
            src={item.images[0]?.url || "/placeholder.svg"}
            alt={item.name}
            width={64}
            height={64}
            className="w-16 h-16 object-cover transition-opacity duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">
            {item.name}
          </h3>
          <p className="text-gray-900 font-semibold text-sm">
            {formatPrice(Number(item.price))}
          </p>
        </div>
      </div>
      <Button
        onClick={() => onAddToCart(item)}
        size="sm"
        className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-white p-0 flex-shrink-0 transition-all duration-200 hover:scale-110 active:scale-95 active:animate-pulse"
      >
        <Plus className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
      </Button>
    </Card>
  );
}
