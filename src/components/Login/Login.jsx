import styles from "./Login.module.css";
import Input from "../input/Input";
import Register from "../Register/Register";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState(0);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("clicked");
    fetch("https://my-backend-2l7i.onrender.com/api/v1/user/login", {
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
        if (data.status != "success") {
          //{data.error?.statusCode == 401
          alert(data.message);
          setError(1);
        } else if (data.status === "success") {
          const token = data.token;
          console.log(token);
          localStorage.setItem("token", `Bearer ${token}`);
          const role = data.role;
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          localStorage.setItem("userType", JSON.stringify(role));
          localStorage.setItem("userData", JSON.stringify(data.user));
          login();
          navigate("/");
          //console.log(role);
        }
        //console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
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
          {/* <div className={styles.login__check__group}>
            <Checkbox />
            <label className={styles.login__check__label}>Remember me</label>
          </div> 

          <a href="#" className={styles.login__forgot}>
            Forgot Password?
          </a>
          */}
        </div>

        <Button text="Login" type="submit" onClick={handleSubmit} />

        <Register />
      </form>
    </>
  );
}

export default Login;
