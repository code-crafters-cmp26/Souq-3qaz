import { useEffect, useState } from "react";
import styles from "./AllUsers.module.css";
import UserCard from "../UserCard/UserCard";
function AllUsers() {
  const [sellers, setSellers] = useState([]);
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetch(`https://my-backend-2l7i.onrender.com/api/v1/user`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSellers(data.sellers);
        setCustomers(data.customers);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <div className={styles.all_users}>
      {sellers?.map((seller) => (
        <UserCard key={seller.id} user={seller} />
      ))}
      {customers?.map((customer) => (
        <UserCard key={customer.id} user={customer} />
      ))}
    </div>
  );
}

export default AllUsers;
