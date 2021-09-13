import { useEffect } from 'react';
import { useState } from 'react';
import ProductCard from './ProductCard';

function ProductList({ category, state, productItemCard, setProductItemCard }) {

    const [products, setProducts] = useState([]);
    const [productItem, setProductItem] = useState(productItemCard);

    useEffect(() => {
        setProducts(category.products);
    }, []);

    useEffect(() => {
        setProductItemCard(productItem);
    }, [productItem]);

    useEffect(() => {
        setProductItem(productItemCard)
    }, [productItemCard]);

    return(
        <div className={state === category.id ? "container-category-item-active" : "container-category-item "}>
            <div className="container-category-item-name">
                <p className="category-item-name-selected">Você selecionou</p>
                <p className="category-item-name">{category.name}</p>
            </div>
            <div className="container-products">
                {products.map(product => (
                <ProductCard
                key={product.id}
                product={product}
                setProductItem={setProductItem}/>))}   
            </div>         
        </div>
        
    )
}

export default ProductList;