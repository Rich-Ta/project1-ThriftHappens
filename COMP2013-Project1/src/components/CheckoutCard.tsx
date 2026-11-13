import type { ClothingProduct } from "../data/data";

interface CheckoutCardProps {
  product: ClothingProduct;
  itemQuantity: number;
  handleRemoveFromCheckout: (productId: number) => void;
}

function CheckoutCard({ product, itemQuantity }: CheckoutCardProps) {
  return (
    <div className="checkout-card">
      <img src={product.image} alt={product.name} />
      <h5>{product.name}</h5>
      <div>
        <p>
          {product.color} | {product.fit} | {product.category} | {product.size}
        </p>
      </div>

      <p>{product.description}</p>
      <p>${product.price}.00</p>

      <p>Current Amount: {itemQuantity}</p>
      <button
        type="button"
        className="remove-button"
        onClick={() => {
          handleRemoveFromCheckout(product.id);
        }}
      >
        Remove
      </button>
    </div>
  );
}

export default CheckoutCard;
