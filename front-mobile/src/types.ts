export type Order = {

        id: number;
        code: number;
        address: string;
        latitude: number;
        longitude: number;
        details: string;
        total: number;
        moment: string;
        paymantToCard: boolean,
        change: number,
        products: Product[];
}

export type Product = {

        id: number;
        name: string;
        price: number;
        description: string;
        imageUri: string;
}