"use client";

import { useGetAllCategory } from "@/hooks";
import { useGetProductsList } from "@/hooks/useGetProductList";
import { CartItem } from "@/types";
import { Product } from "@/types/product";
import { useState } from "react";
import { CartSummary } from "./cart-summary";
import { FoodSection } from "./food-section";
import { ItemSidebar } from "./item-sidebar";
import { NavigationTabs } from "./navigation-tabs";

export function FoodOrderingApp() {
  const [activeTab, setActiveTab] = useState<string>("category");
  const [cart, setCart] = useState<CartItem>({});
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: categories } = useGetAllCategory();
  const { data: products } = useGetProductsList({
    categorySlug: activeTab,
  });

  const addToCart = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const addToCartFromSidebar = (itemId: string, quantity: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + quantity,
    }));
  };

  const handleItemClick = (item: Product) => {
    setSelectedItem(item);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <div className="mx-auto min-h-screen max-w-md bg-white">
      <NavigationTabs
        data={categories?.data ?? []}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
        <div className="animate-in fade-in-0 slide-in-from-right-2 duration-300">
          <FoodSection
            title="Dành cho bạn"
            items={products?.data ?? []}
            onAddToCart={addToCart}
            onItemClick={handleItemClick}
          />
        </div>
      </div>

      <CartSummary cart={cart} />

      <ItemSidebar
        item={selectedItem}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onAddToCart={addToCartFromSidebar}
      />
    </div>
  );
}
