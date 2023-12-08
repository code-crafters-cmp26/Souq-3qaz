import styles from "./CheckoutPage.module.css";
import Checkout from "../../components/Checkout/Checkout";
function CheckoutPage() {
  return (
    <>
      <Checkout />
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
