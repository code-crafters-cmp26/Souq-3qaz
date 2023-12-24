import styles from "./Input.module.css";
import { useState } from "react";
function Input({ text, type, color, value, handlevalue, name, initialVal}) {
  const [input, setInput] = useState(initialVal ? initialVal : "");
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  return (
    <div
      className={styles.outer__box}
      style={{ borderBottomColor: color || "white" }}
    >
      {/* <i className="ri-user-3-line login__icon"></i>        this is if u want to make an icon*/}
      <div className={styles.box__input}>
        <input
          name={name ? name : ""}
          type={type ? type : ""}
          required
          className={styles.only__input}
          placeholder=" "
          value={initialVal? input: value}
          onChange={handlevalue ? handlevalue : handleChange}
        />
        <label className={styles.only__label}>{text}</label>
      </div>
    </div>
  );
}

export default Input;
