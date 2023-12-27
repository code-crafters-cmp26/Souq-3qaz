import { useEffect, useState } from "react";
import CategoriesBar from "../../components/CategoriesBar/CategoriesBar";
import ProductsList from "../../components/ProductsList/ProductsList";
import styles from "./ProductsPage.module.css";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

function ProductsPage({ ofseller }) {
  const [products, setProducts] = useState([]);
  const { userData } = useAuth();

  const getAllProducts = () => {
    fetch("http://localhost:3000/api/v1/product", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        console.log(data.products);
      });
  };

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
  useEffect(() => {
    if (ofseller == 0) getAllProducts();
    else getProductsOfSeller();
  }, []);
  return (
    <div className={styles.products_page}>
      <CategoriesBar />
      <div className={styles.all_products}>
        <ProductsList products={products} />
      </div>
    </div>
  );
}

export default ProductsPage;
