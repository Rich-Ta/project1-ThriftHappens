import type { CheckoutItems } from "./ThriftHappens";
import CheckoutCard from "./CheckoutCard";

interface CheckoutContainerProps {
  checkoutItems: CheckoutItems[];
  handleRemoveFromCheckout: (productId: number) => void;
}

function CheckoutContainer({
  checkoutItems,
  handleRemoveFromCheckout,
}: CheckoutContainerProps) {
  //calculating total
  const total = checkoutItems.reduce(
    (total, product) => total + product.price * product.userQuantity,
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
            itemQuantity={product.userQuantity}
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
