import './styles.css';
import { useEffect, useState } from 'react';
import { API_URL } from '../api';
import axios from 'axios';
import { useHistory } from 'react-router';
import ModalCategoryProduct from '../ModalCategoryProduct/ModalCategoryProduct';

function CategoryProduct({ category }) {

    const [categoryProduct, setCategoryProduct] = useState([]);
    const [count, setCount] = useState(0);
    const [isModal, setIsModal] = useState(false);
    const [isNewProduct, setIsNewProduct] = useState(false);
    const [product, setProduct] = useState();
    let history = useHistory();

    useEffect(() => {
        axios.get(`${API_URL}/categorys/${category.id}`)
        .then(function (resp) {
            if (resp.status === 200) {
                setCategoryProduct(resp.data.products);
            }
        })
        .catch()
    },[category, count])

    const openModal = (product) => {
        setProduct(product);
        setIsModal(true);
    }

    function formatPrice(price) {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return formatter.format(price);
    }

    return(
        <>
            {categoryProduct.map(product =>(
                <div className={`container-content-product ${product.inventory ? 'actived' : ''}`} onClick={()=>openModal(product)}>
                    <img src={product.imageUri} className="category-product-img" alt={product.name} />

                    <h2 className="product-id">Id: {product.id}</h2>
                    <h2 className="product-name">{product.name}</h2>
                    <div className="container-price-discount">
                        <h2 className="product-price">{formatPrice(product.price)}</h2>
                        {product.discount?
                        <div className="container-percentage-discount">
                            <p className="product-discount">-{product.percentageDiscount.toFixed(0)}%</p>
                        </div>
                        :null}
                    </div>
                    <p className="product-description">{product.description}</p>
                </div>
            ))}
            {isModal ? <ModalCategoryProduct
                        onClose={()=>setIsModal(false)}
                        product={product}
                        update={()=>setCount(count + 1)}
                        category={category}/>
            :null}
        </>

    )
}
export default CategoryProduct;