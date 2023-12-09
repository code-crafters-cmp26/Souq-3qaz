import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsList.module.css";
function ProductsList(products) {
  return (
    <div className={styles.products_list}>
      {/* {products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))} */}
    </div>
  );
}

export default ProductsList;
