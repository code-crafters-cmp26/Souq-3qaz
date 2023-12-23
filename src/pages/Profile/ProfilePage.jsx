import styles from "./ProfilePage.module.css";
import DrawerItem from "../../components/DrawerItem/DrawerItem";
import Card from "../../components/Card/Card";
import { useState } from "react";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

function ProfilePage() {
  const [points, setPoints] = useState("");
  const [cardnumber, setCardNumber] = useState(0);
  const { userData } = useAuth();
  const handleChangePoints = (e) => {
    setPoints(e.target.value);
  };
  const handleClick = (i) => {
    setCardNumber(i);
  };
  const handleRecharge = () => {
    fetch("http://localhost:3000/api/v1/user/Customer/recharge", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        money: points,
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
  };

  return (
    <div className={styles.profile_page}>
      <div className={styles.profile_page__left_panel}>
        <img
          className={styles.profile_page__left_panel__profile_pic}
          src="https://via.placeholder.com/150"
          alt="profile pic"
        />
        <div className={styles.profile_page__left_panel__user_info}>
          <h3>John Doe</h3>
          <h6>221 b Baker Street London, UK</h6>
          <h6>+201234567890</h6>
          <h6> JohnDoe@2ablnelawfala7t.nam </h6>
        </div>
        <DrawerItem title="Logout" />
      </div>
      <div className={styles.profile_page__cards_grid}>
        {cardnumber === 0 && (
          <>
            <Card
              img="./src/pages/Profile/orders.svg"
              title="Orders"
              description="Here are the orders you've made"
              onClick={() => {
                handleClick(1);
              }}
            />
            <Card
              img="./src/pages/Profile/wish.svg"
              title="Wish List"
              description="Here are the items you've added to your wish list"
              onClick={() => {
                handleClick(2);
              }}
            />
            <Card
              img="./src/pages/Profile/settings.svg"
              title="Settings"
              description="Here you can change your settings, username, ..etc"
              onClick={() => {
                handleClick(3);
              }}
            />
            <Card
              img="./src/pages/Profile/address.svg"
              title="Addresses"
              description="Here are the addresses you've added"
              onClick={() => {
                handleClick(4);
              }}
            />
            <Card
              img="./src/pages/Profile/balance.svg"
              title="Recharge Balance"
              description="Here you can recharge your balance"
              onClick={() => {
                handleClick(5);
              }}
            />
            <Card
              img="./src/pages/Profile/contact.svg"
              title="Contact Us"
              description="Reach out to us for any questions"
              onClick={() => {
                handleClick(6);
              }}
            />
            <Card
              img="./src/pages/Profile/contact.svg"
              title="Upgrade to premium"
              description="Reach out to us for any questions"
              onClick={() => {
                handleClick(6);
              }}
            />
          </>
        )}

        {cardnumber === 5 && (
          <>
            <div className={styles.balance}>
              Your balance: {userData.balance}{" "}
            </div>
            <Card
              img="./src/pages/Profile/balance.svg"
              title="Recharge Balance"
              description="Here you can recharge your balance"
              onClick={() => {
                handleClick(0);
              }}
            />

            <div className={styles.recharge_balance}>
              <input
                placeholder="Enter The Points"
                type="number"
                value={points}
                onChange={handleChangePoints}
              ></input>
              <button onClick={handleRecharge}>Recharge</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
