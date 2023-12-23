import styles from "./AddProduct.module.css";
import Button from "../Button/Button";
import { useReducer } from "react";

const initialState = {
  name: "",
  image: "",
  prerelease: false,
  price: NaN,
  discription: "",
  storedin: 0,
  quantity: NaN,
  category: "",
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

function AddProduct() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE", payload: name, value });
  };

  const handleChangeint = (e) => {
    const { name, value } = e.target;
    const tmp = parseInt(value);
    dispatch({ type: "CHANGE", payload: name, value: tmp });
  };

  const handleChangebool = (e) => {
    const { name, checked } = e.target;
    dispatch({ type: "CHANGE", payload: name, value: checked });
  };

  const handleSubmit = () => {
    fetch("http://localhost:3000/api/v1/product", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Name: state.name,
        Image: state.image,
        PreRelease: state.prerelease,
        Price: state.price,
        Description: state.discription,
        StoredIn: state.storedin,
        Quantity: state.quantity,
        Category: state.category,
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
    <form action="" className={styles.add_product}>
      <div className={styles.add_product_content}>
        <input
          placeholder="Product Name"
          required
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <input
          placeholder="Product Image Link"
          required
          type="text"
          name="image"
          value={state.image}
          onChange={handleChange}
        />
        <div className={styles.check}>
          <label>Prereleased? </label>
          <input
            required
            type="checkbox"
            name="prerelease"
            checked={state.prerelease}
            onChange={handleChangebool}
          />
        </div>

        <input
          placeholder="Price"
          required
          type="number"
          name="price"
          value={state.price}
          onChange={handleChangeint}
        />
        <input
          placeholder="Discription"
          required
          type="text"
          name="discription"
          value={state.discription}
          onChange={handleChange}
        />
        <input
          placeholder="Quantity"
          required
          type="number"
          name="quantity"
          value={state.quantity}
          onChange={handleChange}
        />
        <input
          placeholder="Category"
          required
          type="text"
          name="category"
          value={state.category}
          onChange={handleChange}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Add
      </button>
    </form>
  );
}

export default AddProduct;
