export type Product = {
        id: number;
        name: string;
        price: number;
        description: string;
        imageUri: string;
        inventory: boolean;
        discount: boolean;
        percentageDiscount: number;
}

export type Category = {
        id: number;
        name: string,
        products: Product[]
}