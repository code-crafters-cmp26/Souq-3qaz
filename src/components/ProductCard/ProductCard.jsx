import styles from "./ProductCard.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
function ProductCard({ product }) {
  return (
    <div className={styles.product_card}>
      <div className={styles.product_img}>
        <Link to={`${product.id}`}>
          <img src={product.image} alt="Iphone" />
        </Link>

        <div className={styles.favicon}>
          <Button type="button" text="🤍" />
        </div>
        <div className={styles.carticon}>
          <Button type="button" text="🛒" />
        </div>
      </div>
      <Link to={`${product.id}`}>
        <div className={styles.product_description}>
          <p>4.5 🌟🌟🌟🌟⭐</p>
          <h4>{product.name}</h4>
          <h4>{product.description}</h4>
          <p>EGP {product.price}</p>
          <label>
            Available{" "}
            <span
              style={{ color: product.quantity > 0 ? "rgb(0, 174, 0)" : "red" }}
            >
              {product.quantity}
            </span>{" "}
            in stock.
          </label>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
