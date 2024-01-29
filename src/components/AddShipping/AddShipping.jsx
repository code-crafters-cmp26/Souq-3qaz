import styles from "./AddShipping.module.css";
import { useReducer } from "react";

const initialState = {
  email: "",
  Name: "",
  priceperkm: "",
  buildingnumber: "",
  country: "",
  city: "",
  street: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.payload]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

function AddShipping() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE", payload: name, value });
  };

  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //   if (emailRegex.test(emailInput)) {
  //     alert('Valid email address!');
  // } else {
  //     alert('Invalid email address. Please enter a valid email.');
  // }

  const handleSubmit = (e) => {
    if (emailRegex.test(state.email)) {
      e.preventDefault();
      fetch("https://my-backend-2l7i.onrender.com/api/v1/shipping", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: state.email,
          name: state.Name,
          priceperkm: parseInt(state.priceperkm),
          buildingnumber: parseInt(state.buildingnumber),
          country: state.country,
          city: state.city,
          street: state.street,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // if (data.status == "success") {
          console.log(data);
          dispatch({ type: "RESET" });
          if (data.status != "success") alert(data.message);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      alert("enter a valid email");
    }
  };

  return (
    <form action="" className={styles.add_shipping}>
      <div className={styles.add_shipping_content}>
        <input
          placeholder="Email"
          required
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          placeholder="Name"
          required
          type="text"
          name="Name"
          value={state.Name}
          onChange={handleChange}
        />
        <input
          placeholder="Price Per KM"
          required
          type="number"
          name="priceperkm"
          value={state.priceperkm}
          onChange={handleChange}
        />
        <input
          placeholder="Building Number"
          required
          type="number"
          name="buildingnumber"
          value={state.buildingnumber}
          onChange={handleChange}
        />
        <input
          placeholder="Country"
          required
          type="text"
          name="country"
          value={state.country}
          onChange={handleChange}
        />
        <input
          placeholder="City"
          required
          type="text"
          name="city"
          value={state.city}
          onChange={handleChange}
        />
        <input
          placeholder="Street"
          required
          type="text"
          name="street"
          value={state.street}
          onChange={handleChange}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Add
      </button>
    </form>
  );
}

export default AddShipping;
