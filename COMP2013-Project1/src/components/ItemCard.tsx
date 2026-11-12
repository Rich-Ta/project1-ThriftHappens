import { type ClothingProduct } from "../data/data";
import { useState } from "react";

interface ItemCardProps {
  product: ClothingProduct;
}

function ItemCard({ product }: ItemCardProps) {
  const [itemQuantity, setItemQuantity] = useState(0);

  return (
    <div className="item-card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <div>
        <p>
          {product.color} | {product.fit} | {product.category} | {product.size}
        </p>
      </div>
      <p>{product.description}</p>
      <h3>${product.price}</h3>
      <p>In stock: {product.quantity}</p>

      <div className="quantity-selector">
        <button
          type="button"
          className="minus"
          onClick={() => {
            if (itemQuantity > 0) {
              setItemQuantity(itemQuantity - 1);
            }
          }}
        >
          -
        </button>

        <h3>{itemQuantity}</h3>
        <button
          type="button"
          className="plus"
          onClick={() => {
            if (itemQuantity < product.quantity) {
              setItemQuantity(itemQuantity + 1);
            }
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
