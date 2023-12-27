import { useEffect, useState } from "react";
import CategoriesBar from "../../components/CategoriesBar/CategoriesBar";
import ProductsList from "../../components/ProductsList/ProductsList";
import styles from "./ProductsPage.module.css";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

function ProductsPage({ ofseller }) {
  const location = useLocation();
  const issearched = new URLSearchParams(location.search).get("name");
  const categ = new URLSearchParams(location.search).get("categ");
  const minprice = new URLSearchParams(location.search).get("min");
  const maxprice = new URLSearchParams(location.search).get("max");
  const [products, setProducts] = useState([]);
  const { userData } = useAuth();

  useEffect(() => {
    if (ofseller == 0) getProductsOfSeller();
    else if (issearched != null) {
      fetch(`http://localhost:3000/api/v1/product/searchProduct`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          productName: issearched,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("from search");
          setProducts(data.products);
        });
    } else {
      // Fetch all products when issearched is empty
      fetch("http://localhost:3000/api/v1/product", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          console.log("from normal");
        });
    }
  }, [issearched]);

  const getProductsOfSeller = () => {
    console.log(userData);
    fetch(
      `http://localhost:3000/api/v1/product/searchBySeller/${userData.id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        console.log(data.products);
      });
  };

  return (
    <div className={styles.products_page}>
      <CategoriesBar />
      <div className={styles.all_products}>
        <ProductsList
          products={products}
          category={categ}
          min={minprice}
          max={maxprice}
        />
      </div>
    </div>
  );
}

export default ProductsPage;
