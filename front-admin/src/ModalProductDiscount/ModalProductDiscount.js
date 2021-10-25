import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { API_URL } from "../api";
import './styles.css';

function ModalProductDiscount({ onClose= () => {}, onUpdate =()=>{}, request =()=>{}, product}){

    const [amountDiscount, setAmountDiscount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    let history = useHistory();

    const removeDiscount = () => {
        axios.patch(`${API_URL}/products/discount-reverse/${product.id}`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.warning(`O desconto do produto com id ${product.id} foi removido`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                }); 
                onUpdate();
                request();
                onClose();
            }
        })
        .catch(function (error) {
            if (error.response.status === 403) {
                history.push('/')
            }
        })
    }

    const addDiscount = () => {
        parseFloat(amountDiscount)
        if (amountDiscount > 0) {
            if (amountDiscount < product.price) {
                setErrorMessage("");
                axios.patch(`${API_URL}/products/discount/${product.id}`, {
                    amount: amountDiscount
                })
                .then(function (resp) {
                    if (resp.status === 204) {
                        toast.warning(`O produto com id ${product.id} recebeu um desconto`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'dark'
                        }); 
                        onUpdate();
                        request();
                        onClose();
                    }
                })
                .catch(function (error) {
                    if (error.response.status === 403) {
                        history.push('/')
                    }
                })
            } else {
                setErrorMessage(`O valor de desconto não pode ser superior ou igual ao preço atual`);
            }

        } else {
            setErrorMessage(`O valor de desconto precisa ser maior que R$${amountDiscount}`);
        }
    }

    return (
        <div className="modal-discount">
            {product.discount ?
                <>
                    <h3 className="modal-discount-tittle">Desconto de produto</h3>
                    <p className="modal-discount-text">Este produto ja está com desconto de {product.percentageDiscount.toFixed(0)}%</p>
                    <p className="modal-discount-text">Deseja remover ?</p>
                    <div className="modal-discount-options-btn">
                        <div className="container-option-btn-no">
                            <p onClick={onClose} className="option-btn-no">Não</p>
                        </div>
                        <div className="container-option-btn-yes">
                            <p onClick={()=>removeDiscount()} className="option-btn-yes">Sim</p>
                        </div>
                    </div>
                </>
            :
                <>
                    <h3 className="modal-discount-tittle">Desconto de produto</h3>
                    <p className="modal-discount-text">Insira um valor a ser descontado do produto</p>
                    <div className="container-modal-discount-input">
                        <p className="modal-discount-tittle-input">Valor em R$:</p>
                        <input onChange={(e) => setAmountDiscount(e.target.value)} type="text" className="modal-discount-input"/>
                    </div> 
                    <p className="discount-error-message">{errorMessage}</p>
                    <div className="modal-discount-options-btn">
                        <div className="container-option-btn-cancel">
                            <p onClick={onClose} className="option-btn-cancel">Cancelar</p>
                        </div>
                        <div className="container-option-btn-save">
                            <p onClick={()=>addDiscount()} className="option-btn-save">Salvar</p>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default ModalProductDiscount;