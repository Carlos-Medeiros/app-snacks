import { useEffect } from 'react';
import { useState } from 'react';
import ProductCard from './ProductCard';
import { Category, Product } from './types';

type Props = {
    category: Category;
    state: number
}

function ProductList({ category, state }: Props) {

    const [products, setProducts] = useState<Product[]>([]);
    console.log(state)
    
    useEffect(() => {
        setProducts(category.products)
    }, []);

    return(
        <div className={state === category.id ? "container-category-iten-active" : "container-category-iten"}>
            <p className="category-iten-name">{category.name}</p>
            <div className="container-products">
                {products.map(product => (
                <ProductCard
                key={product.id}
                product={product}/>))}   
            </div>         
        </div>
        
    )
}

export default ProductList;