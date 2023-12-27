import styles from "./AllBarters.module.css";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import { useEffect, useState } from "react";
import BarterCard from "../../components/BarterCard/BarterCard";
function AllBarters() {
    const { userType, userData } = useAuth();
    const [loading, setLoading] = useState(true);
    const [myBarters, setMyBarters] = useState([]);
    const [otherBarters, setOtherBarters] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/barter/`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setMyBarters(data.yourBendingBarters);
                setOtherBarters(data.offersToYou);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    return (
        <div className={styles.all_barters}>
            {!loading && <div className={styles.all_barters_container}>
                <div className={styles.barters_group}>
                    <h1 className={styles.barters_group_title}>Your Pending Barters</h1>
                    {myBarters.map((barter) => (
                        <div key={barter.barterId}>
                            <BarterCard barterData={barter} isMine={true} />
                        </div>
                    ))}
                </div>
                <div className={styles.barters_group}>
                    <h1 className={styles.barters_group_title}>Offers to You</h1>
                    {otherBarters.map((barter) => (
                        <div key={barterId.id}>
                            <BarterCard barterData={barter} isMine={false} />
                        </div>
                    ))}
                </div>
            </div>
            }
        </div>
    )
}

export default AllBarters