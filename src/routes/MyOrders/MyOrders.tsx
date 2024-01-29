import React from "react";
import "./MyOrder.css";
import { Order } from "../../models/Order.ts";
import { OrderComponent } from "../../components/Order.tsx";
import { Loader } from "../../components/Loader.tsx";

import { deleteOrder, getOrders } from "../../utils/index.ts";
import { Link } from "react-router-dom";

function MyOrders() {
    const [loading, setLoading] = React.useState<Boolean>(true);
    const [orders, setOrders] = React.useState<Order[]>([]);

    React.useEffect(() => {
        document.title = "My Orders"
        const fetchData = async () => {
            try {
                const res: Order[] = await getOrders();
                setOrders(res)
            } catch (error){
                alert(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    const handleDeleteOrder = (orderId: string) => {
        deleteOrder(orderId)
            .then(_ => {
                setOrders(orders => orders.filter(order => order.id != orderId))
            })
    }
    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className='mb-0'>My Orders:</h2>
                <Link to="/add-order" className="btn btn-primary">
                    + Add Order 
                </Link>
            </div>
            <hr></hr>
            {loading ? 
            <div className="container-fluid d-flex flex-column align-items-center justify-content-center my-5 py-5">
                <Loader />
                <p className="text-center mt-5">Obteniendo Ordenes...</p>
            </div>
            :
            <div className="orders-container">
                {orders?.length > 0 ? orders.map((order) => (<OrderComponent order={order} key={String(order.id)} deleteOrder={handleDeleteOrder}/>)) 
                : 
                <div className="container-fluid d-flex flex-column align-items-center">
                    <h1 className="text-center">
                        You have no orders
                    </h1>
                    <Link to="/add-order" className="btn btn-primary">
                        Go to Add Order ➜
                    </Link>
                </div>}    
            </div>
            }
        </div>
        )
    
}

export { MyOrders };