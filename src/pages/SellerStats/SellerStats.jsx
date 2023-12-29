import React, { useEffect, useState } from 'react';
import BeautifulTable from '../../components/Table/Table';

function SellerStats() {
  const [sellerData, setSellerData] = useState([]);

  // Define your custom columns for SellerStats
  const sellerColumns = React.useMemo(
    () => [
      { Header: 'Transaction ID', accessor: 'transactionid' },
      { Header: 'Customer ID', accessor: 'customerid' },
      { Header: 'Product ID', accessor: 'productid' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'From Auction', accessor: 'fromauction' },
      { Header: 'Returned', accessor: 'returned' },
      { Header: 'Shipped Via', accessor: 'shippedvia' },
      { Header: 'Quantity', accessor: 'quantity' },
      { Header: 'Shipment ID', accessor: 'shipmentid' },
    ],
    []
  );

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/buy`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSellerData(data.retult);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Seller Stats</h1>
      <BeautifulTable data={sellerData} columns={sellerColumns} groupBy={'productid'} orderBy={[{ id: 'quantity' }]} />
    </div>
  );
}

export default SellerStats;
