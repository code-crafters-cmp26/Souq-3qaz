import styles from "./ProductCard.module.css";
import Button from "../Button/Button";
function ProductCard() {
  return (
    <div className={styles.product_card}>
      <div className={styles.product_img}>
        <img src="./src/components/ProductCard/Iphone.jpeg" alt="Iphone" />
        <div className={styles.favicon}>
          <Button type="button" text="🤍" />
        </div>
        <div className={styles.carticon}>
          <Button type="button" text="🛒" />
        </div>
      </div>
      <div className={styles.product_description}>
        <p>4.5 🌟🌟🌟🌟⭐</p>
        <h4>Iphone 20 This Is The Best </h4>
        <h4>Iphone In The World...</h4>
        <p>
          EGP <span>25,700</span>
        </p>
        <label>⬇ Lowest price in 7 days</label>
      </div>
    </div>
  );
}

export default ProductCard;
