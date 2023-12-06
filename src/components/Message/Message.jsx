import React from 'react'
import styles from "./Message.module.css";

function Message({color, message, drection, time}) {
  return (
    <div className={styles.message} style={{backgroundColor: color, marginLeft: drection === "left" ? "0px" : "auto", marginRight: drection === "right" ? "0px" : "auto"}}>
        <p>{message}</p>
        <span className={styles.time}>{time}</span>
    </div>
  )
}

export default Message