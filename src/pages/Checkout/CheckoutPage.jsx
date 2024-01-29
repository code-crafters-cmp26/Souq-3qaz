import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CheckoutPage.module.css";
import Checkout from "../../components/Checkout/Checkout";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
function CheckoutPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Access individual parameters
  const productName = queryParams.get("name");
  const productPrice = queryParams.get("price");
  const productID = queryParams.get("id");
  const { userData } = useAuth();
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://my-backend-2l7i.onrender.com/api/v1/product/${productID}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "success") setProductData(...data.products);
        else alert(data.message);
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  }, [productID]);

  // const productShipping = 1;
  return (
    <>
      <Checkout
        productName={productName}
        productPrice={productPrice}
        productID={productID}
        // productShipping={productShipping}
      />
      <div className={styles.checkoutpage}>
        <h3>1 Shipping address</h3>
        <p>
          Your Address: {userData?.country} {userData?.city} {userData?.street}
        </p>
        <Button
          text="Change Your Address in Settings"
          type="button"
          onClick={() => {
            navigate("/settings");
          }}
        />
        <hr />
        <h3>2 Payment method</h3>
        <p>Your Balance: {userData?.balance}</p>
        <hr />
        <h3>3 Ordered items</h3>
        <div className={styles.smallproduct}>
          <ProductCard product={productData} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
