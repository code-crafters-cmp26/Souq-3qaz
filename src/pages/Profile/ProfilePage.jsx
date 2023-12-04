import React from "react";
import styles from "./ProfilePage.module.css";
import DrawerItem from "../../components/DrawerItem/DrawerItem";

function ProfilePage() {
  return (
    <div className={styles.profile_page}>
      <div className={styles.profile_page__left_panel}>
        <img className={styles.profile_page__left_panel__profile_pic} src="https://via.placeholder.com/150" alt="profile pic" />
        <div className={styles.profile_page__left_panel__user_info}>
          <h3>John Doe</h3>
          <h6>221 b Baker Street
          London, UK</h6>
          <h6>+201234567890</h6>
          <h6> JohnDoe@2ablnelawfala7t.nam </h6>

        </div>
        <DrawerItem title="Logout" />
      </div>
      <div className={styles.profile_page__cards_grid}>
        <div className={styles.profile_page__cards_grid__card}>
          <img src="./src/pages/Profile/wish.svg" alt="wishlist" />
          <div className={styles.profile_page__cards_grid__card__info}>
            <h3>Whishlist</h3>
            <p>Here are the items you've saved for later</p>
          </div>
        </div>
        <div className={styles.profile_page__cards_grid__card}>
          <img src="./src/pages/Profile/orders.svg" alt="orders" />
          <div className={styles.profile_page__cards_grid__card__info}>
            <h3>Orders</h3>
            <p>Here are the items you've ordered</p>
          </div>
        </div>
        <div className={styles.profile_page__cards_grid__card}>
          <img src="./src/pages/Profile/settings.svg" alt="settings" />
          <div className={styles.profile_page__cards_grid__card__info}>
            <h3>Settings</h3>
            <p>Here you can change your settings, username, ..etc</p>
          </div>
        </div>
        <div className={styles.profile_page__cards_grid__card}>
          <img src="./src/pages/Profile/transactions.svg" alt="Transactions" />
          <div className={styles.profile_page__cards_grid__card__info}>
            <h3>Transactions History</h3>
            <p>Here are the transactions you've made</p>
          </div>
        </div>
        <div className={styles.profile_page__cards_grid__card}>
          <img src="./src/pages/Profile/balance.svg" alt="Recharge Balance" />
          <div className={styles.profile_page__cards_grid__card__info}>
            <h3>Recharge Balance</h3>
            <p>Here you can recharge your balance</p>
          </div>
        </div>
        <div className={styles.profile_page__cards_grid__card}>
          <img src="./src/pages/Profile/contact.svg" alt="Contact Us" />
          <div className={styles.profile_page__cards_grid__card__info}>
            <h3>Contact Us</h3>
            <p>Reach out to us for any questions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
