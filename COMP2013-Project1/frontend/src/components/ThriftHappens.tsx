import ItemsContainer from "./ItemsContainer";
import { useEffect, useState, type SubmitEvent, type ChangeEvent } from "react";
import type { ClothingProduct } from "../data/data";
import CheckoutContainer from "./CheckoutContainer";
import axios from "axios";
import FormComponent from "./FormComponent";

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
  handleDeleteItem: (id: number) => void;
  handleEditItem: (id: number) => void;
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

export interface FormComponentProps {
  clothesArticle: ClothingProduct;
  responseMessage: string;
  handleOnSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  handleOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
}

export default function ThriftHappens() {
  const [products, setProducts] = useState<ClothingProduct[]>([]);
  const [itemQuantity, setItemQuantity] = useState<ItemQuantity[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItems[]>([]);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [clothesArticle, setClothesArticle] = useState<ClothingProduct>({
    id: -1,
    name: "",
    image: "",
    fit: "men",
    category: "hoodie",
    size: "M",
    color: "",
    description: "",
    price: 0,
    quantity: 0,
    itemQuantity: 0,
  });

  async function getProductsFromDB() {
    try {
      const { data } = await axios.get("http://localhost:3000/data");
      setProducts(
        data.sort((a: ClothingProduct, b: ClothingProduct) => b.id - a.id),
      );
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

  useEffect(() => {
    async function getProductsFromDB() {
      try {
        const { data } = await axios.get("http://localhost:3000/data");
        setProducts(
          data.sort((a: ClothingProduct, b: ClothingProduct) => b.id - a.id),
        );
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

  function handleOnChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    const numericFields = ["id", "price", "quantity", "itemQuantity"];

    setClothesArticle((prevArticle) => ({
      ...prevArticle,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  }

  async function handleOnSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    // if input on form is brand new, then use POST route to create new clothing article
    if (clothesArticle.id === -1) {
      try {
        await axios
          .post("http://localhost:3000/data", {
            ...clothesArticle,
            id: parseInt((Math.random() * 10000 + 50).toFixed(0)),
          })
          .then((response) => setResponseMessage(response.data.message));

        await getProductsFromDB();
        setClothesArticle({
          id: -1,
          name: "",
          image: "",
          fit: "men",
          category: "hoodie",
          size: "M",
          color: "",
          description: "",
          price: 0,
          quantity: 0,
          itemQuantity: 0,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios
          .patch(
            `http://localhost:3000/data/${clothesArticle.id}`,
            clothesArticle,
          )
          .then((response) => setResponseMessage(response.data.message))
          .then(() => getProductsFromDB());

        setClothesArticle({
          id: -1,
          name: "",
          image: "",
          fit: "men",
          category: "hoodie",
          size: "M",
          color: "",
          description: "",
          price: 0,
          quantity: 0,
          itemQuantity: 0,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleDeleteItem(id: number) {
    try {
      await axios
        .delete(`http://localhost:3000/data/${id}`)
        .then((response) => setResponseMessage(response.data.message))
        .then(() => getProductsFromDB());
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditItem(id: number) {
    const itemToEdit: ClothingProduct = products.find(
      (item) => item.id === id,
    ) || { ...clothesArticle };
    setClothesArticle({ ...itemToEdit });
  }

  return (
    <div>
      <CheckoutContainer
        checkoutItems={checkoutItems}
        handleRemoveFromCheckout={handleRemoveFromCheckout}
      />

      <FormComponent
        clothesArticle={clothesArticle}
        responseMessage={responseMessage}
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
      />

      <ItemsContainer
        products={products}
        itemQuantity={itemQuantity}
        handleItemQuantityChange={handleItemQuantityChange}
        handleAddToCheckout={handleAddToCheckout}
        handleDeleteItem={handleDeleteItem}
        handleEditItem={handleEditItem}
      />
    </div>
  );
}
