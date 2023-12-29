import { useEffect, useState } from "react";
import styles from "./AllUsers.module.css";
function AllUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {}, []);
  return (
    <div className={styles.all_users}>
      {/* {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))} */}
    </div>
  );
}

export default AllUsers;
