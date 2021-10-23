import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { API_URL } from "../api";
import './styles.css';

function ModalProductDelete({ onClose =()=>{}, onUpdate =()=>{}, allClose =()=>{}, product}){

    const [errorMessage, setErrorMessage] = useState("");
    let history = useHistory();

    const deleteProduct = () => {
        axios.delete(`${API_URL}/products/${product.id}`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.warning(`O produto com id ${product.id} foi excluído`, {
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
                allClose();
            }
        })
        .catch(function (error) {
            if (error.response.status === 403) {
                history.push('/')
            }
            if (error.response.status === 500) {
                setErrorMessage("Certifique-se que este produto não está em nenhum pedido/categoria")
            }
        })
    }

    return (
        <div className="modal-delete">
            <h3 className="modal-delete-tittle">Você está preste a excluir um produto</h3>
            <p className="modal-delete-text">Tem certeza?</p>
            <p className="modal-delete-error">{errorMessage}</p>
            <div className="modal-delete-options-btn">
                <div className="container-option-btn-no">
                    <p onClick={onClose} className="option-btn-no">Não</p>
                </div>
                <div className="container-delete-option-btn-yes">
                    <p onClick={()=>deleteProduct()} className="delete-option-btn-yes">Sim</p>
                </div>
            </div>
        </div>
    )
}

export default ModalProductDelete;