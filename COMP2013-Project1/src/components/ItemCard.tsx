import { type ClothingProduct } from "../data/data";

interface ItemCardProps {
  product: ClothingProduct;
  itemQuantity: number;
  handleItemQuantityChange: (
    productId: number,
    updatedQuantity: number,
  ) => void;
  handleAddToCheckout: (productId: number) => void;
}

function ItemCard({
  product,
  itemQuantity,
  handleItemQuantityChange,
  handleAddToCheckout,
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
      <h3>${product.price}.00</h3>
      <p>
        In stock: {product.quantity}{" "}
        {product.quantity === 0 ? "(Out of Stock)" : ""}
      </p>

      <div className="quantity-selector">
        <button
          type="button"
          className="minus-button"
          onClick={() => {
            if (itemQuantity > 0) {
              handleItemQuantityChange(product.id, itemQuantity - 1);
            }
          }}
        >
          -
        </button>

        <h4>Item(s) selected: {itemQuantity}</h4>
        <button
          type="button"
          className="plus-button"
          onClick={() => {
            if (itemQuantity < product.quantity) {
              handleItemQuantityChange(product.id, itemQuantity + 1);
            }
          }}
          disabled={product.quantity === 0}
        >
          +
        </button>

        <button
          type="button"
          className="confirm-button"
          onClick={() => {
            handleAddToCheckout(product.id);
          }}
        >
          Add to Checkout
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
