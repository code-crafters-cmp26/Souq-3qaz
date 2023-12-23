import { useEffect, useState } from "react";
import CategoriesBar from "../../components/CategoriesBar/CategoriesBar";
import ProductsList from "../../components/ProductsList/ProductsList";
import styles from "./ProductsPage.module.css";
function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/product", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        console.log(data.products);
      });
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
