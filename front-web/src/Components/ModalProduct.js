import React from "react";
import { ReactComponent as Fechado } from '../fechado.svg'
import { ReactComponent as Car } from '../carrinho.svg'
import { ReactComponent as ArrowYellow } from '../arrow-left-yellow.svg'
import './styles.css';

function ModalProduct({ onClose= () => {}, addItemCar = () => {}, removeItem, productItemContainer, categoryActive}){
    return (
        <div className="modal">
            <div className="modal-container">
                <div className="container-header-product" onClick={onClose}>
                    <ArrowYellow className="arrow-yellow-header"/>
                    <p className="category-active">{categoryActive}</p>
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
                        <div className="container-product-button-back"  onClick={onClose}>
                            <ArrowYellow className="arrow-yellow"/>
                            <p className="product-button-back">Voltar</p>
                        </div>
                        {removeItem === false ? 
                        <div className="container-product-button-add-car" onClick={addItemCar}>
                            <p className="product-button-add">Adicionar</p> 
                            <Car className="product-button-car"/> 
                        </div> :
                        <div className="container-product-button-remove-car" onClick={addItemCar}>
                            <p className="product-button-remove">Remover</p> 
                            <Fechado className="product-button-remove-car"/>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalProduct;