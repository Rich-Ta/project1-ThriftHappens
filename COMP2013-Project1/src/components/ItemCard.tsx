import {
  type ClothingCategory,
  type ClothingSize,
  type Fit,
  type ClothingProduct,
} from "../data/data";

interface ItemCardProps {
  fit: Fit;
  clothingCategory: ClothingCategory;
  size: ClothingSize;
  product: ClothingProduct;
}

function ItemCard({ product }: ItemCardProps) {
  return (
    <div className="item-card">
      {product.image}
      <h2>{product.name}</h2>
      <div>
        <p>
          {product.color} | {product.fit} | {product.category} | {product.size}
        </p>
      </div>
      <p>{product.description}</p>
      <h3>{product.price}</h3>
      <p>In stock: {product.quantity}</p>
    </div>
  );
}

export default ItemCard;
