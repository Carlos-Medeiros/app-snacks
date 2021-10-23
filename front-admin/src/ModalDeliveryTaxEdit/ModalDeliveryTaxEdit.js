import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { API_URL } from "../api";
import './styles.css';

function ModalDeliveryTaxEdit({ onClose= () => {}, request =()=>{}, taxDelivery}){

    const [value, setValue] = useState(taxDelivery.deliveryTax);
    let history = useHistory();

    const editTax = () => {
        parseInt(value)
        axios.put(`${API_URL}/deliveryTax/${taxDelivery.id}`, {
            deliveryTax: value
        })
        .then(function (resp) {
            if (resp.status === 204) {
                toast.warning(`A taxa de delivery foi alterada para R$${value} `, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                }); 
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

    return (
        <div className="modal">
            <div className="modal-category">
                <h3 className="modal-category-tittle">Editar taxa</h3>
                <p className="modal-category-text">Insira um valor</p>
                <div className="container-modal-category-input">
                    <p className="modal-category-tittle-input">R$:</p>
                    <input value={value} onChange={(e) => setValue(e.target.value)} type="text" className="modal-category-input-id"/>
                </div> 
                <div className="modal-category-options-btn">
                    <div className="container-option-btn-no">
                        <p onClick={onClose} className="option-btn-no">Voltar</p>
                    </div>
                    <div className="container-option-btn-yes">
                        <p onClick={()=>editTax()} className="category-option-btn-yes">Salvar</p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ModalDeliveryTaxEdit;