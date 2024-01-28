import styles from "./Chatbox.module.css";
import Message from "../Message/Message";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import Button from "../Button/Button";

function Chatbox() {
  const [ChatOpened, SetChatOpened] = useState(1);

  const { socket } = useAuth();

  useEffect(() => {
    document
      .querySelector(`.${styles.input}`)
      .addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          console.log("is working");
          handleSend();
        }
      });
  }, []);

  function handleSend() {
    const input = document.querySelector(`.${styles.input}`);
    const message = input.value;

    socket.emit("eslam", { message: "hola first emit" });
    console.log("is working");
    input.value = "";
    if (message !== "") {
      let messageElement = (
        <Message
          color="#dbcb7c"
          message={message}
          drection="right"
          time="12:07 pm"
        />
      );
      let messagesContainer = document.querySelector(`.${styles.messages}`);
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
  function handleClose() {
    SetChatOpened(!ChatOpened);
  }
  return (
    <div
      className={styles.chatbox}
      style={{ display: ChatOpened ? "block" : "none" }}
    >
      <div className={styles.header}>
        <img
          className={styles.profile_pic}
          src="src/components/Chatbox/34ry.png"
          alt="profile"
        />
        <h3>3a4ry the Seller</h3>
        <img
          className={styles.close}
          src="src/components/Chatbox/close.svg"
          alt="close"
          onClick={handleClose}
        />
      </div>
      <div className={styles.messages}>
        <Message
          color="#dbcb7c"
          message="Bye"
          drection="right"
          time="12:07 pm"
        />
      </div>
      <div className={styles.input_container}>
        <input
          className={styles.input}
          type="text"
          placeholder="Type a message..."
        />
      </div>
      <div>
        <Button text="Send message" onClick={handleSend}>
          HOla
        </Button>
      </div>
    </div>
  );
}

export default Chatbox;
