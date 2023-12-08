import CategoriesBar from "../../components/CategoriesBar/CategoriesBar";
import ProductsList from "../../components/ProductsList/ProductsList";
import styles from "./ProductsPage.module.css";
function ProductsPage() {
  return (
    <div className={styles.products_page}>
      <CategoriesBar />
      <div className={styles.all_products}>
        <ProductsList />
      </div>
    </div>
  );
}

export default ProductsPage;
