import { useEffect, useState } from 'react';
import restaurantDB from '../api/restaurantDB';
import { Product, ProductsResponse } from '../interfaces/productsInterface';

interface ProductsState {
    products: Product[];
}

export const useProducts = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [productsState, setProductsState] = useState<ProductsState>({
        products: []
    });

    const getProducts = async() => {

        const productsPromise = restaurantDB.get<ProductsResponse>('/products');

        const response = await Promise.all([
            productsPromise
        ]);

        setProductsState({
            products: response[0].data.products,
        })
        
        setIsLoading(false);
    }
    
    useEffect(() => {
        getProducts();
    }, [])

    return {
        ...productsState,
        isLoading
    }
}
