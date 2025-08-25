import { Product } from "@/types/product";
import { FoodItemCard } from "./food-item-card";

interface FoodSectionProps {
  title: string;
  items: Product[];
  showItemCount?: boolean;
  onAddToCart: (
    item: Product & {
      count?: number;
    }
  ) => void;
  onItemClick: (item: Product) => void;
}

const FoodSection = ({
  title,
  items,
  showItemCount = false,
  onAddToCart,
  onItemClick,
}: FoodSectionProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {showItemCount && (
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">{items.length}</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <FoodItemCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodSection;
