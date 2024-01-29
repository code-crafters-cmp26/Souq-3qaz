import styles from "./ChatPage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Message from "../../components/Message/Message";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

function ChatPage() {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const { id } = useParams();
  const { userData, socket } = useAuth();

  const handlesendchange = (e) => {
    setMessage(e.target.value);
  };

  const handlesend = () => {
    fetch(`https://my-backend-2l7i.onrender.com/api/v1/message/${id}`, {
      method: "Post",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        texxt: message,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    socket.emit("notifyServer", { id: id });
    // window.scrollTo({
    //   top: document.body.scrollHeight,
    //   behavior: "smooth", // Adds smooth scrolling animation
    // });
  };

  useEffect(() => {
    fetch(`https://my-backend-2l7i.onrender.com/api/v1/message/${id}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAllMessages(data.result);
        console.log(data.result[0].fitstperson);
      })
      .catch((error) => {
        console.log("hola");
        console.log(error.message);
      });
  }, [id, handlesend]);

  const handleKeyDown = (e) => {
    // Check if the pressed key is "Enter"
    if (e.key === "Enter") {
      handlesend();
    }
  };

  return (
    <div className={styles.chat}>
      <h1>You are chatting with seller with id {id}</h1>
      <div className={styles.sentmessage}>
        {allMessages.map((message) => (
          <div key={message.messageid}>
            <Message
              direction={
                message.fitstperson == userData?.id &&
                message.direction == false
                  ? "right"
                  : "left"
              }
              color={
                message.fitstperson == userData?.id &&
                message.direction == false
                  ? "lightblue"
                  : "#dbcb7c"
              }
              message={message.messagetext}
            />
          </div>
        ))}
        <input
          placeholder="Write Something..."
          onChange={handlesendchange}
          value={message}
          onKeyDown={handleKeyDown}
        />
        {/* <img src="src/pages/Chat/send.jpg" onClick={handlesend} /> */}
      </div>
    </div>
  );
}

export default ChatPage;
