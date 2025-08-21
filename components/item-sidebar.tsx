"use client";

import { Product } from "@/types/product";
import { useState } from "react";
import { AddToBasketButton } from "./sidebar/add-to-basket-button";
import { ItemDetails } from "./sidebar/item-details";
import { ItemSidebarHeader } from "./sidebar/item-sidebar-header";
import { QuantityControls } from "./sidebar/quantity-controls";
import { SpecialInstructions } from "./sidebar/special-instructions";
import { cn } from "@/lib/utils";

interface ItemSidebarProps {
  item: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    itemId: string,
    quantity: number,
    specialInstructions: string
  ) => void;
}

export function ItemSidebar({
  item,
  isOpen,
  onClose,
  onAddToCart,
}: ItemSidebarProps) {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const handleAddToCart = () => {
    if (item) {
      onAddToCart(item.id, quantity, specialInstructions);
      onClose();
      setQuantity(1);
      setSpecialInstructions("");
    }
  };

  const totalPrice = item ? Number(item.price) * quantity : 0;

  if (!item) return null;

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          {
            "opacity-100": isOpen,
            "opacity-0 pointer-events-none": !isOpen,
          }
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col justify-between",
          {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen,
          }
        )}
      >
        <div className="flex flex-col gap-4">
          <ItemSidebarHeader onClose={onClose} />
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <ItemDetails item={item} />

            <SpecialInstructions
              value={specialInstructions}
              onChange={setSpecialInstructions}
            />
            <QuantityControls
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </div>
        </div>
        <AddToBasketButton
          totalPrice={totalPrice}
          onAddToCart={handleAddToCart}
        />
      </div>
    </>
  );
}
