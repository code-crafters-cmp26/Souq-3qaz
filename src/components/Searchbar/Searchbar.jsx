import { useEffect, useState } from "react";
import styles from "./searchbar.module.css";
import { useNavigate } from "react-router-dom";
function Searchbar() {
  const [searchtxt, setSearchtxt] = useState("");
  const [result, setResult] = useState([]);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/product/searchProduct`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        productName: searchtxt,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.products);
        setResult(data.products);
      });
  }, [searchtxt]);

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchtxt(e.target.value);
  };

  const handleEntered = () => {
    //navigate(`/products`);
    setOpened(true);
  };

  const handleLeft = () => {
    setTimeout(() => {
      setOpened(false);
    }, 500);
  };

  const handleSearchProduct = (id) => {
    navigate(`/products/${id}`);
    //what do we use to continur on the url ?
  };

  const handleSearchProducts = () => {
    const params = new URLSearchParams(location.search);

    if (searchtxt) {
      params.set("name", searchtxt);
    } else {
      params.delete("name");
    }

    // Use navigate to replace the current URL with the updated query string
    navigate({ search: params.toString() });
    //navigate(`/products?name=${searchtxt}`);
    //what do we use to continur on the url ?
  };

  const handleKeyDown = (e) => {
    // Check if the pressed key is "Enter"

    if (e.key === "Enter") {
      handleSearchProducts();
    }
  };
  return (
    <>
      <input
        placeholder="Search"
        className={styles.searchbar}
        type="text"
        id="searchbar"
        name="searchbar"
        value={searchtxt}
        onChange={handleSearchChange}
        onFocus={handleEntered}
        onBlur={handleLeft}
        onKeyDown={handleKeyDown}
      />

      {opened && (
        <div className={styles.searchresult}>
          {result?.map((product) => (
            <>
              <div
                className={styles.searchelement}
                key={product.id}
                onClick={() => handleSearchProduct(product.id)}
              >
                {product.name}
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
}

export default Searchbar;
