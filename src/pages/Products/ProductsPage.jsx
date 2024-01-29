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
    if (ofseller == 1) getProductsOfSeller();
    else if (issearched != null) {
      getSearchedProducts();
    } else {
      // Fetch all products when issearched is empty
      getAllProducts();
    }
  }, [userData]);

  const getProductsOfSeller = () => {
    console.log("hola");
    console.log(userData);
    fetch(
      `https://my-backend-2l7i.onrender.com/api/v1/product/searchBySeller/${userData?.id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status != "success") alert(data.message);
        else setProducts(data.products);
        console.log(data.products);
      });
  };

  const getAllProducts = () => {
    fetch("https://my-backend-2l7i.onrender.com/api/v1/product", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status != "success") alert(data.message);
        else setProducts(data.products);
        console.log("from normal");
      });
  };

  const getSearchedProducts = () => {
    fetch(`https://my-backend-2l7i.onrender.com/api/v1/product/searchProduct`, {
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
        if (data.status != "success") alert(data.message);
        else {
          console.log("from search");
          setProducts(data.products);
        }
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
