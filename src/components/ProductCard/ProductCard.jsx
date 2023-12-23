import styles from "./ProductCard.module.css";
import Button from "../Button/Button";
function ProductCard({ product }) {
  const handleAddToWishlist = () => {
    fetch(`http://localhost:3000/api/v1/product/${product.id}`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className={styles.product_card}>
      <div className={styles.product_img}>
        <img src={product.image} alt="Iphone" />
        <div className={styles.favicon}>
          <Button type="button" text="🤍" onClick={handleAddToWishlist} />
        </div>
        <div className={styles.carticon}>
          <Button type="button" text="🛒" />
        </div>
      </div>
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
    </div>
  );
}

export default ProductCard;
