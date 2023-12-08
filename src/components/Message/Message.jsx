import React from 'react';
import styles from "./Message.module.css";

function Message({ color, message, drection, time }) {
    return (
        <div className={styles.message} style={{ backgroundColor: color, marginLeft: drection === "left" ? "0px" : "auto", marginRight: drection === "right" ? "0px" : "auto" }}>
            <p style={{ textAlign: drection }}>{message}</p>
            <span className={styles.time} style={{ left: drection === "left" ? "0px" : "auto", right: drection === "right" ? "0px" : "auto" }}>{time}</span>
        </div>
    );
}

export default Message;
