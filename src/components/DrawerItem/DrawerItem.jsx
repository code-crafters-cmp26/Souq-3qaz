import styles from "./DrawerItem.module.css"
//takes in a string prop called "text"
function DrawerItem( {title} ) {
  return (
    <div className={styles.drawer_item}>
      <h3>{title}</h3>
    </div>
  )
}

export default DrawerItem;
