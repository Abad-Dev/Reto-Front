import { Product } from "./Product"

export interface Detail{
    orderId?: string,
    productId: string,
    product?: Product
    qty: Number
}