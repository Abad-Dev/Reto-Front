import { Order } from "../models/Order";
import { Product } from "../models/Product";

const apiUrl = "http://localhost:5075";

async function getOrders() {
    const response = await fetch(apiUrl + "/Order")
    const result = await response.json()
    return result
}

async function createOrder(order: Order) {
    const response = await fetch(apiUrl + "/Order", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(order)
    })
    const result = await response.json()
    return result
}

async function deleteOrder(orderId: string) {
    const response = await fetch(apiUrl + "/Order/" + orderId, {
        method: "DELETE",
    })
    const result = await response.text()
    return result
}

async function getProducts() {
    const response = await fetch(apiUrl + "/Product")
    const result = await response.json()
    return result
}

async function createProduct(product: Product) {
    const response = await fetch(apiUrl + "/Product", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(product)
    })
    const result = await response.json()
    return result
}


export {
    getOrders,
    createOrder,
    deleteOrder,
    getProducts,
    createProduct,
}