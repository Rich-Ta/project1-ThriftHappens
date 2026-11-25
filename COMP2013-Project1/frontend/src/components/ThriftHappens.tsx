import ItemsContainer from "./ItemsContainer";
import { useEffect, useState } from "react";
import type { ClothingProduct } from "../data/data";
import CheckoutContainer from "./CheckoutContainer";
import axios from "axios";

export interface ItemsContainerProps {
  products: ClothingProduct[];
  itemQuantity: ItemQuantity[];
  handleQuantityItemChange: (
    id: number,
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

export interface ItemQuantity {
  id: number;
  userQuantity: number;
  remainQuantity: number;
}

export interface CheckoutItems {
  id: number;
  name: string;
  price: number;
  userQuantity: number;
  quantity: number;
  image: string;
}

export interface CheckoutContainerProps {
  checkoutItems: CheckoutItems[];
  checkoutTotal: number;
  handleRemoveFromCheckout: (id: number) => void;
  handleEmptyCheckout: () => void;
}

export default function ThriftHappens() {
  const [products, setProducts] = useState<ClothingProduct[]>([]);
  const [itemQuantity, setItemQuantity] = useState<ItemQuantity[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItems[]>([]);

  useEffect(() => {
    async function getProductsFromDB() {
      try {
        const { data } = await axios.get("http://localhost:3000/data");
        setProducts(data);
        setItemQuantity(
          data.map((product: ClothingProduct) => ({
            id: product.id,
            userQuantity: 0,
            remainQuantity: product.quantity,
          })),
        );
      } catch (error) {
        console.log(error);
      }
    }

    getProductsFromDB();
  }, []);

  //Handler for when user removes item from checkout
  function handleRemoveFromCheckout(productId: number) {
    const itemToRemove = checkoutItems.find(
      (product) => product.id === productId,
    );

    if (!itemToRemove) return;

    setCheckoutItems(
      checkoutItems.filter((product) => product.id !== productId),
    );

    setItemQuantity((prevItems) =>
      prevItems.map((product) =>
        product.id === productId
          ? {
              ...product,
              remainQuantity:
                product.remainQuantity + itemToRemove.userQuantity,
            }
          : product,
      ),
    );
  }

  //handler when user adds selected item to the checkout container

  function handleAddToCheckout(
    id: number,
    image: string,
    name: string,
    quantity: number,
    userQuantity: number,
    price: number,
  ) {
    if (userQuantity <= 0) return;

    setCheckoutItems((prevCheckout) => {
      const exists = prevCheckout.some((item) => item.id === id);

      if (exists) {
        return prevCheckout.map((item) =>
          item.id === id
            ? { ...item, userQuantity: item.userQuantity + userQuantity }
            : item,
        );
      }

      return [
        ...prevCheckout,
        { id, image, name, quantity, userQuantity, price },
      ];
    });

    setItemQuantity((prevItems) =>
      prevItems.map((prev) =>
        prev.id === id
          ? {
              ...prev,
              userQuantity: 0,
              remainQuantity: prev.remainQuantity - prev.userQuantity,
            }
          : prev,
      ),
    );
  }

  //Handler for when user clicks plus or minus button

  function handleItemQuantityChange(
    productId: number,
    delta: number,
    quantity: number,
  ) {
    const updatedItems = itemQuantity.map((product) =>
      product.id === productId
        ? {
            ...product,
            userQuantity:
              product.userQuantity + delta <= quantity &&
              product.userQuantity + delta >= 0
                ? product.userQuantity + delta
                : product.userQuantity,
          }
        : product,
    );

    setItemQuantity(updatedItems);
  }
  return (
    <div>
      <CheckoutContainer
        checkoutItems={checkoutItems}
        handleRemoveFromCheckout={handleRemoveFromCheckout}
      />

      <ItemsContainer
        products={products}
        itemQuantity={itemQuantity}
        handleItemQuantityChange={handleItemQuantityChange}
        handleAddToCheckout={handleAddToCheckout}
      />
    </div>
  );
}
