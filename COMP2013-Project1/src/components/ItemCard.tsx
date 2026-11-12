import { type ClothingProduct } from "../data/data";

interface ItemCardProps {
  product: ClothingProduct;
  itemQuantity: number;
  handleItemQuantityChange: (
    productId: number,
    updatedQuantity: number,
  ) => void;
}

function ItemCard({
  product,
  itemQuantity,
  handleItemQuantityChange,
}: ItemCardProps) {
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
              handleItemQuantityChange(product.id, itemQuantity - 1);
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
              handleItemQuantityChange(product.id, itemQuantity + 1);
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
