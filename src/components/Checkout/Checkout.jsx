import Button from "../Button/Button";
import styles from "./Checkout.module.css";
function Checkout() {
  return (
    <div className={styles.checkout}>
      <h2>Order Summary</h2>
      {/* <Input text="Coupon Code" color="lightgray" /> */}
      <p>items: </p>
      <p>Shipping & handling:</p>
      <p>Fees:</p>
      <hr />
      <p>
        Total <span>(inclusive of VAT)</span>
      </p>
      <hr />
      <Button text="Confirm Order" />
    </div>
  );
}

export default Checkout;
