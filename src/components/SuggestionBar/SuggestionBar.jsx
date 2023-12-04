import styles from "./SuggestionBar.module.css";
import ProductCard from "../ProductCard/ProductCard";
function SuggestionBar() {
  return (
    <div className={styles.suggestion_bar}>
      <div className={styles.product}>
        <ProductCard />
      </div>
      <div className={styles.product}>
        <ProductCard />
      </div>
      <div className={styles.product}>
        <ProductCard />
      </div>
      <div className={styles.product}>
        <ProductCard />
      </div>
      <div className={styles.product}>
        <ProductCard />
      </div>
      <div className={styles.product}>
        <ProductCard />
      </div>
      <div className={styles.product}>
        <ProductCard />
      </div>
      <div className={styles.product}>
        <ProductCard />
      </div>
      <div className={styles.product}>
        <ProductCard />
      </div>
      <div className={styles.product}>
        <ProductCard />
      </div>
    </div>
  );
}

export default SuggestionBar;
