import CategoriesBar from "../../components/CategoriesBar/CategoriesBar";
import ProductsList from "../../components/ProductsList/ProductsList";
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
    <div className={styles.auctions_page}>
      <CategoriesBar />
      <div className={styles.all_products}>
        <ProductsList />
      </div>
    </div>
  );
}

export default AuctionsPage;
