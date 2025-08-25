"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/stores";
import { ShoppingCart } from "lucide-react";

type AppHeaderProps = {
  openCart: () => void;
};

const AppHeader = ({ openCart }: AppHeaderProps) => {
  const { getCartTotal, getCartCount } = useCart();
  const cartTotal = getCartTotal() ?? 0;
  const cartCount = getCartCount() ?? 0;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-green-600">
              BEP<span className="text-green-500">COTRA</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => openCart()}
              variant="default"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 relative"
            >
              <ShoppingCart className="h-4 w-3" />
              {cartTotal > 0 && `${cartTotal.toLocaleString("vi-VN")} đ`}
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
