import { useEffect, useState } from "react";
import ProductsList from "../../components/ProductsList/ProductsList";
import styles from "./WishlistPage.module.css";
function WishlistPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/user/Customer/wishList`, {
      method: "GET",
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
        setProducts(data.result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <div className={styles.wish_list_page}>
      <ProductsList products={products} />
    </div>
  );
}

export default WishlistPage;
