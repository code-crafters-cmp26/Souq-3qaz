import React, { useEffect } from 'react'
import styles from "./Notification.module.css";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import { MdMarkunread } from "react-icons/md";
import { useState } from "react";

function Notification({ title, description }) {
    const [read, setRead] = useState(false);
    return (
        <div className={styles.notification}>
            <div className={styles.content}>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            <div className={styles.buttons}>
                <MdMarkunread size="30px" color={read ? "grey" : "white"} onClick={() => setRead(!read)} />
                <FaTrashAlt size="30px" color="white"/>

            </div>
        </div>
    )
}

export default Notification