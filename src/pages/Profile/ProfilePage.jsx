import styles from "./ProfilePage.module.css";
import DrawerItem from "../../components/DrawerItem/DrawerItem";
import Card from "../../components/Card/Card";
import { useState } from "react";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

function ProfilePage() {
  const [points, setPoints] = useState("");
  const [cardnumber, setCardNumber] = useState(0);
  const { userType, userData, setUserData, setUserType } = useAuth();
  const handleChangePoints = (e) => {
    setPoints(e.target.value);
  };
  const handleClick = (i) => {
    setCardNumber(i);
  };

  const updateUserData = () => {
    fetch(`http://localhost:3000/api/v1/user/Customer/${userData.id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("userData", JSON.stringify(...data.customer));
        const storedUserData = localStorage.getItem("userData");
        setUserData(JSON.parse(storedUserData));
      })
      .catch((error) => {
        console.log(error.message);
      });
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
        updateUserData();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleUpgrade = () => {
    if (userType != "Premium") {
      fetch("http://localhost:3000/api/v1/user/Customer/upgrade", {
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
          if (data.message == "not enough money in your balance") {
            alert("Not enough money in your account");
          } else if (data.message == "You Already Have Done This Before") {
            alert("you are already a premium user");
          } else {
            console.log(data);
            setUserType("Premium");
            updateUserData();
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div className={styles.profile_page}>
      <div className={styles.profile_page__left_panel}>
        {userType == "Premium" && (
          <h2 className={styles.premiummessage}>
            Welcome Our Premium customer
          </h2>
        )}
        <img
          className={styles.profile_page__left_panel__profile_pic}
          src={userData.image}
          alt="profile pic"
        />
        <div className={styles.profile_page__left_panel__user_info}>
          <h3>
            {userData.firstname} {userData.lastname}
          </h3>
          <h6>
            {userData.street}, {userData.country}, {userData.city}
          </h6>
          <h6>
            <h6>building number: {userData.buildingnumber}</h6>
          </h6>
          {userData.apartmentnumber && (
            <h6>Apartment number: {userData.apartmentnumber}</h6>
          )}
          <h6>{userData.phonenumber}</h6>
          <h6> {userData.email} </h6>
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
            {userType == "Normal" && (
              <Card
                img="./src/pages/Profile/636600.png"
                title="Upgrade to premium"
                description="Take benefits of permium users"
                onClick={() => {
                  handleClick(7);
                }}
              />
            )}
          </>
        )}

        {cardnumber === 7 && (
          <>
            <h3 className={styles.notifypremium}>
              You need balance greater than 200 to upgrade to premium
            </h3>
            <div className={styles.balance}>
              Your balance: {userData.balance}{" "}
            </div>
            <Card
              img="./src/pages/Profile/636600.png"
              title="Upgrade to premium"
              description="Take benefits of permium users"
              onClick={() => {
                handleClick(0);
              }}
            />
            <div className={styles.upgradebut}>
              <button onClick={handleUpgrade}>Upgrade</button>
            </div>
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
