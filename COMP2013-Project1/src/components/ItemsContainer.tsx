import ItemCard from "./ItemCard";
import { type ClothingProduct } from "../data/data";

interface ItemsContainerProps {
  itemQuantity: ClothingProduct[];
  handleItemQuantityChange: (
    productId: number,
    updatedQuantity: number,
  ) => void;
}

function ItemsContainer({
  itemQuantity,
  handleItemQuantityChange,
}: ItemsContainerProps) {
  return (
    <div className="items-container">
      {itemQuantity.map((product) => (
        <ItemCard
          key={product.id}
          product={product}
          itemQuantity={product.itemQuantity}
          handleItemQuantityChange={handleItemQuantityChange}
        />
      ))}
    </div>
  );
}

export default ItemsContainer;
