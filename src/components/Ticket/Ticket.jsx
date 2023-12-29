import styles from "./Ticket.module.css";
import { useState } from "react";

function Ticket({ id, category, date, reporter, reported, description }) {
  const [show, setShow] = useState(false);
  // const [selectedStatus, setSelectedStatus] = useState("new");

  function toggleShow() {
    setShow(!show);
  }

  // function handleStatusChange(event) {
  //   setSelectedStatus(event.target.value);
  // }

  // function handleSave() {
  //   setStatus(selectedStatus);
  // }
  return (
    <div className={styles.ticket}>
      <div className={styles.ticket__header} onClick={toggleShow}>
        <h3 className={styles.ticket__id}>ID: {id}</h3>
        <h3>Category: {category}</h3>
        <h3>Date: {date}</h3>
      </div>
      <div
        className={styles.ticket__body}
        style={{ display: show ? "block" : "none" }}
      >
        <h3>Reporter: {reporter}</h3>
        <h3>Reported: {reported}</h3>
        <p>Description: {description}</p>
      </div>
    </div>
  );
}

export default Ticket;

{
  /* <select
            name="status"
            id="status"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="on_hold">On Hold</option>
            <option value="pending_customer_response">
              Pending Customer Response
            </option>
            <option value="resolved">Resolved</option>
            <option value="reopened">Reopened</option>
            <option value="escalated">Escalated</option>
            <option value="waiting_for_third_party_resolution">
              Waiting for Third-Party Resolution
            </option>
            <option value="feedback_requested">Feedback Requested</option>
            <option value="cancelled">Cancelled</option>
          </select>
        <div className={styles.ticket__status_setters}>
          
          <button onClick={handleSave}>Set Status</button> */
}
