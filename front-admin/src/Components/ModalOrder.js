import axios from 'axios';
import { API_URL } from '../api';
import './styles.css';
import { toast } from 'react-toastify';
import { useState } from 'react';

function ModalOrder({ onClose = () => {}, order}) {

    const [isDelete, setIsDelete] = useState(true);

    const setPending = () => {
        axios.patch(`${API_URL}/orders/${order.id}/pending`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.warning(`Status do pedido N°${order.code} foi alterado para pendente`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });                
                onClose();
            }
        })
        .catch()    
    }

    const setConfirmed = () => {
        axios.patch(`${API_URL}/orders/${order.id}/confirmed`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.warning(`Status do pedido N°${order.code} foi alterado para confirmado`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });                
                onClose();
            }
        })
        .catch()    
    }

    const setDelivery = () => {
        axios.patch(`${API_URL}/orders/${order.id}/delivery`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.warning(`Status do pedido N°${order.code} foi alterado para delivery`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });
                onClose();
            }
        })
        .catch()    
    }

    const setPickup = () => {
        axios.patch(`${API_URL}/orders/${order.id}/pickup`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.warning(`Status do pedido N°${order.code} foi alterado para retirada`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });
                onClose();
            }
        })
        .catch()    
    }

    const setDelivered = () => {
        axios.patch(`${API_URL}/orders/${order.id}/delivered`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.warning(`Status do pedido N°${order.code} foi alterado para entregue`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });
                onClose();
            }
        })
        .catch()    
    }

    const setDelete = () => {
        axios.delete(`${API_URL}/orders/${order.id}`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.error(`Pedido N°${order.code} foi excluido`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });
                onClose();
            }
        })
        .catch()    
    }

    return(
        <div className="container-modal-order">
            {isDelete ?
                <div className="modal-order">
                    <h2 className="modal-order-tittle">Detalhes do pedido</h2>
                    <div className="container-modal-order-code">
                        <p className="modal-order-tittle-code">Código do pedido:</p>
                        <p className="modal-order-code">{order.code}</p>
                    </div>
                    <div className="container-modal-order-delivery">
                        <p className="modal-order-tittle-delivery">Delivery:</p>
                        {order.delivery? <p className="modal-order-delivery">Sim</p> 
                            : 
                                        <p className="modal-order-delivery">Não</p>}
                    </div>
                    <div className="container-modal-order-card">
                        <p className="modal-order-tittle-card">Pagamento:</p>
                        {order.paymantToCard? <p className="modal-order-card">Cartão</p> 
                            : 
                                            <p className="modal-order-card">Dinheiro</p> }

                    </div>
                    {order.change != null ?
                        <div className="container-modal-order-change">
                            <p className="modal-order-tittle-change">Troco para:</p>
                            <p className="modal-order-change">R${order.change}</p> 
                        </div>
                    : null }
                    <div className="container-modal-order-products">
                        <p className="modal-order-tittle-products">Produtos:</p>
                        <div className="modal-order-products">
                            {order.products.map(product => (
                                <p className="list-product">{product.name}</p>
                            ))}
                        </div>
                    </div>      
                    <div className="container-modal-order-total">
                        <p className="modal-order-tittle-total">Total:</p>
                        <p className="modal-order-total">R${order.total}</p>
                    </div>     
                    <p className="status-order-tittle">Mudar status do pedido:</p>
                    <div className="container-set-status-order">
                        {order.status != "PENDING"?
                            <div className="container-btn-status" onClick={()=>setPending()}>
                                <p className="btn-status">Pendente</p>
                            </div>  
                        : null}
                        {order.status != "CONFIRMED"?
                            <div className="container-btn-status" onClick={()=>setConfirmed()}>
                                <p className="btn-status">Confirmado</p>
                            </div>  
                        : null}
                        {order.status != "DELIVERY"?
                            <div className="container-btn-status" onClick={()=>setDelivery()}>
                                <p className="btn-status">Delivery</p>
                            </div>  
                        : null}
                        {order.status != "PICKUP"?
                            <div className="container-btn-status" onClick={()=>setPickup()}>
                                <p className="btn-status">Retirada</p>
                            </div>  
                        : null}
                        {order.status != "DELIVERED"?
                            <div className="container-btn-status" onClick={()=>setDelivered()}>
                                <p className="btn-status">Entregue</p>
                            </div>  
                        : null}
                    </div>   
                    <div className="container-btn-delete" onClick={()=>setIsDelete(false)}>
                        <p className="btn-delete">Excluir</p>
                    </div>  
                    <div className="container-btn-close" onClick={onClose}>
                        <p className="btn-close">Fechar</p>
                    </div>  
                </div>
            : 
                <div className="modal-delete">
                    <h3 className="modal-delete-tittle">Você está preste a escluir um produto</h3>
                    <p className="modal-delete-text">Tem certeza?</p>
                    <div className="modal-delete-options-btn">
                        <div className="container-option-btn-no">
                            <p onClick={()=>setIsDelete(true)} className="option-btn-no">Não</p>
                        </div>
                        <div className="container-option-btn-yes">
                            <p onClick={()=>setDelete()} className="option-btn-yes">Sim</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ModalOrder;