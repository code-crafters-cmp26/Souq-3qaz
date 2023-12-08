import styles from "./Input.module.css";
function Input({ text, type, color }) {
  return (
    <div
      className={styles.outer__box}
      style={{ borderBottomColor: color || "white" }}
    >
      {/* <i className="ri-user-3-line login__icon"></i>        this is if u want to make an icon*/}
      <div className={styles.box__input}>
        <input
          type={type ? type : ""}
          required
          className={styles.only__input}
          placeholder=" "
        />
        <label className={styles.only__label}>{text}</label>
      </div>
    </div>
  );
}

export default Input;
