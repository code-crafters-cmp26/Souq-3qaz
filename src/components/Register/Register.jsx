import { Link } from "react-router-dom";
import styles from "./Register.module.css";
function Register() {
  return (
    <>
      <Link to="/customersignup">
        <p className={styles.register}>
          Dont have an account? <span>Register as a customer</span>
        </p>
      </Link>
      <Link to="/sellersignup">
        <p className={styles.register}>
          <span>Register as a seller</span>
        </p>
      </Link>
    </>
  );
}

export default Register;
