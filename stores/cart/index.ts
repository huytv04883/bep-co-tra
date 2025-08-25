import { Product } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartStore = Pick<Product, "images" | "id" | "name" | "price"> & {
  count?: number;
};

type CartStateStore = {
  cartList: CartStore[];
  getCartCount: () => void;
  getCartTotal: () => void;
  setCartList: (list: CartStore[]) => void;
  onRemoveCartById: (id: string) => void;
  onRemoveAll: () => void;
};

export const useCart = create(
  persist<CartStateStore>(
    (set, get) => ({
      cartList: [],
      onRemoveAll: () => {
        set({ cartList: [] });
      },
      onRemoveCartById: (id: string) => {
        set((state) => ({
          cartList: state.cartList.filter((item) => item.id !== id),
        }));
      },
      getCartTotal: () => {
        return get().cartList.reduce(
          (total, item) => total + Number(item.price) * (item.count ?? 1),
          0
        ) as number;
      },
      getCartCount: () => {
        return get().cartList.reduce(
          (count, item) => count + (item.count ?? 1),
          0
        ) as number;
      },
      setCartList: (cart: CartStore[]) => {
        set((state) => {
          const cartUpdate: CartStore[] = [];
          cart.forEach((item) => {
            const existing = cartUpdate.find((i) => i.id === item.id);
            if (existing) {
              existing.count = (existing.count ?? 1) + (item.count ?? 1);
            } else {
              cartUpdate.push({ ...item, count: item.count ?? 1 });
            }
          });
          return {
            ...state,
            cartList: cartUpdate,
          };
        });
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cartList: state.cartList } as CartStateStore),
    }
  )
);
