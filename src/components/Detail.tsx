import { OrderStatus } from "../models/OrderStatus";
import { Product } from "../models/Product";
import "./Detail.css";

function DetailComponent({ product, qty, deleteDetail, editDetail, orderStatus }: { product: Product, qty: Number, deleteDetail: Function, editDetail: Function, orderStatus: OrderStatus }) {
    return (
    <div className="detail-container card">
        
        <div className="card-header">
            ID: {product.id}
        </div>
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
        
        {orderStatus == OrderStatus.Completed ? "" : 
        <div className="d-flex ms-auto m-2" >
            <button className="btn btn-danger me-2" style={{fontSize: "14px"}} onClick={(e) => {e.preventDefault(); deleteDetail(product.id)}}>
                Delete
            </button>
            <button className="btn btn-primary" style={{fontSize: "14px"}} onClick={(e) => {e.preventDefault(); editDetail(product.id)}}>
                <i className="bi bi-pencil-fill me-2"></i> Edit
            </button>
        </div>
        }
    </div>
    )
}

export { DetailComponent }