import { useEffect, useState } from "react";
import styles from "./AllUsers.module.css";
import UserCard from "../UserCard/UserCard";
function AllUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/user`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data.users);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <div className={styles.all_users}>
      {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default AllUsers;
