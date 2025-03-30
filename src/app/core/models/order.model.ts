import { orderItem } from "./orderItem.model";

export interface order{
    id: number;
    orderDate: string;
    totalAmount: number;
    paymentStatus: number;
    shippingStatus: number;
    delivaryDate: string;
    orderItems: orderItem[];
}