import { UserId } from "../users";

export interface ShoppingCart {
    amount: number;
    userId: number;
    productId: number;
}

export interface ShoppingCartResponse {
    code: string;
    amount: number;
    subTotal: number;
    userId: number;
    productId: number;
}

export interface ShoppingCartByUserId {
    id: number;
    code: string;
    amount: number;
    subTotal: number;
    users: UserId;
    products: cartProduct;
}

export interface cartProduct {
    id: number;
    active: boolean;
    code: string;
    name: string;
    image: string;
    size: number;
    stock: number;
}
