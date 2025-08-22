import { Product } from "@/types/product";
import { create } from "zustand";

export type CartStore = Pick<Product, "images" | "id" | "name" | "price"> & {
  count?: number;
};

type CartStateStore = {
  cartTotal: number;
  cartCount: number;
  cartList: CartStore[];
};

export const useCart = create<
  CartStateStore & {
    setCartTotal: (total: number) => void;
    getCartTotal: () => void;
    setCartList: (list: CartStore[]) => void;
  }
>((set) => ({
  cartTotal: 0,
  cartCount: 0,
  cartList: [],

  getCartTotal: () => {
    set((state) => ({
      ...state,
      cartTotal: state.cartList.reduce(
        (total, item) => total + Number(item.price) * (item.count ?? 1),
        0
      ),
    }));
  },

  setCartTotal: (total: number) => {
    set((state) => ({
      ...state,
      cartTotal: total,
    }));
  },

  setCartCount: (count: number) => {
    set((state) => ({
      ...state,
      cartCount: count,
    }));
  },

  setCartList: (cart: CartStore[]) => {
    set(() => {
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
        cartList: cartUpdate,
      };
    });
  },
}));
