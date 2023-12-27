import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsList.module.css";
function ProductsList({ products, category }) {
  console.log(category);
  const filteredProducts = category
    ? products?.filter((product) => product.category === category)
    : products;
  return (
    <div className={styles.products_list}>
      {filteredProducts?.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
