import './styles.css';
import { useEffect, useState } from 'react';
import { API_URL } from '../api';
import axios from 'axios';
import { useHistory } from 'react-router';
import ModalProduct from '../ModalProduct/ModalProduct';
import ModalNewProduct from '../ModalNewProduct/ModalNewProduct';

function Product() {

    const [allProducts, setAllProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [isModal, setIsModal] = useState(false);
    const [isNewProduct, setIsNewProduct] = useState(false);
    const [product, setProduct] = useState();
    let history = useHistory();

    useEffect(() => {
        axios.get(`${API_URL}/products`)
        .then(function (resp) {
            if (resp.status === 200) {
                setAllProducts(resp.data)
            }
        })
        .catch(function (error) {
            if (error.response.status === 403) {
                history.push('/')
            }
        })
    },[count])

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
        <div className="container-products">
            {allProducts.map(product => (
                <div className={`container-content-product ${product.inventory ? 'actived' : ''}`} onClick={()=>openModal(product)}>
                    <img src={product.imageUri} className="product-img" alt={product.name} />

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

            {isModal ? <ModalProduct
                        onClose={()=>setIsModal(false)}
                        product={product}
                        update={()=>setCount(count + 1)}/>
            :null
            }

            {isNewProduct ? <ModalNewProduct
                        onClose={()=>setIsNewProduct(false)}
                        update={()=>setCount(count + 1)}/>
            :null}
        </div>
        <div className="container-btn-new-product" onClick={()=>setIsNewProduct(true)}>
            <p className="btn-new-product">Adicionar produto</p>
        </div>
        </>

    )
}
export default Product;