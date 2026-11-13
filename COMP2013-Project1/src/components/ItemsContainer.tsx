import ItemCard from "./ItemCard";
import { type ClothingProduct } from "../data/data";

interface ItemsContainerProps {
  itemQuantity: ClothingProduct[];
  handleItemQuantityChange: (
    productId: number,
    updatedQuantity: number,
  ) => void;
  handleAddToCheckout: (productId: number) => void;
}

function ItemsContainer({
  itemQuantity,
  handleItemQuantityChange,
  handleAddToCheckout,
}: ItemsContainerProps) {
  return (
    <div className="items-container">
      {itemQuantity.map((product) => (
        <ItemCard
          key={product.id}
          product={product}
          itemQuantity={product.itemQuantity}
          handleItemQuantityChange={handleItemQuantityChange}
          handleAddToCheckout={handleAddToCheckout}
        />
      ))}
    </div>
  );
}

export default ItemsContainer;
