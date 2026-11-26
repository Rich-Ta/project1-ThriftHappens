import type { CheckoutItems } from "./ThriftHappens";

interface CheckoutCardProps {
  product: CheckoutItems;
  itemQuantity: number;
  handleRemoveFromCheckout: (productId: number) => void;
}

function CheckoutCard({
  product,
  itemQuantity,
  handleRemoveFromCheckout,
}: CheckoutCardProps) {
  return (
    <div className="checkout-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>

      <div className="subtotal-box">
        <h3>Subtotal: ${(itemQuantity * product.price).toFixed(2)}</h3>

        <p>Quantity: {itemQuantity}</p>
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
    </div>
  );
}

export default CheckoutCard;
