import AddProduct from "../../components/AddProduct/AddProduct";
import styles from "./AddProductPage.module.css";

function AddProductPage() {
  return (
    <div className={styles.add_product_page}>
      <AddProduct />
    </div>
  );
}

export default AddProductPage;
