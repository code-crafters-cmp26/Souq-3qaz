import styles from "./Login.module.css";
import Input from "../input/Input";
import Register from "../register/Register";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState(0);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("clicked");
    fetch("http://localhost:3000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: Email,
        password: Password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error?.statusCode == 401) {
          setError(1);
        } else if (data.status === "success") {
          const token = data.token;
          localStorage.setItem("token", `Bearer ${token}`);
          console.log(localStorage.getItem("token"));
        }
        //console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  return (
    <>
      {Error && <ErrorMessage />}
      <form action="" className={styles.login__form}>
        <h1 className={styles.login__title}>Login</h1>
        <div className={styles.login__content}>
          <Input
            text="Email"
            type="email"
            value={Email}
            handlevalue={handleEmailChange}
          />
          <Input
            text="Password"
            type="password"
            value={Password}
            handlevalue={handlePasswordChange}
          />
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
    </>
  );
}

export default Login;
