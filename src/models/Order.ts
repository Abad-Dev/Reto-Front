import { Detail } from "./Detail";

export interface Order {
    id?: String,
    orderNum: String,
    date: Date,
    details: Detail[],
}