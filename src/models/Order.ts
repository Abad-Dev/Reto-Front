import { Detail } from "./Detail";

export interface Order {
    orderNum: String,
    date: Date,
    details: Detail[],
}