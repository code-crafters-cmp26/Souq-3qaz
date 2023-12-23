import styles from "./ProfilePage.module.css";
import DrawerItem from "../../components/DrawerItem/DrawerItem";
import Card from "../../components/Card/Card";

function ProfilePage() {
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
        <Card
          img="./src/pages/Profile/orders.svg"
          title="Orders"
          description="Here are the orders you've made"
        />
        <Card
          img="./src/pages/Profile/wish.svg"
          title="Wish List"
          description="Here are the items you've added to your wish list"
        />
        <Card
          img="./src/pages/Profile/settings.svg"
          title="Settings"
          description="Here you can change your settings, username, ..etc"
        />
        <Card
          img="./src/pages/Profile/address.svg"
          title="Addresses"
          description="Here are the addresses you've added"
        />
        <Card
          img="./src/pages/Profile/balance.svg"
          title="Recharge Balance"
          description="Here you can recharge your balance"
        />
        <Card
          img="./src/pages/Profile/contact.svg"
          title="Contact Us"
          description="Reach out to us for any questions"
        />
      </div>
    </div>
  );
}

export default ProfilePage;
