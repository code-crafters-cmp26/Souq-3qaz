import { useState } from "react";
import styles from "./AuctionCard.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
function AuctionCard({ auction }) {
  const [viewed, setViewed] = useState(false);
  const [biddingQuantity, setBiddingQuantity] = useState("");
  const navigate = useNavigate();

  const handleChangeViewed = () => {
    console.log(
      auction.productid,
      auction.productname,
      auction.firstname,
      auction.lastname
    );
    setViewed((v) => !v);
  };

  const handleChangeBiddingQuantity = (e) => {
    setBiddingQuantity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/auction/bid", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        bid: parseInt(biddingQuantity),
        auctionId: parseInt(auction.acutionid),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setBiddingQuantity("");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleViewProduct = () => {
    navigate(`/products/${auction.productid}`);
  };

  return (
    <div className={styles.auction_card}>
      <img src="./src/components/AuctionCard/Iphone.jpeg" />
      <div className={styles.auction_card_right}>
        <div className={styles.auction_card_contents}>
          <p>Product: {auction.productname}</p>
          <p>
            Seller: {auction.firstname} {auction.lastname}
          </p>
          <p>Date: {auction.date}</p>
          {auction.quantity > 0 && (
            <p>
              Quantity: <span>{auction.quantity}</span>
            </p>
          )}
          {auction.quantity == 0 && (
            <p style={{ color: "red" }}>Out of stock!</p>
          )}
        </div>
        <div className={styles.buttons}>
          <Button
            text="View Product"
            type="button"
            onClick={handleViewProduct}
          />
          <Button text="Add Bid" type="button" onClick={handleChangeViewed} />
        </div>

        {viewed && (
          <div className={styles.bidding}>
            <input
              placeholder="Enter Bidding Quantity"
              type="number"
              value={biddingQuantity}
              onChange={handleChangeBiddingQuantity}
            />
            <Button text="Bid" onClick={handleSubmit} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AuctionCard;
