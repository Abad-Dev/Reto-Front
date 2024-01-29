import { Detail } from "./Detail";
import { OrderStatus } from "./OrderStatus";

export interface Order {
    id?: String,
    orderNum: String,
    date: Date,
    details: Detail[],
    status?: OrderStatus
}