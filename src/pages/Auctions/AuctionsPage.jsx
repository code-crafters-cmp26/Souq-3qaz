import AuctionsList from "../../components/AuctionsList/AuctionsList";
import styles from "./AuctionsPage.module.css";
import { useState, useEffect } from "react";
function AuctionsPage() {
  const [auctions, setAuctions] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/auction", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAuctions(data.result);
        console.log(data.result);
      });
  }, []);

  useEffect(() => {
    console.log(auctions);
  }, [auctions]);

  return (
    <div className={styles.all_auctions}>
      <AuctionsList auctions={auctions} />
    </div>
  );
}

export default AuctionsPage;
