import { useEffect } from "react";
import AuctionCard from "../AuctionCard/AuctionCard";
import styles from "./AuctionsList.module.css";

function AuctionsList({ auctions }) {
  return (
    <div className={styles.auctions_list}>
      {auctions.length > 0 ? (
        auctions.map((auction) => (
          <AuctionCard key={auction.acutionid} auction={auction} />
        ))
      ) : (
        <h1 className={styles.message}>No auctions available</h1>
      )}
    </div>
  );
}

export default AuctionsList;
