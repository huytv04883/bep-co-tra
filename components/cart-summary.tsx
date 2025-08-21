"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartItem } from "@/types";

interface CartSummaryProps {
  cart: CartItem;
}

export function CartSummary({ cart }: CartSummaryProps) {
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
      <Card className="p-4 bg-green-500 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <span className="font-medium">
            {String(totalItems)} món trong giỏ
          </span>
          <Button variant="secondary" size="sm">
            Xem giỏ hàng
          </Button>
        </div>
      </Card>
    </div>
  );
}
