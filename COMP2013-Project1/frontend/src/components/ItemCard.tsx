import { type ClothingProduct } from "../data/data";

interface ItemCardProps {
  product: ClothingProduct;
  userQuantity: number;
  remainQuantity: number;
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
  handleDeleteItem: (id: number) => void;
  handleEditItem: (id: number) => void;
}

function ItemCard({
  product,
  userQuantity,
  remainQuantity,
  handleItemQuantityChange,
  handleAddToCheckout,
  handleDeleteItem,
  handleEditItem,
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
      <h3>Price: ${product.price.toFixed(2)} each</h3>
      <p>
        In stock: {remainQuantity}{" "}
        {remainQuantity === 0 ? "(Out of Stock)" : ""}
      </p>

      <div className="quantity-selector">
        <button
          type="button"
          className="button"
          onClick={() => {
            handleItemQuantityChange(product.id, -1, remainQuantity);
          }}
          disabled={userQuantity === 0}
        >
          -
        </button>

        <h4>Item(s) selected: {userQuantity}</h4>
        <button
          type="button"
          className="button"
          onClick={() => {
            handleItemQuantityChange(product.id, 1, remainQuantity);
          }}
          disabled={remainQuantity === 0 || userQuantity >= remainQuantity}
        >
          +
        </button>

        <button
          type="button"
          className="button"
          onClick={() => {
            handleAddToCheckout(
              product.id,
              product.image,
              product.name,
              product.quantity,
              userQuantity,
              product.price,
            );
          }}
          disabled={userQuantity === 0}
        >
          Add to Checkout
        </button>
      </div>
      <div>
        <button onClick={() => handleEditItem(product.id)}>Edit</button>
        <button onClick={() => handleDeleteItem(product.id)}>Delete</button>
      </div>
    </div>
  );
}

export default ItemCard;
