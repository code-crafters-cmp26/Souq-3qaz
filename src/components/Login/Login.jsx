import styles from "./Login.module.css";
import Input from "../input/Input";
import Register from "../register/Register";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
function Login() {
  return (
    <form action="" className={styles.login__form}>
      <h1 className={styles.login__title}>Login</h1>

      <div className={styles.login__content}>
        <Input text="Email" type="email" />
        <Input text="Password" type="password" />
      </div>

      <div className={styles.login__check}>
        <div className={styles.login__check__group}>
          <Checkbox />
          <label className={styles.login__check__label}>Remember me</label>
        </div>

        <a href="#" className={styles.login__forgot}>
          Forgot Password?
        </a>
      </div>

      <Button text="Login" type="submit" />

      <Register />
    </form>
  );
}

export default Login;
