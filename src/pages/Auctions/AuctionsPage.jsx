import CategoriesBar from "../../components/CategoriesBar/CategoriesBar";
import ProductsList from "../../components/ProductsList/ProductsList";
import styles from "./AuctionsPage.module.css";
function AuctionsPage() {
  return (
    <div className={styles.auctions_page}>
      <CategoriesBar />
      <div className={styles.all_products}>
        <ProductsList />
      </div>
    </div>
  );
}

export default AuctionsPage;
