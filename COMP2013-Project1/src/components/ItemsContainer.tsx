import ItemCard from "./ItemCard";
import { products } from "../data/data";

function ItemsContainer() {
  return (
    <div className="items-container">
      {products.map((product) => (
        <ItemCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ItemsContainer;
