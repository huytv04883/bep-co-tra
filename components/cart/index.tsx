"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/stores";
import { Minus, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { cartList, getCartTotal, setCartList } = useCart();
  const cartTotal = getCartTotal() ?? 0;
  const { onRemoveCartById } = useCart();

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
          "fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 ease-in-out",
          {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen,
          }
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Giỏ đồ ăn</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <>
              {cartList.length === 0 ? (
                <>
                  <Image
                    src="/cart-empty.svg"
                    alt="Empty Cart"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                  <p className="text-center text-green-900">
                    Giỏ hàng của bạn đang trống.
                  </p>
                </>
              ) : (
                <>
                  {cartList.map((c) => (
                    <div key={c.id} className="flex items-start space-x-3">
                      <Image
                        src={c.images[0].url || "/placeholder.svg"}
                        alt={c.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{c.name}</h4>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-xs">Giá:</span>
                            <span className="font-medium text-xs">
                              {Number(c.price).toLocaleString("vi-VN")} đ
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-sm">Tổng:</span>
                            <span className="font-medium text-sm">
                              {(
                                Number(c.price) * (c.count ?? 1)
                              ).toLocaleString("vi-VN")}{" "}
                              đ
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0 bg-transparent"
                          onClick={() =>
                            setCartList(
                              cartList.map((item) =>
                                item.id === c.id
                                  ? { ...item, count: (item.count ?? 1) - 1 }
                                  : item
                              )
                            )
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-5 text-center font-medium">
                          {c.count}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0 bg-transparent"
                          onClick={() =>
                            setCartList(
                              cartList.map((item) =>
                                item.id === c.id
                                  ? { ...item, count: (item.count ?? 1) + 1 }
                                  : item
                              )
                            )
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 bg-transparent"
                          onClick={() => onRemoveCartById(c.id)}
                        >
                          <Trash2 className="h-4 w-4" color="red" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          </div>
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Tổng</span>
              <span className="font-medium">
                {cartTotal.toLocaleString("vi-VN")} đ
              </span>
            </div>
            <div className="flex justify-between items-center text-lg font-semibold border-t pt-4">
              <span>Tổng cộng</span>
              <span>{cartTotal.toLocaleString("vi-VN")} đ</span>
            </div>
            <Button
              disabled={cartList.length === 0}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Đặt hàng
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
