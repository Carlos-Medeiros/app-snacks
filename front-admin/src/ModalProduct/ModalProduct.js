import React, { useEffect, useState } from "react";
import { ReactComponent as Close } from '../close.svg'
import ModalProductDelete from "../ModalProductDelete/ModalProductDelete";
import { API_URL } from '../api';
import axios from 'axios';
import { useHistory } from 'react-router';
import './styles.css';
import ModalProductEdit from "../ModalProductEdit/ModalProductEdit";
import ModalProductDiscount from "../ModalProductDiscount/ModalProductDiscount";

function ModalProduct({ onClose= () => {}, update =()=>{}, product}){

    const [isModal, setIsModal] = useState(0);
    const [mdProduct, setMdProduct] = useState(product);
    const [count, setCount] = useState(0);
    let history = useHistory();

    function formatPrice(price) {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return formatter.format(price);
    }

    useEffect(() => {
        axios.get(`${API_URL}/products/${product.id}`)
        .then(function (resp) {
            if (resp.status === 200) {
                setMdProduct(resp.data)
            }
        })
        .catch(function (error) {
            if (error.response.status === 403) {
                history.push('/')
            }
        })
    },[count])

    return (
        <div className="modal">
            {isModal === 0 ?
                <div className="modal-container">
                    <div className="container-close" onClick={onClose}>
                        <Close className="close"/>
                    </div>
                    <div className="container-product-body-img">
                        <img src={mdProduct.imageUri} className="product-body-img" alt={mdProduct.name} />
                    </div>
                    <div className={`container-product-description ${mdProduct.inventory ? 'actived' : ''}`}>
                        <div className="container-product-name-discount">
                            <h2 className="product-item-name">{mdProduct.name}</h2>
                            {mdProduct.discount?
                                <div className="container-percentage-discount">
                                    <p className="product-discount">-{mdProduct.percentageDiscount.toFixed(0)}%</p>
                                </div>
                            :null}
                        </div>
                        <p className="product-item-description">{mdProduct.description}</p>
                        <div className="product-item-divider"></div>
                        <div className="container-product-item-price">
                            <p className="product-item-value">Valor:</p>
                            <p className="product-item-price">{formatPrice(mdProduct.price)}</p>
                        </div>
                        <div className="container-product-buttons">
                            <div className="container-product-button-delete" onClick={()=>setIsModal(1)}>
                                <p className="product-button-delete">Excluir</p> 
                            </div>
                            <div className="container-product-button-edit" onClick={()=>setIsModal(3)}>
                                <p className="product-button-edit">Editar</p> 
                            </div>
                            <div className="container-product-button-discount" onClick={()=>setIsModal(2)}>
                                <p className="product-button-discount">Desconto</p> 
                            </div> 
                        </div>
                    </div>
                </div>
            :null} 
            {isModal === 1 ? <ModalProductDelete 
                                onClose={()=>setIsModal(0)}
                                product={mdProduct}
                                allClose={()=>onClose()}
                                onUpdate={()=>update()}/>
            :null}
            {isModal === 2 ? <ModalProductDiscount
                                onClose={()=>setIsModal(0)}
                                product={mdProduct}
                                onUpdate={()=>update()}
                                request={()=>setCount(count + 1)}/>
            :null}
            {isModal === 3 ? <ModalProductEdit
                                onClose={()=>setIsModal(0)}
                                product={mdProduct}
                                onUpdate={()=>update()}
                                request={()=>setCount(count + 1)}/>
            :null}
                
        </div>
    )
}

export default ModalProduct;