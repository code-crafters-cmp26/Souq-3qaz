import styles from './ReviewsContainer.module.css'
import Review from '../../components/Review/Review'
import AddReview from '../AddReview/AddReview'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
function ReviewsContainer() {
    const [reviews, setReviews] = useState([])
    const [success, setSuccess] = useState(false)
    const { id } = useParams()
    function getReviews() {
        fetch(`http://localhost:3000/api/v1/review/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        }).then(res => res.json())
            .then(data => {
                if (data.status == "success") {
                    setReviews(data.reviews)
                }
                else {
                    console.log(data)
                    alert("Error fetching reviews")
                }
            })
    }
    useEffect(() => {
        getReviews()
    }, [success])
    function handleSuccessfulSubmit(success) {
        setSuccess(success);
    }

    return (
        <div className={styles.reviews_container}>
            <AddReview isSuccessfulSubmit={handleSuccessfulSubmit} />
            {reviews.map((review) => {
                return(<div key = {review.reviewid}>
                <Review review = {review}/>
                </div>);
            })}
        </div>
    )
}

export default ReviewsContainer