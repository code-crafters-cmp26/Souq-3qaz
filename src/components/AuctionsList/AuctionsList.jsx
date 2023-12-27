import AuctionCard from "../AuctionCard/AuctionCard";
import styles from "./AuctionsList.module.css";
function AuctionsList({ auctions }) {
  return (
    <div className={styles.auctions_list}>
      {auctions.map((auction) => (
        <div key={auction.auctionid}>
          <AuctionCard auction={auction} />
          <AuctionCard auction={auction} />
          <AuctionCard auction={auction} />
          <AuctionCard auction={auction} />
          <AuctionCard auction={auction} />
          <AuctionCard auction={auction} />
          <AuctionCard auction={auction} />
          <AuctionCard auction={auction} />
          <AuctionCard auction={auction} />
          <AuctionCard auction={auction} />
        </div>
      ))}
    </div>
  );
}

export default AuctionsList;
