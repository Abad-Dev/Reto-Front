import { Order } from "../models/Order";
import "./Order.css";

function OrderComponent({ order }: { order: Order }) {
    return <div className="order-container">
        <div className="card">
            <div className="card-header">
                # de Orden:<br />
                <small>{order.orderNum}</small>
            </div>
            <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="btn btn-outline-dark" style={{fontSize: "15px"}}>Editar Orden</a>
            </div>
        </div>
    </div>
}

export { OrderComponent }