import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { API_URL } from "../api";
import Category from "../Category/Category";
import './styles.css';

function ModalCategoryEdit({ onClose= () => {}, update =()=>{}, product, modal, category}){

    const [amountDiscount, setAmountDiscount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [name, setName] = useState();
    const [editName, setEditName] = useState();
    const [productId, setProductId] = useState();
    let history = useHistory();


    useEffect(() => {
        if (modal === 2) {
            setEditName(category.name)
        }
    },[])

    const addCategory = () => {
        axios.post(`${API_URL}/categorys`, {
            name: name
        })
        .then(function (resp) {
            if (resp.status === 201) {
                toast.warning(`Uma nova categoria foi criada com o seguinte nome ${name}`, {
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

    const editCategory = () => {
        axios.put(`${API_URL}/categorys/${category.id}`, {
            name: editName
        })
        .then(function (resp) {
            if (resp.status === 200) {
                toast.warning(`O nome do produto foi alterado para ${editName}`, {
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

    const insertProduct = () => {
        parseInt(productId)
        axios.patch(`${API_URL}/categorys/${category.id}/insert/${productId}`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.warning(`O produto com id ${productId} foi inserido na categoria ${category.name}`, {
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

    const deleteCategory = () => {
        axios.delete(`${API_URL}/categorys/${category.id}`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.warning(`A categoria ${category.name} foi excluida`, {
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
            <div className="modal-category">
                {modal === 1 ?
                    <>
                        <h3 className="modal-category-tittle">Adicionar categoria</h3>
                        <p className="modal-category-text">Insira um nome para a categoria</p>
                        <div className="container-modal-category-input">
                            <p className="modal-category-tittle-input">Nome:</p>
                            <input onChange={(e) => setName(e.target.value)} type="text" className="modal-category-input"/>
                        </div> 
                        <div className="modal-category-options-btn">
                            <div className="container-option-btn-no">
                                <p onClick={onClose} className="option-btn-no">Voltar</p>
                            </div>
                            <div className="container-option-btn-yes">
                            <p onClick={()=>addCategory()} className="category-option-btn-yes">Salvar</p>
                            </div>
                        </div>
                    </>
                : null}
                {modal === 2 ?
                    <>
                        <h3 className="modal-category-tittle">Editar categoria</h3>
                        <p className="modal-category-text">Insira um novo nome para a categoria</p>
                        <div className="container-modal-category-input">
                            <p className="modal-category-tittle-input">Nome:</p>
                            <input value={editName} onChange={(e) => setEditName(e.target.value)} type="text" className="modal-category-input"/>
                        </div> 
                        <div className="modal-category-options-btn">
                            <div className="container-option-btn-no">
                                <p onClick={onClose} className="option-btn-no">Voltar</p>
                            </div>
                            <div className="container-option-btn-yes">
                            <p onClick={()=>editCategory()} className="category-option-btn-yes">Salvar</p>
                            </div>
                        </div>
                    </>
                :null}
                {modal === 3 ?
                    <>
                        <h3 className="modal-category-tittle">Adicionar produto</h3>
                        <p className="modal-category-text">Insira o id do produto</p>
                        <div className="container-modal-category-input">
                            <p className="modal-category-tittle-input">Id:</p>
                            <input onChange={(e) => setProductId(e.target.value)} type="text" className="modal-category-input-id"/>
                        </div> 
                        <div className="modal-category-options-btn">
                            <div className="container-option-btn-no">
                                <p onClick={onClose} className="option-btn-no">Voltar</p>
                            </div>
                            <div className="container-option-btn-yes">
                                <p onClick={()=>insertProduct()} className="category-option-btn-yes">Salvar</p>
                            </div>
                        </div>
                    </>
                :null}
                {modal === 4 ?
                    <>
                        <h3 className="modal-category-tittle">Excluir Categoria</h3>
                        <p className="modal-category-text">Tem certeza?</p>
                        <div className="modal-category-options-btn">
                            <div className="container-option-btn-no">
                                <p onClick={onClose} className="option-btn-no">Não</p>
                            </div>
                            <div className="container-option-btn-yes">
                                <p onClick={()=>deleteCategory()} className="category-option-btn-yes">Sim</p>
                            </div>
                        </div>
                    </>
                :null}
            </div>
        </div>
        
    )
}

export default ModalCategoryEdit;