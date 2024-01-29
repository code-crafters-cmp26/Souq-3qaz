import styles from "./TicketsContainer.module.css";
import { useEffect, useState } from "react";
import Ticket from "../Ticket/Ticket";

function TicketsContainer() {
  const [tickets, setTickets] = useState([]);
  // id, title, status, date, reporter, reported, description

  useEffect(() => {
    fetch("https://my-backend-2l7i.onrender.com/api/v1/report", {
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
        console.log(data);
        setTickets(data.reports);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className={styles.tickets_container}>
      {tickets?.map((t) => {
        return (
          <Ticket
            key={t.id}
            id={t.reportid}
            category={t.category}
            date={t.date}
            reporter={t.customerid}
            reported={t.sellerid}
            description={t.description}
          />
        );
      })}
    </div>
  );
}

export default TicketsContainer;
