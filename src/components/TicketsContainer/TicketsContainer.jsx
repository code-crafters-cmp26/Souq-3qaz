import styles from './TicketsContainer.module.css'
import { useState } from 'react'
import Ticket from '../Ticket/Ticket'


function TicketsContainer() {
  const [tickets, setTickets] = useState([])
  // id, title, status, date, reporter, reported, description 
  const testTickets = [[ "1", "non-legit product", "new", "2021-08-01", "bisy", "bisy", "this is a test ticket"], ["2", "non-legit product", "new", "2021-08-01", "bisy", "bisy", "this is a test ticket"], ["3", "non-legit product", "new", "2021-08-01", "bisy", "bisy", "this is a test ticket"], ["4", "non-legit product", "new", "2021-08-01", "bisy", "bisy", "this is a test ticket"]]
  function getTickets() {
    // fetch("http://localhost:3000/api/v1/ticket")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setTickets(data)
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  }

  return (
    <div className={styles.tickets_container}>
        {testTickets.map((ticket) => {
          return <Ticket id={ticket[0]} title={ticket[1]} status={ticket[2]} date={ticket[3]} reporter={ticket[4]} reported={ticket[5]} description={ticket[6]} />
        })}
    </div>
  )
}

export default TicketsContainer