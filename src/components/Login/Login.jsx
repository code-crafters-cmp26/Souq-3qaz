import styles from "./Login.module.css";
import Input from "../input/Input";
import Register from "../register/Register";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";

function Login() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("clicked");
    fetch("http://localhost:3000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: "adham@g.com",
        password: "Password123456",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
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

      <Button text="Login" type="submit" onClick={handleSubmit} />

      <Register />
    </form>
  );
}

export default Login;
