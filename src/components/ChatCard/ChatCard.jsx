import React from 'react'
import styles from "./ChatCard.module.css";

function ChatCard({ name, message, time, pic }) {
    return (
        <div className={styles.chat_card}>
            <img src={pic} alt="profile" />
            <div className={styles.info}>
                <h1>{name}</h1>
                <p>{message}</p>
            </div>
            <div className={styles.time}>
                <p>{time}</p>
            </div>
        </div>
    )
}

export default ChatCard