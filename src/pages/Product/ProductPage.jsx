import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./ProductPage.module.css";
import { useEffect, useState } from "react";
import ReviewsContainer from "../../components/ReviewsContainer/ReviewsContainer";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

function Productpage() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();
  const { userType, userData } = useAuth();

  const handleAddToWishlist = () => {
    fetch(`http://localhost:3000/api/v1/product/${productData.id}`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (
          data.message ==
          `duplicate key value violates unique constraint "pk_wishlist"`
        )
          alert("You already have this product in your wishlist");
        else if (data.status != "success") alert(data.message);
        else alert("Youa added this product to your wishlist");
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  const handleGoToBuy = () => {
    navigate(
      `/checkout?name=${productData.name}&id=${productData.id}&price=${productData.price}`
    );
  };

  const handleAddToAuction = () => {
    navigate(`/addauction/${id}`);
  };

  const handleDeleteProduct = () => {
    fetch(`http://localhost:3000/api/v1/product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status != "success") alert(data.message);
        else alert("You deleted your product :(");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleGoToBarter = () => {
    navigate(
      `/barter?Sname=${productData.firstname + " " + productData.lastname}&id=${
        productData.id
      }&sellerid=${productData.sellerid}`
    );
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/product/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status != "success") alert(data.message);
        else setProductData(...data.products);
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  }, [id]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  // Convert the string to a Date object
  const dateObject = new Date(productData.putdate);

  // Get the date in the format "YYYY-MM-DD"
  const extractedDate = dateObject.toISOString().substring(0, 10);

  return (
    <div className={styles.productcontainer}>
      <div className={styles.productpage}>
        <img className={styles.img} src={productData.image} />
        <section className={styles.content}>
          <h1 className={styles.category}>{productData.category}</h1>
          <h1 className={styles.name}>{productData.name}</h1>
          <h2>Available quantity: {productData.quantity}</h2>
          <div>{productData.description}</div>
          <div>Seller or Brand: {productData.name}</div>
          <div className={styles.reviews}></div>
          <hr />
          <p>{productData.price}$</p>
          <p className={styles.seller}></p>
        </section>
        <section className={styles.purchase}>
          <div className={styles.date}>Date of releasing: {extractedDate}</div>
          {(userType == "Normal" || userType == "Premium") && (
            <>
              <Button text="Add to Wishlist" onClick={handleAddToWishlist} />
              <Button text="Buy Now" onClick={handleGoToBuy} />
              <Link to={`/chat/${productData.sellerid}`}>
                <Button text="Chat with the seller" />
              </Link>
            </>
          )}
          {userType == "Seller" && (
            <>
              {userData.id == productData.sellerid && (
                <>
                  <Button text="Add to Auction" onClick={handleAddToAuction} />
                  <Button text="Delete Produt" onClick={handleDeleteProduct} />
                </>
              )}
              {userData.id != productData.sellerid && (
                <Button text="Barter" onClick={handleGoToBarter} />
              )}
            </>
          )}
          {(userType == "Tech Support" || userType == "Admin") && (
            <Button text="Delete Produt" onClick={handleDeleteProduct} />
          )}
        </section>
      </div>
      <ReviewsContainer />
    </div>
  );
}

export default Productpage;
