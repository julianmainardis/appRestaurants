export interface CategoriesResponse {
    categories: Category[];
}

export interface Category {
    id: number;
    categoryName: string;
    categoryDescription: string;
}
