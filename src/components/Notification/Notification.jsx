import styles from "./Notification.module.css";
import { useState } from "react";

function Notification({ title, description }) {
  const [read, setRead] = useState(false);
  return (
    <div className={styles.notification}>
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className={styles.buttons}></div>
    </div>
  );
}

export default Notification;
