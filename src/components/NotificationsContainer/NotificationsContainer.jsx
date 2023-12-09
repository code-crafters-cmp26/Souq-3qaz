import styles from "./NotificationsContainer.module.css";
import Notification from "../Notification/Notification";

function NotificationsContainer({ opened }) {
  return (
    opened && (
      <div className={styles.container}>
        <Notification
          title="New Order"
          description="You have a new order from a customer"
        />
        <Notification
          title="New Barter"
          description="You have a barter request from a Seller"
        />
        <Notification
          title="Auction Results"
          description="Your auction has ended, check the results"
        />
      </div>
    )
  );
}

export default NotificationsContainer;
