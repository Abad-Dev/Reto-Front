import React from "react";
import { Order } from "../models/Order";
import { Loader } from "./Loader";
import "./Order.css";
import { Link } from "react-router-dom";
import { OrderStatus } from "../models/OrderStatus";

function OrderComponent({ order, deleteOrder }: { order: Order, deleteOrder: Function }) {
    const [loading, setLoading] = React.useState<boolean>(false);
    
    const handleDelete = () => {
        setLoading(true); 
        deleteOrder(order.id)
    }

    return <div className="order-container m-2">
        <div className="card">
            <div className={"card-header " + 
                (order.status == OrderStatus.Pending ? "pending" :
                 order.status == OrderStatus.InProgress ? "inprogress" :
                 order.status == OrderStatus.Completed ? "completed" : "")}>
                <h4 className="text-center mb-1">{order.status == OrderStatus.Pending ? "Pending" :
                 order.status == OrderStatus.InProgress ? "In Progress" :
                 order.status == OrderStatus.Completed ? "Completed" : ""}</h4>
                 <hr className="my-1"></hr>
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
                    <div className="d-flex justify-content-start mx-4">
                        <img src={detail.product?.image} />
                        <p>
                            {detail.product?.name} <b>x{Number(detail.qty)}</b>
                            <br />
                            S/ {detail.product?.price.toFixed(2)}
                        </p>
                        
                    </div>
                    <hr className="w-100"/>
                </div>)}
                
                <div className="w-100">
                    {order.details.length > 0 ? 
                    <>
                        <p className="mx-4">{order.details.map(detail => Number(detail.qty)).reduce((acc, val) => acc += val)} Products</p>
                        <p className="mx-4 mb-3">Total: S/ {order.details.map(detail => Number(Number(detail.product?.price)*Number(detail.qty))).reduce((acc, val) => acc += val).toFixed(2)}</p>
                    </>
                    : ""}
                </div>

                <div className="d-flex">
                    <Link to={loading || order.status == OrderStatus.Completed ? "" : "/add-order/"+order.id} >
                        <button className="btn btn-outline-primary me-1" style={{fontSize: "15px"}} disabled={loading || order.status == OrderStatus.Completed}>
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