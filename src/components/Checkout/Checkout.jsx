import Button from "../Button/Button";
import styles from "./Checkout.module.css";
function Checkout() {
  return (
    <div className={styles.checkout}>
      <label></label>
      <hr />
      <Button text="Confirm Order" />
    </div>
  );
}

export default Checkout;
