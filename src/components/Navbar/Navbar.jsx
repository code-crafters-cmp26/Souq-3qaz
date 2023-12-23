import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import NotificationsContainer from "../NotificationsContainer/NotificationsContainer";
import { useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";

function Navbar({ children }) {
  const [hovered, setHovered] = useState(false);
  const [opened, setOpened] = useState(false);

  const { isLoggedIn } = useAuth();

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
        <Link to="/">
          <img
            className={styles.logo}
            src="./src/components/Navbar/SOUQ 3QAZ.png"
          />
        </Link>
      </div>
      {children}

      <ul className={styles.contents}>
        {!isLoggedIn && (
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
        )}
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

        <li>
          <Link to="/profile">PROFILE</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
