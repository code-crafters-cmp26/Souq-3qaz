import React from 'react'
import styles from "./Chatbox.module.css";
import Message from '../Message/Message';
import { useState } from 'react';
import { useEffect } from 'react';

function Chatbox() {
    useEffect(() => {
        document.querySelector(`.${styles.input}`).addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                handleSend();
            }
        });
    }, []);

    function handleSend() {
        const input = document.querySelector(`.${styles.input}`);
        const message = input.value;
        input.value = "";
        if (message !== "") {
            let messageElement = <Message color="#dbcb7c" message={message} drection="right" time="12:07 pm" />;
            let messagesContainer = document.querySelector(`.${styles.messages}`);
            messagesContainer.appendChild(messageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
    function handleClose() {
        document.querySelector(`.${styles.chatbox}`).style.display = "none";
    }
  return (
    <div className={styles.chatbox}>
        <div className={styles.header}>
            <img className={styles.profile_pic} src="src/components/Chatbox/34ry.png" alt="profile" />
            <h3>3a4ry the Seller</h3> 
            <img className = {styles.close}src="src/components/Chatbox/close.svg" alt="close" onClick={handleClose} />
        </div>
        <div className={styles.messages}>
            <Message color="#685b1c" message="Hello" drection="left" time="12:00 pm" />
            <Message color="#dbcb7c" message="Hi" drection="right" time="12:01 pm" />
            <Message color="#685b1c" message="How are you?" drection="left" time="12:02 pm" />
            <Message color="#dbcb7c" message="Good, you?" drection="right" time="12:03 pm" />
            <Message color="#685b1c" message="I'm good too" drection="left" time="12:04 pm" />
            <Message color="#685b1c" message="You Wouldn't belive what Ibrahim the White did today" drection="left" time="12:04 pm" />
            <Message color="#dbcb7c" message="What?" drection="right" time="12:05 pm" />
            <Message color="#685b1c" message="He rode a dino to Zarzor territory and killed Shiba the skinny" drection="left" time="12:05 pm" />
            <Message color="#dbcb7c" message="Nice" drection="right" time="12:05 pm" />
            <Message color="#685b1c" message="Bye" drection="left" time="12:06 pm" />
            <Message color="#dbcb7c" message="Bye" drection="right" time="12:07 pm" />
        </div>
        <div className={styles.input_container}>
            <input className={styles.input} type="text" placeholder="Type a message..." />
        </div>
    </div>
  )
}

export default Chatbox