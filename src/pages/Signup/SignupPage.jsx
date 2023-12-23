import styles from "./SignupPage.module.css";
import Signup from "../../components/Signup/Signup";
function SignupPage() {
  return (
    <div className={styles.signuppage}>
      <Signup />
    </div>
  );
}

export default SignupPage;
