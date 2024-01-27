import { Product } from "../models/Product";
import "./Detail.css";

function DetailComponent({ product, qty, deleteDetail }: { product: Product, qty: Number, deleteDetail: Function }) {
    return (
    <div className="detail-container">
        <div className="detail-wrapper">
           <img src={product.image} />
            <div className="text-container">
                <p className="text-decoration-underline">{product.name}</p>
                <p>S/ {product.price.toFixed(2)}</p>
            </div>
            <b>
                x{Number(qty)}
            </b>
        </div>
    </div>
    )
}

export { DetailComponent }