"use client";

import { useGetAllCategory } from "@/hooks";
import { useGetProductsList } from "@/hooks/useGetProductList";
import { CartItem } from "@/types";
import { Product } from "@/types/product";
import { useState } from "react";
import { CartSummary } from "./cart-summary";
import { FoodSection } from "./food-section";
import { AppHeader } from "./header";
import { ItemSidebar } from "./item-sidebar";
import { NavigationTabs } from "./navigation-tabs";
import { useCart } from "@/stores";
import { CartSidebar } from "./cart";

export function FoodOrderingApp() {
  const [activeTab, setActiveTab] = useState<string>("category");
  const [cart, setCart] = useState<CartItem>({});
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartList, setCartList } = useCart();
  const { data: categories } = useGetAllCategory();
  const { data: products } = useGetProductsList({
    categorySlug: activeTab,
  });

  const cartTotal = Object.entries(cart).reduce((total, [itemId, quantity]) => {
    const allItems = products?.data ?? [];
    const item = allItems.find((item) => item.id === itemId);
    if (!item) return total;
    const price = parseFloat(item.price);
    const qty = Number(quantity);
    return total + (isNaN(price) || isNaN(qty) ? 0 : price * qty);
  }, 0);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const addToCart = (item: Product) => {
    setCartList([
      ...cartList,
      {
        id: item.id,
        name: item.name,
        price: item.price,
        images: item.images
      },
    ]);
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

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="mx-auto min-h-screen max-w-md bg-white">
      <AppHeader cartTotal={cartTotal} cartCount={cartCount} />
      <NavigationTabs
        data={categories?.data ?? []}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
        <div className="animate-in fade-in-0 slide-in-from-right-2 duration-300">
          <FoodSection
            title={
              categories?.data?.find((cat) => cat.slug === activeTab)?.name ||
              "Dành cho bạn"
            }
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
      <CartSidebar
        isOpen={isCartOpen}
        onClose={handleCloseCart}
      />
    </div>
  );
}
