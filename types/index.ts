export interface FoodItem {
  id: string
  name: string
  price: number
  image: string
}

export interface CartItem {
  [itemId: string]: number
}

export type TabType = "foryou" | "tea"
