import React from "react";
import { Order } from "../models/Order";
import { Loader } from "./Loader";
import "./Order.css";
import { Link } from "react-router-dom";

function OrderComponent({ order, deleteOrder }: { order: Order, deleteOrder: Function }) {
    const [loading, setLoading] = React.useState<boolean>(false);
    console.log(loading);
    
    const handleDelete = () => {
        console.log("clicked on delete")
        setLoading(true); 
        deleteOrder(order.id)
    }

    return <div className="order-container m-2">
        <div className="card">
            <div className="card-header">
                Order Number:<br />
                <small>{order.orderNum}</small>
            </div>
            <div className="card-body px-0 d-flex flex-column align-items-center">
                {loading ? 
                <div className="mb-3 d-flex flex-column align-items-center">
                    <Loader />
                    &nbsp;&nbsp;Borrando...
                </div> :
                order.details.map((detail, index) => 
                <div className="detail" key={index}>
                    <div className="d-flex justify-content-center">
                        <img src={detail.product?.image} />
                        <p>
                            {detail.product?.name} <b>x{Number(detail.qty)}</b>
                            <br />
                            S/ {detail.product?.price.toFixed(2)}
                        </p>
                        
                    </div>
                    <hr className="w-100"/>
                </div>)}


                <div className="d-flex">
                    <Link to={loading ? "" : "/add-order"} >
                        <button className="btn btn-outline-primary me-1" style={{fontSize: "15px"}} disabled={loading}>
                            <i className="bi bi-pencil-fill me-2"></i>Edit Order
                        </button>
                    </Link>

                    <button className="btn btn-outline-danger" style={{fontSize: "15px"}} onClick={() => handleDelete() } disabled={loading}>
                        <i className="bi bi-trash-fill"></i>Delete Order
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export { OrderComponent }