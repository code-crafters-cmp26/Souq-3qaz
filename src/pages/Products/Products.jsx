import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Products.module.css";
function Products() {
  return (
    <div className={styles.products}>
      <ProductCard />
    </div>
  );
}

export default Products;
