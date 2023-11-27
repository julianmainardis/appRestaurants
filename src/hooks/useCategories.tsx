import { useEffect, useState } from 'react';
import restaurantDB from '../api/restaurantDB';
import { CategoriesResponse, Category } from '../interfaces/categoriesInterface';

interface CategoriesState {
    categories: Category[];
}

export const useCategories = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [categoriesState, setCategoriesState] = useState<CategoriesState>({
        categories: []
    });

    const getCategories = async() => {

        const categoriesPromise = restaurantDB.get<CategoriesResponse>('/categories');

        const response = await Promise.all([
            categoriesPromise
        ]);

        setCategoriesState({
            categories: response[0].data.categories,
        })
        
        setIsLoading(false);
    }
    
    useEffect(() => {
        getCategories();
    }, [])

    return {
        ...categoriesState,
        isLoading
    }
}
