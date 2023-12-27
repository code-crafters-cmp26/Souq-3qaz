import styles from "./Barter.module.css"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
function Barter() {
    const location = useLocation()
    const [loading, setLoading] = useState(true)
    const queryParams = new URLSearchParams(location.search)
    const [product, setProduct] = useState(null)
    const [qty1, setQty1] = useState(1);
    const [qty2, setQty2] = useState(1);
    useEffect(() => {
        console.log(queryParams.get("id"))
        fetch(`http://localhost:3000/api/v1/product/${queryParams.get("id")}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setLoading(false)
                setProduct(...data.products);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);
    const handleQtyChange1 = (e) => {
        setQty1(e.target.value);
    };
    const handleQtyChange2 = (e) => {
        setQty2(e.target.value);
    };
    return (
        <div className={styles.barter}>
            {!loading && <div className={styles.barter__container}>
                <div className={styles.bartered__product}>
                    <h1 className={styles.bartered__text}>Bartered Product</h1>
                    <ProductCard product={product} />
                    <h3>{queryParams.get("Sname")}</h3>
                    <label htmlFor="quantityInput2">Quantity</label>
                    <input required id = "quantityInput2" type="number" placeholder="Quantity" value={qty1} onChange={handleQtyChange1} min={1} max={product?.quantity} />
                </div>
                <div className={styles.exchange__container}>
                    <h1 className={styles.exchange__text}>Exchange</h1>
                    <img src="src\pages\Barter\xchg.svg" alt="" className={styles.exchange__icon} />
                </div>
                <div className={styles.bartered__product}>
                    <h1 className={styles.bartered__text}>Your Product</h1>
                    <ProductCard product={product} />
                    {/* a label for the input quantity  */}
                    <h3>{queryParams.get("Sname")}</h3>
                    <label htmlFor="quantityInput1">Quantity</label>
                    <input required id = "quantityInput1" type="number" placeholder="Quantity" value={qty2} onChange={handleQtyChange2} min={1} max={product?.quantity} />
                </div>

            </div>}
        </div>
    )
}

export default Barter