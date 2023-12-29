import { useState } from "react";
import styles from "./UserCard.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
function UserCard({ user }) {
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
    </div>
  );
}

export default UserCard;
