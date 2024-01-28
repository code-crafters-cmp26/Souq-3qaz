import styles from "./ChatPage.module.css";

function ChatPage() {
  return (
    <div className={styles.chat}>
      <div className={styles.sentmessage}>
        <input placeholder="Write Something..." />
        <img src="src/pages/Chat/send.jpg" />
      </div>
    </div>
  );
}

export default ChatPage;
