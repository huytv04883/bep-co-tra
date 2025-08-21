"use client";

import { Card } from "@/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";

interface ItemDetailsProps {
  item: Product;
}

export function ItemDetails({ item }: ItemDetailsProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN");
  };

  return (
    <Card className="p-4 border-0 bg-gray-50">
      <div className="flex gap-4">
        <Image
          src={item.images[0]?.url || "/placeholder.svg"}
          alt={item.name}
          width={80}
          height={80}
          className="w-full h-full object-cover"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-lg mb-2">
          {item.name}
        </h3>
        <p className="text-green-600 font-bold text-lg">
          {formatPrice(Number(item.price))}
        </p>
      </div>
    </Card>
  );
}
