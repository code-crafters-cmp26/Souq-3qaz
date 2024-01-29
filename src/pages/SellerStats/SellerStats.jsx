import React, { useEffect, useState } from "react";
import BeautifulTable from "../../components/Table/Table";
import styles from "./SellerStats.module.css";

function CustomerStats() {
  const [sellerData, setSellerData] = useState([]);

  // Define your custom columns for SellerStats
  const sellerColumns = React.useMemo(
    () => [
      { Header: "Transaction ID", accessor: "transactionid" },
      { Header: "Customer ID", accessor: "customerid" },
      { Header: "Product ID", accessor: "productid" },
      { Header: "Product Name", accessor: "name" },
      { Header: "Product Price", accessor: "price" },
      { Header: "Date", accessor: "date" },
      { Header: "From Auction", accessor: "fromauction" },
      { Header: "Returned", accessor: "returned" },
      { Header: "Shipped Via", accessor: "shippedvia" },
      { Header: "Quantity", accessor: "quantity" },
      { Header: "Shipment ID", accessor: "shipmentid" },
    ],
    []
  );

  useEffect(() => {
    fetch(`https://my-backend-2l7i.onrender.com/api/v1/buy`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSellerData(data.retult);
        // itirate over data.retult[i].fromauction and set it to yes or no and same for returned
        for (let i = 0; i < data.retult.length; i++) {
          if (data.retult[i].fromauction == 1) {
            data.retult[i].fromauction = "Yes";
          } else {
            data.retult[i].fromauction = "No";
          }
          if (data.retult[i].returned == 1) {
            data.retult[i].returned = "Yes";
          } else {
            data.retult[i].returned = "No";
          }
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className={styles.stats}>
      <h1>Seller Stats</h1>
      <BeautifulTable
        data={sellerData}
        columns={sellerColumns}
        groupBy={"productid"}
        orderBy={[{ id: "quantity" }]}
      />
    </div>
  );
}

export default CustomerStats;
