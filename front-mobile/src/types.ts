export type Order = {

        id: number;
        code: number;
        address: string;
        latitude: number;
        longitude: number;
        total: number;
        moment: string;
        products: Product[];
}

export type Product = {

        id: number;
        name: string;
        price: number;
        description: string;
        imageUri: string;
}