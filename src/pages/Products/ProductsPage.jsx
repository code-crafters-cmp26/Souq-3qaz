import CategoriesBar from "../../components/CategoriesBar/CategoriesBar";
import ProductsList from "../../components/ProductsList/ProductsList";
import styles from "./ProductsPage.module.css";
function ProductsPage() {
  return (
    <div className={styles.products_page}>
      <CategoriesBar />
      <ProductsList />
    </div>
  );
}

export default ProductsPage;
