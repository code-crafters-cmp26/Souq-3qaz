import styles from "./Review.module.css";
import StarRating from "../../components/StarRating/StarRating";
import { useAuth } from "../AuthProvider/AuthProvider";

function Review({ review }) {
  const { userData, userType } = useAuth();
  function deleteReview() {
    fetch(
      `https://my-backend-2l7i.onrender.com/api/v1/review/${review.reviewid}`,
      {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      }
    )
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
        {/* <img
          src="https://w7.pngwing.com/pngs/821/97/png-transparent-black-arrow-up-illustration-arrow-desktop-symbol-up-arrow-angle-triangle-sign-thumbnail.png"
          alt="upvote"
          width="30px"
          height="30px"
       needs api // />  */}
        {/* <p>{review.upvotes}</p> */}
        {(userData?.id == review.customerid ||
          userType == "Admin" ||
          userType == "Tech Support") && (
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQupei2BVvuo4wbPCRS6jkhuIRyV53_q1bUT6o68Taxtw&s"
            alt="delete"
            width="40px"
            height="40px"
            onClick={deleteReview}
          />
        )}
      </div>
    </div>
  );
}

export default Review;
