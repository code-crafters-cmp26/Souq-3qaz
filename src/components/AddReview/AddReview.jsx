import styles from './AddReview.module.css'
import StarRating from "../../components/StarRating/StarRating";
import { useState } from 'react';
import { useAuth } from '../AuthProvider/AuthProvider';

function AddReview() {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    function handleRatingChange(rating) {
        setRating(rating);
    }
    function handleSubmit() {
        const { isLoggedIn } = useAuth();
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
        fetch("http://localhost:3000/api/v1/review", {
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                rating: rating,
                comment: comment
            })
        }).then(res => res.json())
            .then(data => {
                if (data.status == 200) {
                    alert("Review added successfully");
                    window.location.reload();
                }
                else {
                    alert("Error adding review");
                }
            })
    }
    handleCommentChange = (e) => {
        setComment(e.target.value);
    }
    return (
        <div className={styles.add_review}>
            <div className={styles.header}>
                <h1>Add Review</h1>
            </div>
            <div className={styles.review}>
                <div className={styles.rating}>
                    <StarRating onSetRating={handleRatingChange}  />
                </div>
                <div className={styles.comment}>
                    <textarea placeholder="Comment" value={comment} onChange={handleCommentChange}/>
                </div>
                <div className={styles.submit}>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddReview