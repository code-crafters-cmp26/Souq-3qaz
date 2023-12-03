import styles from "./searchbar.module.css";
function Searchbar() {
  return (
    <input
      placeholder="Search"
      className={styles.searchbar}
      type="text"
      id="searchbar"
      name="searchbar"
    />
  );
}

export default Searchbar;
