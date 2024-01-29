import styles from "./AddReview.module.css";
import StarRating from "../../components/StarRating/StarRating";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function AddReview({ isSuccessfulSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  function handleRatingChange(rating) {
    setRating(rating);
  }
  function handleSubmit() {
    if (!isLoggedIn) {
      alert("Please login to add a review");
      return;
    }
    if (rating == 0) {
      alert("Please select a rating");
      return;
    }
    if (comment == "") {
      alert("Please enter a comment");
      return;
    }
    fetch(`https://my-backend-2l7i.onrender.com/api/v1/review/${id}`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        rating: rating,
        comment: comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          alert("Review added successfully");
          setSuccess(true);
          window.location.reload();
          //this should be modified to state update to make this functionality not this 3abath
        } else {
          alert("Error adding review");
          console.log(data);
          setSuccess(false);
        }
      });
  }
  useEffect(() => {
    isSuccessfulSubmit(success);
  }, [success, isSuccessfulSubmit]);

  function handleCommentChange(e) {
    setComment(e.target.value);
  }
  return (
    <div className={styles.add_review}>
      <div className={styles.header}>
        <h1>Add Review</h1>
      </div>
      <div className={styles.review}>
        <div className={styles.rating}>
          <StarRating onSetRating={handleRatingChange} />
        </div>
        <div className={styles.comment}>
          <textarea
            placeholder="Comment"
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <div className={styles.submit}>
          <Button text="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default AddReview;
