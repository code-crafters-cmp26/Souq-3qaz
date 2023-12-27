import styles from "./Button.module.css";
function Button({ type, text, onClick, isreq, disabled, textColor, backgroundColor }) {
  return (
    <button
      type={type ? type : "submit"}
      className={styles.button}
      onClick={onClick ? onClick : () => {}}
      {...(isreq ? { required: true } : {})}
      {...(disabled ? { disabled: disabled } : {})}
      {...(backgroundColor ? { style: { backgroundColor: backgroundColor } } : {})}
    >
      {text}
    </button>
  );
}

export default Button;
