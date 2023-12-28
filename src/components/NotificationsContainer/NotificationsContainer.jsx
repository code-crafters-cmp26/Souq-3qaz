import styles from "./NotificationsContainer.module.css";
import Notification from "../Notification/Notification";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NotificationsContainer({ opened }) {
  const navigate = useNavigate();
  const { userType, userData } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(userType && userData){
      console.log(userType);
      setLoading(false);
    }
  }, [userData]);
  const handleGoToBarters = () => {
    navigate(`/barters?sid=${userData.id}`);
  }
  return (
    opened && (
      <div className={styles.container}>
        {!loading && userType == 'Seller' && <div className={styles.special}>
          <div className={styles.specialSpace}></div>
          <img src="src/components/NotificationsContainer/xchg.svg" alt="special" className={styles.specialImg} title="Barters" onClick={handleGoToBarters}/>
        </div>}
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
