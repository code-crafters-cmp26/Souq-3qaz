import styles from "./Barter.module.css"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import { useAuth } from "../../components/AuthProvider/AuthProvider"
import Button from "../../components/Button/Button"
function Barter() {
    const location = useLocation()
    const { userData } = useAuth()
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const queryParams = new URLSearchParams(location.search)
    const [product, setProduct] = useState(null)
    const [myProducts, setMyProducts] = useState(null)
    const [qty1, setQty1] = useState(1);
    const [qty2, setQty2] = useState(1);
    const [selctedProduct, setSelectedProduct] = useState(0);
    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/product/${queryParams.get("id")}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProduct(...data.products);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error.message);
            });
        if (userData) {
            fetch(`http://localhost:3000/api/v1/product/searchBySeller/${userData.id}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setLoading2(false)
                    setMyProducts(data.products);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }

    }, [userData]);

    const handleQtyChange1 = (e) => {
        setQty1(e.target.value);
    };
    const handleQtyChange2 = (e) => {
        setQty2(e.target.value);
    };
    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };
    const handleBarterRequest = () => {
        fetch(`http://localhost:3000/api/v1/barter`, {
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                requestedSellerlD: parseInt(queryParams.get("sellerid"), 10),
                offeredProductlD: myProducts[selctedProduct].id,
                requestedProductlD: parseInt(queryParams.get("id"), 10),
                offeredProductQuantity: qty2,
                requestedProductQuantity: qty1,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                alert("Barter Requested Successfully");
                console.log(data);
            })
            .catch((error) => {
                console.log(error.message);
                alert("Error Requesting Barter");
            });
    }
    return (
        <div className={styles.barter}>
            {!loading && !loading2 && <div className={styles.barter__container}>
                <div className={styles.barter__container__inner}>
                    <div className={styles.bartered__product}>
                        <h1 className={styles.bartered__text}>Bartered Product</h1>
                        <ProductCard product={product} />
                        <h3>{queryParams.get("Sname")}</h3>
                        <label htmlFor="quantityInput2">Quantity</label>
                        <input required id="quantityInput2" type="number" placeholder="Quantity" value={qty1} onChange={handleQtyChange1} min={1} max={product?.quantity} />
                    </div>
                    <div className={styles.exchange__container}>
                        <h1 className={styles.exchange__text}>Exchange</h1>
                        <img src="src\pages\Barter\xchg.svg" alt="" className={styles.exchange__icon} />
                    </div>
                    <div className={styles.bartered__product}>
                        <h1 className={styles.bartered__text}>Your Product</h1>
                        {myProducts && <ProductCard product={myProducts[selctedProduct]} />}
                        <select onChange={handleProductChange}>
                            {myProducts.map((product, index) => (
                                <option key={product.id} value={index}>{product.name}</option>
                            ))}
                        </select>
                        <label htmlFor="quantityInput1">Quantity</label>
                        <input required id="quantityInput1" type="number" placeholder="Quantity" value={qty2} onChange={handleQtyChange2} min={1} max={myProducts[selctedProduct]?.quantity} />
                    </div>
                </div>
                <div className={styles.barter__container__button}>
                    <Button text="Request Barter" textColor={"#F5EFE6"} backgroundColor={"#836c53"} onClick={handleBarterRequest} />
                </div>

            </div>}
        </div>
    )
}

export default Barter