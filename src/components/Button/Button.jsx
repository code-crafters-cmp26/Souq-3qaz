import styles from "./Button.module.css";
function Button({ type, text }) {
  return (
    <button type={type ? type : "submit"} className={styles.button}>
      {text}
    </button>
  );
}

export default Button;
