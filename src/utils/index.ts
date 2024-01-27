const apiUrl = "http://localhost:5075";

async function getOrders() {
    const response = await fetch(apiUrl + "/Order")
    const result = await response.json()
    return result
}

async function createOrder() {
    const response = await fetch(apiUrl + "/Order")
    const result = await response.json()
    return result
}

async function createProduct() {
    const response = await fetch(apiUrl + "/Product")
    const result = await response.json()
    return result
}

export {
    getOrders,
    createOrder,
    createProduct,
}