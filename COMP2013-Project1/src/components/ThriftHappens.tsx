import ItemsContainer from "./ItemsContainer";
import { products } from "../data/data";
import { useState } from "react";

function ThriftHappens() {
  const [itemQuantity, setItemQuantity] = useState(products);

  function handleItemQuantityChange(
    productId: number,
    updatedQuantity: number,
  ) {
    const updatedItems = itemQuantity.map((product) =>
      product.id === productId
        ? { ...product, itemQuantity: updatedQuantity }
        : product,
    );

    setItemQuantity(updatedItems);
  }
  return (
    <div>
      <ItemsContainer
        itemQuantity={itemQuantity}
        handleItemQuantityChange={handleItemQuantityChange}
      />
    </div>
  );
}

export default ThriftHappens;
