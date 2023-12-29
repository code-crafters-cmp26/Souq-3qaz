import { useState } from "react";
import styles from "./UserCard.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
function UserCard({ user }) {
  const handleBan = () => {
    fetch(`http://localhost:3000/api/v1/user/${user.id}`, {
      method: "PATCH",
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
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className={styles.user_card}>
      <img src={user.image} />
      <p>
        Name: {user.firstname} {user.lastname}
      </p>
      <p>Email: {user.email}</p>
      <p>Gender: {user.gender}</p>
      <p>Type: {user.type}</p>
      {user.quantity == 0 && <p style={{ color: "red" }}>Out of stock!</p>}
      <Button text="Delete" onClick={handleBan} />
    </div>
  );
}

export default UserCard;
