import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Productpage.module.css";
import { useEffect, useState } from "react";
import ReviewsContainer from "../../components/ReviewsContainer/ReviewsContainer";

function Productpage() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/product/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductData(...data.products);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.productcontainer}>
      <div className={styles.productpage}>
        <img className={styles.img} src={productData.image} />
        <div className={styles.content}>
          <h1 className={styles.category}>{productData.category}</h1>
          <h1 className={styles.name}>{productData.name}</h1>
          <h2>Available quantity: {productData.quantity}</h2>
          <div>{productData.description}</div>
          <div>Seller or Brand: {productData.seller}</div>
          <div className={styles.reviews}></div>
          <hr />
          <p>{productData.price}$</p>
          <p className={styles.seller}></p>
        </div>
        <div className={styles.purchase}>
          <Button text="Add to cart" />
          <Button text="Buy Now" />
        </div>
      </div>
      <ReviewsContainer />
    </div>
  );
}

export default Productpage;
