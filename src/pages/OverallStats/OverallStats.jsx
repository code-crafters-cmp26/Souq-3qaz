import React from "react";
import styles from "./OverallStats.module.css";
import HistogramChart from "../../components/Histo/Histo";
import { useState } from "react";
import { useEffect } from "react";
import { func } from "prop-types";
function OverallStats() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [normal, setnormal] = useState(0);
  const [premium, setpremium] = useState(0);
  const [seller, setseller] = useState(0);

  const [min, setmin] = useState(0);
  const [max, setmax] = useState(0);
  const [avg, setavg] = useState(0);
  const [loading2, setloading2] = useState(true);

  useEffect(() => {
    fetch("https://my-backend-2l7i.onrender.com/api/v1/employee/stat", {
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
        setnormal(data.normal);
        setpremium(data.premium);
        setseller(data.seller);

        setloading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    fetch("https://my-backend-2l7i.onrender.com/api/v1/employee/avgTrans", {
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
        console.log("hola");
        console.log(data);
        setmin(data.min_price);
        setmax(data.max_price);
        setavg(data.avg_price);

        setloading2(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className={styles.overall_stats}>
      <div className={styles.header}>
        <h1>Overall Stats</h1>
      </div>
      <div key={1} className={styles.chart}>
        {
          <HistogramChart
            data={[normal, premium, seller]}
            labels={["Normal User", "Premium User", "Seller"]}
          />
        }
      </div>
      {/* <div key={2} className={styles.chart}>
        {
          <HistogramChart
            data={[min, max, avg]}
            labels={["min price", "max price", "avg price"]}
          />
        }
      </div> */}
    </div>
  );
}

export default OverallStats;
