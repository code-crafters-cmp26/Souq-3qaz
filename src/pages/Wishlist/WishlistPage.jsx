import { useEffect, useState } from "react";
import ProductsList from "../../components/ProductsList/ProductsList";
import styles from "./WishlistPage.module.css";
function WishlistPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      `https://my-backend-2l7i.onrender.com/api/v1/user/Customer/wishList`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status != "success") alert(data.message);
        else setProducts(data.result);
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  }, []);
  return (
    <div className={styles.wish_list_page}>
      <ProductsList products={products} />
    </div>
  );
}

export default WishlistPage;
