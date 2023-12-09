import styles from "./Navbar.module.css";
import NotificationsContainer from "../NotificationsContainer/NotificationsContainer";
import { useState } from "react";

function Navbar({ children }) {
  const [hovered, setHovered] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setOpened((opened) => !opened);
  };

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
        <li
          className={styles.notes}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <img
            src={
              hovered
                ? "./src/components/Navbar/glowynotes.svg"
                : "./src/components/Navbar/notes.svg"
            }
            alt="Notifications"
          />
        </li>
        <NotificationsContainer opened={opened} />
      </ul>
    </div>
  );
}

export default Navbar;
