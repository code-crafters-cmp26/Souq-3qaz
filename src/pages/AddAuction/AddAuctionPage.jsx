import { useParams } from "react-router-dom";
import AddAuction from "../../components/AddAuction/AddAuction";
import styles from "./AddAuctionPage.module.css";

function AddAuctionPage() {
  const { id } = useParams();
  return (
    <div className={styles.add_auction_page}>
      <AddAuction productID={id} />
    </div>
  );
}

export default AddAuctionPage;
