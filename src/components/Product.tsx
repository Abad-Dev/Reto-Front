import { Product } from "../models/Product";
import "./Product.css";

function ProductComponent({ product }: { product: Product}) {
    return (
    <div className="product-container">
        <div className="product-wrapper">
           <img src={product.image} />
            <div className="text-container">
                <p className="text-decoration-underline">{product.name}</p>
                <p>S/ {product.price.toFixed(2)}</p>
            </div>
            <b>
                x{JSON.stringify(product.qtyInStock)}
            </b>
        </div>
    </div>
    )
}

export { ProductComponent }