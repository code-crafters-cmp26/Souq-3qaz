import styles from './Review.module.css'
import StarRating from "../../components/StarRating/StarRating";
import { useState } from 'react';

function Review() {
  const [rating, setRating] = useState(0);
  function handleRatingChange(rating) {
    setRating(rating);
  }
  function handleSubmit() {
    
  }
  return (
    <div className={styles.review}>
    
    </div>
  )
}

export default Review