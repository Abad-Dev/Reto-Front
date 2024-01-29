import { Order } from "../models/Order";
import { Product } from "../models/Product";

const apiUrl = "https://reto-be-6534cd6a162a.herokuapp.com";

async function getOrder(orderId: string) {
    const response = await fetch(apiUrl + "/Order/" + orderId)
    const result = await response.json()
    return result
}

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

async function updateOrder(orderId: string, order: Order) {
    console.log(order);
    
    const response = await fetch(apiUrl + "/Order/" + orderId, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(order)
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

async function deleteProduct(productId: string) {
    const response = await fetch(apiUrl + "/Product/" + productId, {
        method: "DELETE",
    })
    return response
}


export {
    getOrder,
    getOrders,
    createOrder,
    deleteOrder,
    updateOrder,
    getProducts,
    createProduct,
    deleteProduct
}