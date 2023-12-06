import React from 'react'
import styles from "./ChatsNav.module.css";
import ChatCard from '../ChatCard/ChatCard';
import Chatbox from '../Chatbox/Chatbox';


function ChatsNav() {
    return (
        <div className={styles.chats_nav}>
            <div className={styles.header}>
                <h1>Chats</h1>
            </div>
            <div className={styles.chats}>
                <ChatCard name="John Doe" message="Hello, how are you?" time="12:00" pic="https://www.w3schools.com/howto/img_avatar.png" />
                <ChatCard name="John Doe" message="Hello, how are you?" time="12:00" pic="https://www.w3schools.com/howto/img_avatar.png" />
                <ChatCard name="John Doe" message="Hello, how are you?" time="12:00" pic="https://www.w3schools.com/howto/img_avatar.png" />
                <ChatCard name="John Doe" message="Hello, how are you?" time="12:00" pic="https://www.w3schools.com/howto/img_avatar.png" />
                <ChatCard name="John Doe" message="Hello, how are you?" time="12:00" pic="https://www.w3schools.com/howto/img_avatar.png" />
                <ChatCard name="John Doe" message="Hello, how are you?" time="12:00" pic="https://www.w3schools.com/howto/img_avatar.png" />
            </div>
            <Chatbox />
        </div>
    )
}

export default ChatsNav