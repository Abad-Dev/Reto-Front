import React from "react";
import "./MyOrder.css";
import { Order } from "../../models/Order.ts";
import { OrderComponent } from "../../components/Order.tsx";
import { Loader } from "../../components/Loader.tsx";

import { getOrders } from "../../utils/index.ts";

function MyOrders() {
    const [loading, setLoading] = React.useState<Boolean>(true);
    const [orders, setOrders] = React.useState<Order[]>([]);

    React.useEffect(() => {
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

    if (loading) {
        return <div className="container-fluid d-flex flex-column align-items-center justify-content-center my-5 py-5">
            <Loader />
            <p className="text-center mt-5">Obteniendo Ordenes...</p>
        </div>
    } else {
    return (
        <div className="container orders-container">
            {orders?.length > 0 ? orders.map((order, index) => (<OrderComponent order={order} key={index}/>)) 
            : 
            <div className="container-fluid">
                <h1 className="text-center">
                    No tiene Ordenes
                </h1>
            </div>}    
        </div>
        )
    }
}

export { MyOrders };