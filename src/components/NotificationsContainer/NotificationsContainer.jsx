import React from 'react'
import { useEffect } from "react";
import styles from "./NotificationsContainer.module.css";

function NotificationsContainer({opened}) {
    useEffect(() => {
        if (opened) {
        document.querySelector(`.${styles.container}`).style.display = "flex";
        } else {
        document.querySelector(`.${styles.container}`).style.display = "none";
        }
    }, [opened]);

  return (
    <div className= {styles.container}>NotificationsContainer</div>
  )
}

export default NotificationsContainer