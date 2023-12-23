import styles from "./ErrorMessage.module.css";
function ErrorMessage() {
  return (
    <div className={styles.errormessage}>
      <div className={styles.icon}>⛔</div>
      <div className={styles.content}>Incorrect Email or Password</div>
    </div>
  );
}

export default ErrorMessage;
