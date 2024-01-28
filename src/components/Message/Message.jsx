import React from "react";
import styles from "./Message.module.css";

function Message({ color, message, direction, time }) {
  return (
    <div
      className={styles.message}
      style={{
        backgroundColor: color,
        marginLeft: direction === "left" ? "0px" : "auto",
        marginRight: direction === "right" ? "0px" : "auto",
      }}
    >
      <p style={{ textAlign: direction }}>{message}</p>
      <span
        className={styles.time}
        style={{
          left: direction === "left" ? "0px" : "auto",
          right: direction === "right" ? "0px" : "auto",
        }}
      >
        {time}
      </span>
    </div>
  );
}

export default Message;
