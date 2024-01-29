import styles from "./BarterCard.module.css";
import ProductCard from "../ProductCard/ProductCard";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useEffect, useState } from "react";
import Button from "../Button/Button";

function BarterCard({ barterData, isMine }) {
  const { userType, userData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [myProduct, setMyProduct] = useState(null);
  const [otherProduct, setOtherProduct] = useState(null);
  useEffect(() => {
    fetch(
      `https://my-backend-2l7i.onrender.com/api/v1/product/${barterData.offeredproductid}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          //Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("salamo 3aleko");
        if (isMine) {
          setMyProduct(...data.products);
        } else {
          setOtherProduct(...data.products);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });

    fetch(
      `https://my-backend-2l7i.onrender.com/api/v1/product/${barterData.requistedproductid}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          //Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (isMine) {
          setOtherProduct(...data.products);
        } else {
          setMyProduct(...data.products);
        }
        setLoading2(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleAcceptBarter = () => {
    {
      if (barterData.donetrading == false) {
        fetch(`https://my-backend-2l7i.onrender.com/api/v1/barter/Approve`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            barterId: barterData.barterid,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            console.log("hola");

            //window.location.reload();
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    }
  };

  return (
    <>
      {!loading && !loading2 && (
        <div className={styles.barter_card_container}>
          <div className={styles.barter_card_product}>
            <h2 className={styles.barter_card_title}>
              {isMine ? "Your Offered Product" : "Product Requested from You"}
            </h2>
            <ProductCard product={myProduct} />
            <h3>
              Quantity:{" "}
              {isMine
                ? barterData.offeredproductidquantity
                : barterData.requistedproductidquantity}
            </h3>
          </div>
          <div className={styles.barter_card_product}>
            <h2 className={styles.barter_card_title}>
              {isMine ? "Your Requested Product" : "Product Offered to You"}
            </h2>
            <ProductCard product={otherProduct} />
            <h3>
              Quantity:{" "}
              {!isMine
                ? barterData.offeredproductidquantity
                : barterData.requistedproductidquantity}
            </h3>
          </div>
          {!isMine && !barterData.donetrading && (
            <Button text="Accept Barter" onClick={handleAcceptBarter} />
          )}
        </div>
      )}
    </>
  );
}

export default BarterCard;
