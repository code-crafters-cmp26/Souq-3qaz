import Button from "../../components/Button/Button";

import styles from "./Productpage.module.css";
function Productpage() {
  return (
    <div className={styles.productpage}>
      <div className={styles.img}>img</div>
      <div className={styles.content}>
        <div>description</div>
        <div>seller or brand</div>
        <div className={styles.reviews}></div>
        <hr />
        <p>899$</p>
      </div>
      <div className={styles.purchase}>
        <Button text="Add to cart" />
        <Button text="Buy Now" />
      </div>
    </div>
  );
}

export default Productpage;
