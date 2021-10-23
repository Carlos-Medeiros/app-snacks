import React, { useEffect, useState } from "react";
import { ReactComponent as Close } from '../close.svg'
import { API_URL } from '../api';
import axios from 'axios';
import { useHistory } from 'react-router';
import './styles.css';
import { toast } from "react-toastify";

function ModalCategoryProduct({ onClose= () => {}, update =()=>{}, product, category}){

    const [isModal, setIsModal] = useState(true);
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

    const removeProduct = () => {
        axios.patch(`${API_URL}/categorys/${category.id}/remove/${product.id}`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.warning(`O produto com id ${product.id} foi removido da categoria ${category.name}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                }); 
                update();
                onClose();
            }
        })
        .catch(function (error) {
            if (error.response.status === 403) {
                history.push('/')
            }
        })
    }

    return (
        <div className="modal">
            {isModal ?
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
                        <div className="container-category-product-buttons">
                            <div className="container-category-product-button-delete" onClick={()=>setIsModal(false)}>
                                <p className="product-button-delete">Remover</p> 
                            </div>
                        </div>
                    </div>
                </div>
            :
                <div className="modal-delete">
                    <h3 className="modal-delete-tittle">Você está preste a remover um produto</h3>
                    <p className="modal-delete-text">Tem certeza?</p>
                    <div className="modal-delete-options-btn">
                        <div className="container-option-btn-no">
                            <p onClick={()=>setIsModal(true)} className="option-btn-no">Não</p>
                        </div>
                        <div className="container-option-btn-yes">
                            <p onClick={()=>removeProduct()} className="category-product-option-btn-yes">Sim</p>
                        </div>
                    </div>
                </div>
            } 
        </div>
    )
}

export default ModalCategoryProduct;