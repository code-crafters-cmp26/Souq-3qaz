import styles from "./Navbar.module.css";

function Navbar({ children }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.logocontainer}>
        <img
          className={styles.logo}
          src="./src/components/Navbar/SOUQ 3QAZ.png"
        />
      </div>
      {children}

      <ul className={styles.contents}>
        <li>HOME</li>
        <li>ABOUT</li>
        <li>SIGN UP</li>
        <li>LOGIN</li>
      </ul>
    </div>
  );
}

export default Navbar;
