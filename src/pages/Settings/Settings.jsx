import styles from "./Settings.module.css";
import Input from "../../components/input/Input";
import Button from "../../components/Button/Button";
import { useReducer } from "react";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import { useEffect } from "react";
import { useState } from "react";

function Settings() {
  const { userData, userType, setUserData } = useAuth();

  //TODO: stop here till the useAuth returns the user data
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    phonenumber: "",
    appartmentnumber: 0,
    buildingnumber: 0,
    street: "",
    city: "",
    country: "",
    theme: "",
    image: "",
    gender: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "CHANGE":
        return { ...state, [action.field]: action.value };
      default:
        return state;
    }
  };
  useEffect(() => {
    if (userData) {
      dispatch({
        type: "CHANGE",
        field: "firstname",
        value: userData.firstname,
      });
      dispatch({ type: "CHANGE", field: "lastname", value: userData.lastname });
      dispatch({ type: "CHANGE", field: "email", value: userData.email });
      dispatch({
        type: "CHANGE",
        field: "phonenumber",
        value: userData.phonenumber,
      });
      dispatch({
        type: "CHANGE",
        field: "appartmentnumber",
        value: userData.appartmentnumber,
      });
      dispatch({
        type: "CHANGE",
        field: "buildingnumber",
        value: userData.buildingnumber,
      });
      dispatch({ type: "CHANGE", field: "street", value: userData.street });
      dispatch({ type: "CHANGE", field: "city", value: userData.city });
      dispatch({ type: "CHANGE", field: "country", value: userData.country });
      dispatch({ type: "CHANGE", field: "theme", value: userData.theme });
      dispatch({ type: "CHANGE", field: "image", value: userData.image });
    }
  }, [userData]);

  const [state, dispatch] = useReducer(reducer, initialState);
  const role = userType === "seller" ? "Seller" : "Customer";
  const handlevalue = (e) => {
    dispatch({
      type: "CHANGE",
      field: e.target.name,
      value: e.target.value,
    });
  };
  const checkPassword = () => {
    if (state.password !== state.confirmpassword) {
      //|| state.password === ""
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const updateUserSettings = () => {
    fetch(`http://localhost:3000/api/v1/user/Customer/${userData.id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status != "success") alert(data.message);
        else {
          localStorage.setItem("userData", JSON.stringify(...data.customer));
          const storedUserData = localStorage.getItem("userData");
          setUserData(JSON.parse(storedUserData));
        }
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  const handleSubmit = (e) => {
    if (!checkPassword()) {
      //alert("two passwrods dont match try again");
      return;
    }
    e.preventDefault();
    console.log(state);
    //send post request to backend
    fetch("http://localhost:3000/api/v1/user/updateInfo", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        FName: state.firstname,
        LName: state.lastname,
        PhoneNumber: state.phonenumber,
        Gender: "Male",
        password: state.password,
        ApartmentNumber: state.appartmentnumber,
        BuildingNumber: state.buildingnumber,
        Country: state.country,
        City: state.city,
        Street: state.street,
        //role: role,
        //NID: "123456789",
        theme: state.theme,
        image: state.image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          alert("User updated successfully");
          //window.location.reload();
          updateUserSettings();
        } else {
          alert("Error updating user");
          console.log(data);
        }
      });
  };

  return (
    <div className={styles.settings}>
      <h1>Settings</h1>
      <form className={styles.form}>
        <h2>Personal Info</h2>
        <img src={state.image} alt="Avatar" className={styles.avatar} />
        <Input text="Change Picture" type="file" handlevalue={handlevalue} />
        <Input
          text="First Name"
          type="text"
          name="firstname"
          value={state.firstname}
          handlevalue={handlevalue}
        />
        <Input
          text="Last Name"
          type="text"
          name="lastname"
          value={state.lastname}
          handlevalue={handlevalue}
        />
        <Input
          text="Email"
          type="email"
          name="email"
          value={state.email}
          handlevalue={handlevalue}
        />
        <Input
          text="Phone Number"
          type="tel"
          name="phonenumber"
          value={state.phonenumber}
          handlevalue={handlevalue}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          value={state.password}
          handlevalue={handlevalue}
        />
        <Input
          text="Confirm Password"
          type="password"
          name="confirmpassword"
          value={state.confirmpassword}
          handlevalue={handlevalue}
        />
      </form>

      <form className={styles.form}>
        <h2>Address</h2>
        <Input
          text="Apartment Number"
          type="number"
          name="appartmentnumber"
          value={state.appartmentnumber}
          handlevalue={handlevalue}
        />
        <Input
          text="Building Number"
          type="number"
          name="buildingnumber"
          value={state.buildingnumber}
          handlevalue={handlevalue}
        />
        <Input
          text="Street"
          type="text"
          name="street"
          value={state.street}
          handlevalue={handlevalue}
        />
        <Input
          text="City"
          type="text"
          name="city"
          value={state.city}
          handlevalue={handlevalue}
        />
        <Input
          text="Country"
          type="text"
          name="country"
          value={state.country}
          handlevalue={handlevalue}
        />
      </form>
      <Button text="Save Changes" onClick={handleSubmit} />
      <form className={styles.form + " " + styles.delete}>
        <h2>Account Deletion</h2>
        <Input text="Password" type="password" />
        <Input text="Confirm Password" type="password" />
        <Button text="Delete Account" />
      </form>
    </div>
  );
}

export default Settings;
