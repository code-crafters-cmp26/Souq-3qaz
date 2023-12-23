import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import NotificationsContainer from "../NotificationsContainer/NotificationsContainer";
import { useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";

function Navbar({ children }) {
  const [hovered, setHovered] = useState(false);
  const [opened, setOpened] = useState(false);

  const { isLoggedIn, logout } = useAuth();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setOpened((opened) => !opened);
  };

  const handleLogout = () => {
    logout();
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
        {!isLoggedIn && (
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
        )}
        {isLoggedIn && <li onClick={handleLogout}>LOGOUT</li>}
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
