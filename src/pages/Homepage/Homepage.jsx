//import { useEffect } from "react";
import Button from "../../components/Button/Button";
import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";
//import io from "socket.io-client";
function Homepage() {
  return (
    <div className={styles.homepage}>
      <img src="./src/pages/Homepage/black-friday.jpg" />
      <div className={styles.overlay_text}>
        Sales <span>20%</span> Off On Everything
      </div>
      <div className={styles.but}>
        <Link to="/products">
          <Button text="Shop Now" />
        </Link>
      </div>
      <div className={styles.categ}>
        <div>first</div>
        <div>second</div>
        <div>third</div>
        <div>fourth</div>
      </div>
    </div>
  );
}

export default Homepage;
