import ItemCard from "./ItemCard";
import { type ClothingProduct } from "../data/data";
import type { ItemQuantity } from "./ThriftHappens";

interface ItemsContainerProps {
  products: ClothingProduct[];
  itemQuantity: ItemQuantity[];
  handleItemQuantityChange: (
    productId: number,
    delta: number,
    quantity: number,
  ) => void;
  handleAddToCheckout: (
    id: number,
    image: string,
    name: string,
    quantity: number,
    userQuantity: number,
    price: number,
  ) => void;
}

function ItemsContainer({
  products,
  itemQuantity,
  handleItemQuantityChange,
  handleAddToCheckout,
}: ItemsContainerProps) {
  return (
    <div className="items-container">
      {products.map((product) => {
        const selectedItem = itemQuantity.find(
          (item) => item.id === product.id,
        );

        if (!selectedItem) return null;

        return (
          <ItemCard
            key={product.id}
            product={product}
            userQuantity={selectedItem.userQuantity}
            remainQuantity={selectedItem.remainQuantity}
            handleItemQuantityChange={handleItemQuantityChange}
            handleAddToCheckout={handleAddToCheckout}
          />
        );
      })}
    </div>
  );
}

export default ItemsContainer;
