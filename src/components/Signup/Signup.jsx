import styles from "./Signup.module.css";
import Input from "../../components/input/Input";
import Button from "../Button/Button";
import { useReducer } from "react";
import { useLocation } from "react-router-dom";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpassword: "",
  gender: "",
  nationalid: "",
  phonenumber: "",
  country: "",
  city: "",
  street: "",
  buildingnumber: "",
  apartmentnumber: "",
  stage: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.field]: action.value };
    case "NEXT":
      return {
        ...state,
        stage: state.stage < 2 ? state.stage + 1 : state.stage,
      };
    case "BACK":
      return {
        ...state,
        stage: state.stage >= 1 ? state.stage - 1 : state.stage,
      };
    default:
      return state;
  }
};

function Signup() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const location = useLocation();
  const userType = new URLSearchParams(location.search).get("userType");

  const isFirstStageComplete = Object.values(state)
    .slice(0, 5)
    .every((value) => value !== "");

  const isSecondStageComplete = Object.values(state)
    .slice(5, 11)
    .every((value) => value !== "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE", field: name, value });
  };

  const handleNext = () => {
    dispatch({ type: "NEXT" });
  };

  const handleBack = () => {
    dispatch({ type: "BACK" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    fetch("http://localhost:3000/api/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        FName: state.firstname,
        LName: state.lastname,
        PhoneNumber: state.phonenumber,
        Email: state.email,
        Password: state.password,
        Gender: state.gender,
        ApartmentNumber: state.apartmentnumber,
        BuildingNumber: state.buildingnumber,
        Country: state.country,
        City: state.city,
        Street: state.street,
        role: "Customer", //enum of {'Seller','Customer'}
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
  };

  return (
    <form action="" className={styles.signup__form}>
      <h1 className={styles.signup__title}>Registration</h1>
      <div className={styles.numbers}>
        <div className={state.stage >= 0 ? styles.active : ""}>1</div>
        <div className={state.stage >= 1 ? styles.active : ""}>2</div>
        <div className={state.stage >= 2 ? styles.active : ""}>3</div>
      </div>

      {state.stage == 0 && (
        <div className={styles.signup__content}>
          <Input
            text="Firstname"
            name="firstname"
            type="text"
            value={state.firstname}
            handlevalue={handleChange}
          />
          <Input
            text="Lastname"
            name="lastname"
            type="text"
            value={state.lastname}
            handlevalue={handleChange}
          />
          <Input
            text="Email"
            type="email"
            name="email"
            value={state.email}
            handlevalue={handleChange}
          />
          <Input
            text="Password"
            type="password"
            name="password"
            value={state.password}
            handlevalue={handleChange}
          />
          <Input
            text="Confirm Password"
            type="password"
            name="confirmpassword"
            value={state.confirmpassword}
            handlevalue={handleChange}
          />
        </div>
      )}

      {/* phonenumber: "",
  city: "",
  street: "",
  country: "",
  gender: "", */}
      {state.stage == 1 && (
        <div className={styles.signup__content}>
          <Input
            text="gender"
            type="text"
            name="gender"
            value={state.gender}
            handlevalue={handleChange}
          />
          {userType == "seller" && (
            <Input
              text="National ID"
              type="number"
              name="nationalid"
              value={state.nationalid}
              handlevalue={handleChange}
            />
          )}
          <Input
            text="Phone Number"
            type="number"
            name="phonenumber"
            value={state.phonenumber}
            handlevalue={handleChange}
          />
          <p>Address:</p>
          <Input
            text="Country"
            type="text"
            name="country"
            value={state.country}
            handlevalue={handleChange}
          />
          <Input
            text="City"
            type="text"
            name="city"
            value={state.city}
            handlevalue={handleChange}
          />
          <Input
            text="Street"
            type="text"
            name="street"
            value={state.street}
            handlevalue={handleChange}
          />
          <Input
            text="Building Number"
            type="text"
            name="buildingnumber"
            value={state.buildingnumber}
            handlevalue={handleChange}
          />
          <Input
            text="Apartment Number&emsp; &emsp; &emsp; &emsp; &emsp;optional"
            type="number"
            name="apartmentnumber"
            value={state.apartmentnumber}
            handlevalue={handleChange}
          />
        </div>
      )}
      {state.stage == 2 && (
        <div className={styles.done}>
          congratulations you have completed your regestration
        </div>
      )}
      <div className={styles.buttons}>
        <Button text="Back" type="button" onClick={handleBack} />
        <Button
          text="Next"
          type="button"
          onClick={handleNext}
          disabled={
            state.stage == 0 ? !isFirstStageComplete : !isSecondStageComplete
          }
        />
      </div>
      {state.stage == 2 && (
        <>
          <Button text="Signup" type="submit" onClick={handleSubmit} />
        </>
      )}
    </form>
  );
}

export default Signup;
