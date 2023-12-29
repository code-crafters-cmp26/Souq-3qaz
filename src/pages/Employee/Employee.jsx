import styles from "./Employee.module.css";
import Card from "../../components/Card/Card";
import { useState } from "react";

function Employee() {
  const [openedCard, setOpenedCard] = useState(0);

  const handleClick = (i) => {
    setOpenedCard(i);
  };

  return (
    <div className={styles.employee}>
      {openedCard == 0 && (
        <>
          <div className={styles.header}>
            <h1>Welcome, Employee</h1>
          </div>
          <div className={styles.grid_cont}>
            <Card
              img="src/pages/Employee/report.svg"
              title="Reports"
              description="View reports"
            />
            <Card
              img="src/pages/Employee/add.svg"
              title="Add Employee"
              description="Add new employee"
              onClick={() => handleClick(2)}
            />
            <Card
              img="src/pages/Employee/user.svg"
              title="Users"
              description="View users"
            />
            <Card
              img="src/pages/Employee/pro.svg"
              title="Products"
              description="View products"
            />
          </div>
        </>
      )}

      {openedCard == 2 && (
        <div className={styles.addemployee}>
          <Card
            img="src/pages/Employee/add.svg"
            title="Add Employee"
            description="Add new employee"
            onClick={() => handleClick(0)}
          />
          <div>hola</div>
        </div>
      )}
    </div>
  );
}

export default Employee;
