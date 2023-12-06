import React from 'react'
import styles from "./ChatsNav.module.css";
import ChatCard from '../ChatCard/ChatCard';
import Chatbox from '../Chatbox/Chatbox';


function ChatsNav() {
  return (
    <div className={styles.chatsNav}>
        <div className={styles.header}>
            <h1>Chats</h1>
        </div>
        <div className={styles.chats}>
            <ChatCard name="John Doe" message="Hello, how are you?" time="12:00" pic="https://images.unsplash.com/photo-1612833603922-5e9b5f0b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFtaWx5JTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
            <ChatCard name="John Doe" message="Hello, how are you?" time="12:00" pic="https://images.unsplash.com/photo-1612833603922-5e9b5f0b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFtaWx5JTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
            <ChatCard name="John Doe" message="Hello, how are you?" time="12:00" pic="https://images.unsplash.com/photo-1612833603922-5e9b5f0b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFtaWx5JTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
            <ChatCard name="John Doe" message="Hello, how are you?" time="12:00" pic="https://images.unsplash.com/photo-1612833603922-5e9b5f0b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFtaWx5JTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
            <ChatCard name="John Doe" message="Hello, how are you?" time="12:00" pic="https://images.unsplash.com/photo-1612833603922-5e9b5f0b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFtaWx5JTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
            <ChatCard name="John Doe" message="Hello, how are you?" time="12:00" pic="https://images.unsplash.com/photo-1612833603922-5e9b5f0b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFtaWx5JTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
        </div>
        <Chatbox />
    </div>
  )
}

export default ChatsNav