import AuctionsList from "../../components/AuctionsList/AuctionsList";
import styles from "./AuctionsPage.module.css";
import { useState, useEffect } from "react";
function AuctionsPage() {
  return (
    <div className={styles.all_auctions}>
      <AuctionsList auctions={auctions} />
    </div>
  );
}

export default AuctionsPage;
