import Button from "../Button/Button";
import styles from "./CategoriesBar.module.css";
function CategoriesBar() {
  return (
    <div className={styles.categories_bar}>
      <div className={styles.categories}>
        <h4>Categories</h4>
        <p>Mobiles, Tablets, and Accessories</p>
        <p>Computers and Office Supplies</p>
        <p>TVs and Electronics</p>
        <p>Women's Fasion</p>
        <span>Show more ⬇</span>
      </div>
      <div>
        <h4>Customer Reviews</h4>
        <p>🌟🌟🌟🌟⭐ & Up</p>
        <p>🌟🌟🌟⭐⭐ & Up</p>
        <p>🌟🌟⭐⭐⭐ & Up</p>
        <p>🌟⭐⭐⭐⭐& Up</p>
      </div>
      <div>
        <h4>Price</h4>
        <p>100 to 200 EGP</p>
        <p>200 to 300 EGP</p>
        <p>300 to 400 EGP</p>
        <p>400 & above</p>
        <div className={styles.by_price_input}>
          <div>
            <input type="text" placeholder="MIN" />
            <label>EGP</label>
          </div>
          <div>
            <input type="text" placeholder="MAX" />
            <label>EGP</label>
          </div>
          <Button type="button" text="GO" />
        </div>
      </div>
    </div>
  );
}

export default CategoriesBar;
