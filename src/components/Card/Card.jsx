import styles from "./Card.module.css";
function Card({ img, title, description, onClick }) {
  return (
    <div
      className={styles.profile_page__cards_grid__card}
      onClick={onClick ? onClick : {}}
    >
      <img src={img} alt={title} />
      <div className={styles.profile_page__cards_grid__card__info}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Card;
