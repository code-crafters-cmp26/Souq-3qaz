import styles from "./Login.module.css";
import Input from "../input/Input";
function Login() {
  return (
    <form action="" className={styles.login__form}>
      <Input text="Email" />
      <h1 className={styles.login__title}>Login</h1>

      <div className={styles.login__content}>
        <div className={styles.login__box}>
          {/* <i className="ri-user-3-line login__icon"></i> */}

          <div className={styles.login__box__input}>
            <input
              type="email"
              required
              className={styles.login__input}
              placeholder=" "
            />
            <label className={styles.login__label}>Email</label>
          </div>
        </div>

        <div className={styles.login__box}>
          {/* <i className="ri-lock-2-line login__icon"></i> */}

          <div className={styles.login__box__input}>
            <input
              type="password"
              required
              className={styles.login__input}
              placeholder=" "
            />
            <label className={styles.login__label}>Password</label>
            {/* <i className="ri-eye-off-line login__eye" id="login-eye"></i> */}
          </div>
        </div>
      </div>

      <div className={styles.login__check}>
        <div className={styles.login__check__group}>
          <input type="checkbox" className={styles.login__check__input} />
          <label className={styles.login__check__label}>Remember me</label>
        </div>

        <a href="#" className={styles.login__forgot}>
          Forgot Password?
        </a>
      </div>

      <button type="submit" className={styles.login__button}>
        Login
      </button>

      <p className={styles.login__register}>
        Dont have an account? <a>Register</a>
      </p>
    </form>
  );
}

export default Login;
