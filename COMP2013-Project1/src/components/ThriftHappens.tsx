import ItemsContainer from "./ItemsContainer";
import { products } from "../data/data";
import { useState } from "react";
import type { ClothingProduct } from "../data/data";
import CheckoutContainer from "./CheckoutContainer";

function ThriftHappens() {
  const [itemQuantity, setItemQuantity] = useState(products);
  const [checkoutItems, setCheckoutItems] = useState<ClothingProduct[]>([]);

  function handleRemoveFromCheckout(productId: number) {
    const itemToRemove = checkoutItems.find(
      (product) => product.id === productId,
    );

    if (itemToRemove) {
      const updatedCheckout = checkoutItems.filter(
        (product) => product.id !== productId,
      );
      setCheckoutItems(updatedCheckout);

      const updatedInventory = itemQuantity.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: product.quantity + itemToRemove.itemQuantity,
            }
          : product,
      );

      setItemQuantity(updatedInventory);
    }
  }

  function handleAddToCheckout(productId: number) {
    const selectedItems = itemQuantity.filter(
      // for selectedItems before checkout

      (product) => product.itemQuantity > 0,
    );
    const item = selectedItems.find((product) => product.id === productId); //for each individual item

    if (!item || item.itemQuantity <= 0) {
      return;
    }

    if (item.itemQuantity > item.quantity) {
      return;
    }

    const existingItem = checkoutItems.find(
      (product) => product.id === productId,
    );

    if (existingItem) {
      const updatedCheckout = checkoutItems.map((product) =>
        product.id === productId
          ? {
              ...product,
              itemQuantity: product.itemQuantity + item.itemQuantity,
            }
          : product,
      );

      setCheckoutItems(updatedCheckout);
    } else {
      setCheckoutItems([...checkoutItems, { ...item }]);
    }

    const updatedProducts = itemQuantity.map((product) =>
      product.id === productId
        ? {
            ...product,
            quantity: product.quantity - product.itemQuantity,
            itemQuantity: 0,
          }
        : product,
    );

    setItemQuantity(updatedProducts);
  }

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
        handleAddToCheckout={handleAddToCheckout}
      />

      <CheckoutContainer
        checkoutItems={checkoutItems}
        handleRemoveFromCheckout={handleRemoveFromCheckout}
      />
    </div>
  );
}

export default ThriftHappens;
