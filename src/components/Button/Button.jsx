import styles from "./Button.module.css";
function Button({ type, text, onClick }) {
  return (
    <button type={type ? type : "submit"} className={styles.button} onClick={onClick ? onClick : () =>{}}>
      {text}
    </button>
  );
}

export default Button;
