import { useEffect } from 'react';
import { useState } from 'react';
import { fetchCategorys } from '../api';
import { ReactComponent as Confirmed } from '../confirmed.svg'
import { ReactComponent as Hamburguer } from '../item-teste.svg'
import { ReactComponent as CarYellow } from '../car-yellow.svg'
import { ReactComponent as Car } from '../carrinho.svg'
import { ReactComponent as Add } from '../mais.svg'
import { Link } from 'react-router-dom';

function ProductCard({ product, onSelectProducts, isSelected, productItem, setProductItem}) {

    const [toggleState, setToggleState] = useState(0);
    const [view, setView] = useState([]);
    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setToggleState(product.id)
        setShowModal(true)
    }

    const closeModal = () => {
        setToggleState(0)
        setShowModal(false)
    }

    return(
        <div className={product.inventory === true ? "containerItem" : "containerItem-disable"} >
            {product.inventory === true ? 
            <div onClick={() => setProductItem(product)}>
                <div className={`product ${isSelected ? 'selected' : ''}`}>
                    <img src={product.imageUri} className="itemProduct" alt={product.name} />
                    <h2 className={`nameProduct ${isSelected ? 'selected' : ''}`}>{product.name}</h2>
                    <h2 className={`priceProduct ${isSelected ? 'selected' : ''}`}>R${product.price}</h2>
                    <p className={`descriptionProduct ${isSelected ? 'selected' : ''}`}>{product.description}</p>
                </div>
            </div> : 
                <div className={`product ${isSelected ? 'selected' : ''}`}>
                    <img src={product.imageUri} className="itemProduct" alt={product.name} />
                    <h2 className={`nameProduct ${isSelected ? 'selected' : ''}`}>{product.name}</h2>
                    <h2 className={`priceProduct ${isSelected ? 'selected' : ''}`}>R${product.price}</h2>
                    <p className={`descriptionProduct ${isSelected ? 'selected' : ''}`}>{product.description}</p>
                </div>
            } 
        </div>
    )
}

export default ProductCard;