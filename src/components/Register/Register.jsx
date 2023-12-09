import { Link } from "react-router-dom";
import styles from "./Register.module.css";
function Register() {
  return (
    <Link to="/signup">
      <p className={styles.register}>
        Dont have an account? <span>Register</span>
      </p>
    </Link>
  );
}

export default Register;
