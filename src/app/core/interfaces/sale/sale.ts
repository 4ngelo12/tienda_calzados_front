export interface Sale {
    purchase_date: string;
    total: number;
    userId: number;
}

export interface SaleResponse {
    id: number;
    code: string;
    purchase_date: Date;
    total: number;
    userId: number;
}