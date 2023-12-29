import styles from "./Employee.module.css";
import Card from "../../components/Card/Card";
import { useReducer, useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/Button/Button";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpassword: "",
  phonenumber: "",
  gender: "",
  startdate: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

function Employee() {
  const [cardnumber, setCardNumber] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmit(e) {
    console.log(
      state.firstname,
      state.lastname,
      state.phonenumber,
      state.email,
      state.password,
      state.gender,
      state.startdate
    );
    fetch("http://localhost:3000/api/v1/employee", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        FName: state.firstname,
        LName: state.lastname,
        PhoneNumber: state.phonenumber,
        Email: state.email,
        Password: state.password,
        Gender: state.gender,
        start_working_date: state.startdate + " 00:00:00",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE", field: name, value });
  };

  const handleClick = (i) => {
    setCardNumber(i);
  };

  return (
    <div className={styles.employee}>
      {cardnumber == 0 && (
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
      {cardnumber == 2 && (
        <div className={styles.addemployee}>
          <Card
            img="src/pages/Employee/add.svg"
            title="Add Employee"
            description="Add new employee"
            onClick={() => handleClick(0)}
          />
          <div className={styles.addemployeeform}>
            <Input
              text="Firstname"
              name="firstname"
              type="text"
              value={state.firstname}
              handlevalue={handleChange}
            />
            <Input
              text="lastname"
              name="lastname"
              type="text"
              value={state.lastname}
              handlevalue={handleChange}
            />
            <Input
              text="phonenumber"
              name="phonenumber"
              type="number"
              value={state.phonenumber}
              handlevalue={handleChange}
            />
            <Input
              text="email"
              name="email"
              type="email"
              value={state.email}
              handlevalue={handleChange}
            />
            <Input
              text="password"
              name="password"
              type="password"
              value={state.password}
              handlevalue={handleChange}
            />
            <Input
              text="confirm password"
              name="confirmpassword"
              type="password"
              value={state.confirmpassword}
              handlevalue={handleChange}
            />
            <Input
              text="gender"
              name="gender"
              type="text"
              value={state.gender}
              handlevalue={handleChange}
            />
            <Input
              text="start working date"
              name="startdate"
              type="date"
              value={state.startdate}
              handlevalue={handleChange}
            />
            <Button text="Insert Employee" onClick={handleSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Employee;
