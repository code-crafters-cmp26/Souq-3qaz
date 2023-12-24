import { useLocation } from "react-router-dom";
import styles from "./CheckoutPage.module.css";
import Checkout from "../../components/Checkout/Checkout";
function CheckoutPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Access individual parameters
  const productName = queryParams.get("name");
  const productPrice = queryParams.get("price");
  const productID = queryParams.get("id");
  const productShipping = 1;
  return (
    <>
      <Checkout
        productName={productName}
        productPrice={productPrice}
        productID={productID}
        productShipping={productShipping}
      />
      <div className={styles.checkoutpage}>
        <h3>1 Shipping address</h3>
        <hr />
        <h3>2 Payment method</h3>
        <hr />
        <h3>3 Ordered items</h3>
      </div>
    </>
  );
}

export default CheckoutPage;
