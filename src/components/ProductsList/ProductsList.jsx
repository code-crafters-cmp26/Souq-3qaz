import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsList.module.css";
function ProductsList() {
  return (
    <div className={styles.products_list}>
      <div>
        <ProductCard />
      </div>
      <div>
        <ProductCard />
      </div>
      <div>
        <ProductCard />
      </div>
      <div>
        <ProductCard />
      </div>
      <div>
        <ProductCard />
      </div>
      <div>
        <ProductCard />
      </div>
      <div>
        <ProductCard />
      </div>
      <div>
        <ProductCard />
      </div>
    </div>
  );
}

export default ProductsList;
