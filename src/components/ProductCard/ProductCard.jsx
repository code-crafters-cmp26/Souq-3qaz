import styles from "./ProductCard.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
function ProductCard({ product }) {
  const { userType } = useAuth();
  const handleAddToWishlist = () => {
    fetch(`https://my-backend-2l7i.onrender.com/api/v1/product/${product.id}`, {
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
        if (
          data.message ==
          `duplicate key value violates unique constraint "pk_wishlist"`
        )
          alert("You already have this product in your wishlist");
        else if (data.status != "success") alert(data.message);
        else alert("Youa added this product to your wishlist");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className={styles.product_card}>
      <div className={styles.product_img}>
        <Link to={`/products/${product?.id}`}>
          <img src={product?.image} alt="Iphone" />
        </Link>

        {(userType == "Normal" || userType == "Premium") && (
          <div className={styles.favicon}>
            <Button type="button" text="🤍" onClick={handleAddToWishlist} />
          </div>
        )}

        {/* <div className={styles.carticon}>
          <Button type="button" text="🛒" />
        </div> */}
      </div>
      <Link to={`/products/${product?.id}`}>
        <div className={styles.product_description}>
          <p>4.5 🌟🌟🌟🌟⭐</p>
          <h4>{product?.name}</h4>
          <h4>{product?.description}</h4>
          <p>EGP {product?.price}</p>
          {product?.quantity > 0 && (
            <label>
              Available{" "}
              <span
                style={{
                  color: "rgb(0, 174, 0)",
                }}
              >
                {product?.quantity}
              </span>{" "}
              in stock.
            </label>
          )}
          {product?.quantity == 0 && (
            <label style={{ color: "red" }}>Out of stock!</label>
          )}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
