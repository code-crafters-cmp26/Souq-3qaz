import styles from "./AuctionCard.module.css";
// import { Link } from "react-router-dom";
function AuctionCard({ auction }) {
  return (
    <div className={styles.auction_card}>
      {/* <Link to={`${Auction.id}`}> */}
      <img src="./src/components/AuctionCard/Iphone.jpeg" />
      <p>Product: {auction.productid}</p>
      <p>Seller: {auction.sellerid}</p>
      <p>Date: {auction.date}</p>
      {auction.quantity > 0 && (
        <p>
          Quantity: <span>{auction.quantity}</span>
        </p>
      )}
      {auction.quantity == 0 && <p style={{ color: "red" }}>Out of stock!</p>}
      {/* </Link> */}
    </div>
  );
}

export default AuctionCard;
