import CategoriesBar from "../../components/CategoriesBar/CategoriesBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Products.module.css";
function Products() {
  return (
    <div className={styles.products}>
      <CategoriesBar />
      <div className={styles.products_list}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}

export default Products;
