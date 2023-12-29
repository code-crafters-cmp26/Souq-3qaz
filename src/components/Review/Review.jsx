import styles from "./Review.module.css";
import StarRating from "../../components/StarRating/StarRating";
import { useAuth } from "../AuthProvider/AuthProvider";

function Review({ review }) {
  const { userData, userType } = useAuth();
  function deleteReview() {
    fetch(`http://localhost:3000/api/v1/review/${review.reviewid}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          alert("Review deleted successfully");
          window.location.reload();
        } else {
          alert("Error deleting review");
          console.log(data);
        }
      });
  }
  return (
    <div className={styles.review} key={review.reviewid}>
      <div className={styles.user}>
        <h3>
          {review.customerFName} {review.customerLName}
        </h3>
      </div>
      <div className={styles.date}>
        <p>{review.date}</p>
      </div>
      <div className={styles.rating}>
        <StarRating defaultRating={review.rating} isStatic={true} size={24} />
      </div>
      <div className={styles.comment}>
        <p>{review.comment}</p>
      </div>
      <div className={styles.upvotes}>
        <img
          src="src/components/Review/likeB.svg"
          alt="upvote"
          width="20px"
          height="20px"
        />
        <p>{review.upvotes}</p>
        {(userData?.id == review.customerid ||
          userType == "Admin" ||
          userType == "Tech Support") && (
          <img
            src="src/components/Review/del.svg"
            alt="delete"
            width="20px"
            height="20px"
            onClick={deleteReview}
          />
        )}
      </div>
    </div>
  );
}

export default Review;
