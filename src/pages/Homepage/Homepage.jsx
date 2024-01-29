//import { useEffect } from "react";
import Button from "../../components/Button/Button";
import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";
//import io from "socket.io-client";
function Homepage() {
  return (
    <div className={styles.homepage}>
      <img src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=1060&t=st=1706557562~exp=1706558162~hmac=7f4efbe5da42cbb35686b7e6b2f04163081a09fa61f5a3945f80ea4721b1975f" />
      <div className={styles.overlay_text}>
        Sales <span>20%</span> Off On Everything
      </div>
      <div className={styles.but}>
        <Link to="/products">
          <Button text="Shop Now" />
        </Link>
      </div>
      {/* <div className={styles.categ}>
        <div>first</div>
        <div>second</div>
        <div>third</div>
        <div>fourth</div>
      </div> */}
    </div>
  );
}

export default Homepage;
