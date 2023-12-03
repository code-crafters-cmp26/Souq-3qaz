import Login from "../../components/Login/Login";
import Input from "../../components/input/Input";
import styles from "./LoginPage.module.css";

function LoginPage() {
  return (
    <div className={styles.loginpage}>
      <Login />
      <Input />
    </div>
  );
}

export default LoginPage;
