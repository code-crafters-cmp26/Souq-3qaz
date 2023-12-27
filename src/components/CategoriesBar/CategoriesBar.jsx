import Button from "../Button/Button";
import styles from "./CategoriesBar.module.css";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
function CategoriesBar() {
  const { categories } = useAuth();

  const currentcateg = new URLSearchParams(location.search).get("categ");
  const navigate = useNavigate();

  const handleFilterCateg = (c) => {
    const params = new URLSearchParams(location.search);

    if (currentcateg) {
      params.set("categ", c);
    } else {
      params.append("categ", c);
    }

    // Use navigate to replace the current URL with the updated query string
    navigate({ search: params.toString() });
    //navigate(`?categ=${c}`); // the above code if many query parameters collide
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
        <p>100 to 200 EGP</p>
        <p>200 to 300 EGP</p>
        <p>300 to 400 EGP</p>
        <p>400 & above</p>
        <div className={styles.by_price_input}>
          <div>
            <input type="text" placeholder="MIN" />
            <label>EGP</label>
          </div>
          <div>
            <input type="text" placeholder="MAX" />
            <label>EGP</label>
          </div>
          <Button type="button" text="GO" />
        </div>
      </div>
    </div>
  );
}

export default CategoriesBar;
