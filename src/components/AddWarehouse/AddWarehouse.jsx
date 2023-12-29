import styles from "./AddWarehouse.module.css";
import { useReducer } from "react";

const initialState = {
  maxQuantity: "",
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

function AddWarehouse() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE", payload: name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/Warehouse", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        maxQuantity: parseInt(state.maxQuantity),
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
        console.log(data);
        dispatch({ type: "RESET" });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <form action="" className={styles.add_warehouse}>
      <div className={styles.add_warehouse_content}>
        <input
          placeholder="Max Quantity"
          required
          type="number"
          name="maxQuantity"
          value={state.maxQuantity}
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

export default AddWarehouse;
