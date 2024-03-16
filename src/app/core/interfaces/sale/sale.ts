import { Category } from "../products";

export interface Sale {
    purchase_date: string;
    total: number;
    userId: number;
}

export interface GetSaleResponse {
    id: number;
    code: string;
    purchase_date: Date;
    total: number;
    users: SaleUser;
}

export interface SaleUser {
    id: number;
}

export interface SaleDetails {
    id:       number;
    quantity: number;
    subTotal: number;
    products: detailProd;
}

export interface detailProd {
    code:     string;
    name:     string;
    image:    string;
    size:     number;
    brand:    string;
    category: Category;
}
