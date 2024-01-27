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
                
                <a href="#" className="btn btn-outline-primary" style={{fontSize: "15px"}}>
                    <i className="bi bi-pencil-fill me-2"></i>Editar Orden
                </a>
            </div>
        </div>
    </div>
}

export { OrderComponent }