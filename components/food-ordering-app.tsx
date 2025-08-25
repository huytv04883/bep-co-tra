"use client";

import { useGetAllCategory } from "@/hooks";
import { useGetProductsList } from "@/hooks/useGetProductList";
import { useCart } from "@/stores";
import { Product } from "@/types/product";
import { lazy, useEffect, useState } from "react";
const CartSidebar = lazy(() => import("./cart/index"));
const AppHeader = lazy(() => import("./header"));
const NavigationTabs = lazy(() => import("./navigation-tabs"));
const FoodSection = lazy(() => import("./food-section"));
const DetailProductSidebar = lazy(() => import("./item-sidebar"));

export function FoodOrderingApp() {
  const [mounted, setMounted] = useState(false);

  const [activeTab, setActiveTab] = useState<string>("category");
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartList, setCartList } = useCart();
  const { data: categories } = useGetAllCategory();
  const { data: products } = useGetProductsList({
    categorySlug: activeTab,
  });

  const handleAddToCart = (item: Product & {
    count?: number;
  }) => {
    setCartList([
      ...cartList,
      {
        id: item.id,
        name: item.name,
        price: item.price,
        images: item.images,
        count: item.count,
      },
    ]);
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="mx-auto min-h-screen max-w-md bg-white">
      <AppHeader openCart={() => setIsCartOpen(true)} />
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
            onAddToCart={handleAddToCart}
            onItemClick={handleItemClick}
          />
        </div>
      </div>
      <DetailProductSidebar
        item={selectedItem}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onAddToCart={handleAddToCart}
      />
      <CartSidebar isOpen={isCartOpen} onClose={handleCloseCart} />
    </main>
  );
}
