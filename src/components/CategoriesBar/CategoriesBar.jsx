import Button from "../Button/Button";
import styles from "./CategoriesBar.module.css";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function CategoriesBar() {
  const { categories } = useAuth();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const currentcateg = new URLSearchParams(location.search).get("categ");
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const handleFilterCateg = (c) => {
    if (currentcateg) {
      params.set("categ", c);
    } else {
      params.append("categ", c);
    }

    // Use navigate to replace the current URL with the updated query string
    navigate({ search: params.toString() });
    //navigate(`?categ=${c}`); // the above code if many query parameters collide
  };
  const handleMinPrice = (e) => {
    setMinPrice(e.target.value);
  };
  const handleMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  };
  const handleFilterPrices = () => {
    if (maxPrice > 0 && maxPrice > minPrice) {
      params.set("min", minPrice);
      params.set("max", maxPrice);
      navigate({ search: params.toString() });
    }
  };
  return (
    <div className={styles.categories_bar}>
      <div className={styles.categories}>
        {categories.map((categ, index) => (
          <div
            className={styles.categories}
            key={index}
            onClick={() => handleFilterCateg(categ)}
          >
            {categ}
          </div>
        ))}
      </div>
      <div>
        <h4>Customer Reviews</h4>
        <p>🌟🌟🌟🌟⭐ & Up</p>
        <p>🌟🌟🌟⭐⭐ & Up</p>
        <p>🌟🌟⭐⭐⭐ & Up</p>
        <p>🌟⭐⭐⭐⭐& Up</p>
      </div>
      <div>
        <h4>Price</h4>

        <div className={styles.by_price_input}>
          <div>
            <input
              type="number"
              placeholder="MIN"
              value={minPrice}
              onChange={handleMinPrice}
            />
            <label>EGP</label>
          </div>
          <div>
            <input
              type="number"
              placeholder="MAX"
              value={maxPrice}
              onChange={handleMaxPrice}
            />
            <label>EGP</label>
          </div>
          <Button type="button" text="Filter" onClick={handleFilterPrices} />
        </div>
      </div>
    </div>
  );
}

export default CategoriesBar;
