import React from "react";
import { ReactComponent as Close } from '../close.svg'
import './styles.css';
import { useCart } from "react-use-cart";

function ModalProduct({ onClose= () => {}, productItemContainer, categoryActive}){
    
    const { addItem,
        removeItem,
        inCart} = useCart();
    
    return (
        <div className="modal">
            <div className="modal-container">
                <div className="container-close" onClick={onClose}>
                    <Close className="close"/>
                </div>
                <div className="container-product-body-img">
                    <img src={productItemContainer.imageUri} className="product-body-img" alt={productItemContainer.name} />
                </div>
                <div className="container-product-description">
                    <h2 className="product-item-name">{productItemContainer.name}</h2>
                    <p className="product-item-description">{productItemContainer.description}</p>
                    <div className="product-item-divider"></div>
                    <div className="container-product-item-price">
                        <p className="product-item-value">Valor:</p>
                        <p className="product-item-price">R${productItemContainer.price},00</p>
                    </div>
                    <div className="container-product-buttons">
    
                        {inCart(productItemContainer.id) === false ? 
                        <div className="container-product-button-add-car" onClick={() => addItem(productItemContainer)}>
                            <p className="product-button-add">Adicionar</p> 
                        </div> :
                        <div className="container-product-button-remove-car" onClick={() => removeItem(productItemContainer.id)}>
                            <p className="product-button-remove">Remover</p> 
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalProduct;