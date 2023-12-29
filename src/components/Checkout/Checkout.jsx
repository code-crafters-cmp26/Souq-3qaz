import { useEffect, useState } from "react";
import Button from "../Button/Button";
import styles from "./Checkout.module.css";
function Checkout({ productName, productPrice, productID }) {
  const [productQuantity, setProductQuantity] = useState("");
  const [shippings, setShippings] = useState([]);
  const [productShipping, setProductShipping] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/shipping", {
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
        setShippings(data.result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  const handleChange = (e) => {
    setProductQuantity(e.target.value);
  };
  const handleBuy = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/v1/buy", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        cart: [
          {
            productId: parseInt(productID),
            Quantity: parseInt(productQuantity),
            shippedvia: parseInt(productShipping),
          },
        ],
      }),
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
    <form className={styles.checkout}>
      <h2>Order Summary</h2>
      {/* <Input text="Coupon Code" color="lightgray" /> */}
      <p>items: {productName}</p>
      <p>price: {productPrice}</p>
      <p>Shipping & handling:</p>
      <select
        value={productShipping}
        onChange={(e) => setProductShipping(e.target.value)}
      >
        <option value="" disabled>
          Select an option
        </option>
        {shippings.map((shipping) => (
          <option key={shipping.id} value={shipping.id}>
            {shipping.name}
          </option>
        ))}
      </select>
      <hr />
      <input
        required
        type="number"
        placeholder="Quantity"
        value={productQuantity}
        onChange={handleChange}
      />
      <hr />
      <p>
        Total <span>(inclusive of VAT)</span>: {productPrice * productQuantity}
      </p>
      <hr />
      <Button text="Confirm Order" onClick={handleBuy} />
    </form>
  );
}

export default Checkout;
