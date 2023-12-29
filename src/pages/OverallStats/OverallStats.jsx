import React from 'react'
import styles from './OverallStats.module.css'
import HistogramChart from '../../components/Histo/Histo'
import { useState } from 'react'
import { useEffect } from 'react'
import { func } from 'prop-types'
function OverallStats() {
    const [users, setusers] = useState([])
    const [loading, setloading] = useState(true)
    const [normal, setnormal] = useState(0)
    const [premium, setpremium] = useState(0)
    const [seller, setseller] = useState(0)

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/user", {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-type": "application/json",
            },
        })

            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setusers([...data.customers, ...data.sellers])
                console.log(users)
                if(!loading)
                 {setCounts()}
                setloading(false)
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);
    function setCounts() {
        users.map((user) => {
            if (user.type == "normal") {
                setnormal(normal + 1)
            }
            else if (user.type == "premium") {
                setpremium(premium + 1)
            }
            else {
                setseller(seller + 1)
            }
        })
    }

    return (
        <div className={styles.overall_stats}>
            <div className={styles.header}>
                <h1>Overall Stats</h1>
            </div>
            <div className={styles.chart}>
                { <HistogramChart data={[normal, premium, seller]} labels={["Normal User", "Premium User", "Seller"]} />}
    
            </div>
        </div>
    )
}

export default OverallStats