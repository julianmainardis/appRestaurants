export interface ProductsResponse {
    products: Product[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    category: number;
    size: SizeAndPrice[];
    available: boolean;
}

export interface SizeAndPrice {
    size: string;
    price: number;
}
