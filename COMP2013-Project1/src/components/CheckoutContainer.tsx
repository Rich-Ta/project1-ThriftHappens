import type { ClothingProduct } from "../data/data";
import CheckoutCard from "./CheckoutCard";

interface CheckoutContainerProps {
  checkoutItems: ClothingProduct[];
  handleRemoveFromCheckout: (productId: number) => void;
}

function CheckoutContainer({
  checkoutItems,
  handleRemoveFromCheckout,
}: CheckoutContainerProps) {
  const total = checkoutItems.reduce(
    (total, product) => total + product.price * product.itemQuantity,
    0,
  );

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-items">
        {checkoutItems.map((product) => (
          <CheckoutCard
            key={product.id}
            product={product}
            itemQuantity={product.itemQuantity}
            handleRemoveFromCheckout={handleRemoveFromCheckout}
          />
        ))}
      </div>

      <div className="empty-cart">
        {checkoutItems.length === 0 ? <p>Cart is empty</p> : null}
      </div>

      <div className="total-amount">
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default CheckoutContainer;
