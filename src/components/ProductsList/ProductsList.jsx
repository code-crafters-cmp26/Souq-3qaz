import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsList.module.css";
function ProductsList({ products, category, min, max }) {
  console.log(category);
  const filteredProducts = category
    ? products?.filter((product) => product.category === category)
    : products;

  const filteredpricedProducts =
    min && max
      ? filteredProducts?.filter(
          (product) => product.price >= min && product.price <= max
        )
      : filteredProducts;
  return (
    <div className={styles.products_list}>
      {filteredpricedProducts
        ?.filter((product) => product.quantity >= 0)
        .map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
    </div>
  );
}

export default ProductsList;
