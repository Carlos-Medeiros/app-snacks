import React, { useState } from "react";
import { ReactComponent as Fechado } from '../fechado.svg'
import { ReactComponent as Car } from '../carrinho.svg'
import { ReactComponent as ArrowYellow } from '../arrow-left-yellow.svg'
import './stylesShoppingCar.css';

function ModalShoppingCar({ onClose = () => {}, selectedProducts, handleSelectProduct }){
    const [str, setStr] = useState()

    return (
        <div className="modal">
            <div className="modal-container-shopping-car">
                <div className="container-header-shopping-car" onClick={onClose}>
                    <ArrowYellow className="arrow-yellow-shopping-car"/>
                    <p className="order-tittle">Continuar Escolhendo</p>
                </div>
                <div className="container-products-shopping-car">
                    {selectedProducts.map(product => (

                        <div className="products-shopping-car">
                            <div className="card-products-shopping-car">
                                <div className="container-img-shopping-car">
                                    <img src={product.imageUri} className="img-product-shopping-car" alt={product.name} />
                                </div>
                                <div className="container-description-product-shopping-car">
                                    <p className="name-product-shopping-car">{product.name}</p>
                                    <p className="price-product-shopping-car">R${product.price}</p>
                                    
                                    <div className="card-amount-products-shopping-car">
                                        <div className="container-less-products">
                                            <div className="less-product"></div>
                                        </div>
                                        <div className="container-amount-products">
                                            <p className="amount-products">2</p>
                                        </div>
                                        <div className="container-add-products">
                                            <div className="add-horizontal-icon"></div>
                                            <div className="add-vertical-icon"></div>
                                        </div>
                                    </div>

                                    <div className="container-remove-products" onClick={() => handleSelectProduct(product)}>
                                        <p className="remove-product">Excluir</p>
                                    </div>
                                </div>
                            </div>

                            
                        </div>                    
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ModalShoppingCar;