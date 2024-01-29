import { useNavigate } from "react-router-dom";
import styles from "./AddAuction.module.css";
import { useState } from "react";

function AddAuction({ productID }) {
  const [q, setQ] = useState("");
  const [intialP, setInitialP] = useState("");

  const handleChangeQ = (e) => {
    setQ(e.target.value);
  };
  const handleChangeInitialP = (e) => {
    setInitialP(e.target.value);
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://my-backend-2l7i.onrender.com/api/v1/auction/", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        productId: parseInt(productID),
        quantity: parseInt(q),
        intialPrice: parseInt(intialP),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/products");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <form action="" className={styles.add_auction}>
      <div className={styles.add_auction_content}>
        <input
          placeholder="Initial Price"
          required
          type="number"
          value={intialP}
          onChange={handleChangeInitialP}
        />
        <input
          placeholder="Quantity"
          required
          type="number"
          value={q}
          onChange={handleChangeQ}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Add
      </button>
    </form>
  );
}

export default AddAuction;
