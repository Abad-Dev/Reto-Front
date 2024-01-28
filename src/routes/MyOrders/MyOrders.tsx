import React from "react";
import "./MyOrder.css";
import { Order } from "../../models/Order.ts";
import { OrderComponent } from "../../components/Order.tsx";
import { Loader } from "../../components/Loader.tsx";

import { deleteOrder, getOrders } from "../../utils/index.ts";

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

    if (loading) {
        return <div className="container-fluid d-flex flex-column align-items-center justify-content-center my-5 py-5">
            <Loader />
            <p className="text-center mt-5">Obteniendo Ordenes...</p>
        </div>
    } else {
    return (
        <div className="container">
            <h2 className='mb-3'>My Orders:</h2>
            <div className="orders-container">
                {orders?.length > 0 ? orders.map((order) => (<OrderComponent order={order} key={String(order.id)} deleteOrder={handleDeleteOrder}/>)) 
                : 
                <div className="container-fluid">
                    <h1 className="text-center">
                        No tiene Ordenes
                    </h1>
                </div>}    
            </div>
        </div>
        )
    }
}

export { MyOrders };