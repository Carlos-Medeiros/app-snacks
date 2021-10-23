import axios from 'axios';
import { API_URL } from '../api';
import './ModalDeliverymanStyles.css';
import { toast } from 'react-toastify';
import { useState } from 'react';

function ModalDeliveryman({ onClose = () => {}, request = () => {}, user}) {

    const [isAdmin, setIsAdmin] = useState(true);

    const setAccepted = () => {
        axios.patch(`${API_URL}/user/accepted/${user.id}`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.warning(`Status da conta foi alterado para confirmado`, {
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
        .catch()    
    }

    const setRejected = () => {
        axios.patch(`${API_URL}/user/rejected/${user.id}`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.warning(`Status da conta foi alterado para rejeitado`, {
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
        .catch()    
    }

    const setDisabled = () => {
        axios.patch(`${API_URL}/user/disabled/${user.id}`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.warning(`Status da conta foi alterado para desabilitado`, {
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
        .catch()    
    }

    const setAdmin = () => {
        axios.patch(`${API_URL}/user/admin/${user.id}`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.warning(`Admin alterado`, {
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
        .catch()    
    }

    return(
        <div className="container-modal-deliveryman">
            {isAdmin ?
                <div className="modal-deliveryman">
                    <h2 className="modal-deliveryman-tittle">Detalhes da conta</h2>
                    <div className="container-modal-deliveryman-name">
                        <p className="modal-deliveryman-tittle-name">Nome:</p>
                        <p className="modal-deliveryman-name">{user.name}</p>
                    </div>
                    <div className="container-modal-deliveryman-email">
                        <p className="modal-deliveryman-tittle-email">Email:</p>
                        <p className="modal-deliveryman-email">{user.email}</p> 
                    </div>
                    <div className="container-modal-deliveryman-phone">
                        <p className="modal-deliveryman-tittle-phone">Telefone:</p>
                        <p className="modal-deliveryman-phone">{user.phones}</p> 
                    </div>
                    <div className="container-modal-deliveryman-status">
                        <p className="modal-deliveryman-tittle-status">Status:</p>
                        {user.status === "PENDING" ? 
                               <p className="modal-deliveryman-status">Pendente</p>
                            : null}
                            {user.status === "ACCEPTED" ? 
                               <p className="modal-deliveryman-status">Confirmado</p>
                            : null}
                            {user.status === "REJECTED" ? 
                               <p className="modal-deliveryman-status">Rejeitado</p>
                            : null}
                            {user.status === "DISABLED" ? 
                               <p className="modal-deliveryman-status">Desabilitado</p>
                            : null}
                    </div>      
                    <p className="status-deliveryman-tittle">Mudar status da conta:</p>
                    <div className="container-set-status-deliveryman">
                        {user.status != "ACCEPTED"?
                            <div className="container-btn-status" onClick={()=>setAccepted()}>
                                <p className="btn-status">Aceitar</p>
                            </div>  
                        : null}
                        {user.status != "REJECTED"?
                            <div className="container-btn-status" onClick={()=>setRejected()}>
                                <p className="btn-status">Rejeitar</p>
                            </div>  
                        : null}
                        {user.status != "DISABLED"?
                            <div className="container-btn-status" onClick={()=>setDisabled()}>
                                <p className="btn-status">Desabilitar</p>
                            </div>  
                        : null}
                    </div>   
                    {user.admin ? 
                        <div className="container-btn-admin" onClick={()=>setIsAdmin(false)}>
                            <p className="btn-admin">Remover admin</p>
                        </div>  
                    :  
                        <div className="container-btn-admin" onClick={()=>setIsAdmin(false)}>
                            <p className="btn-admin">Tornar admin</p>
                        </div> 
                    }
                    <div className="container-btn-close" onClick={onClose}>
                        <p className="btn-close">Fechar</p>
                    </div>  
                </div>
            : 
                <div className="modal-deliveryman">
                    {user.admin ? 
                        <h3 className="modal-deliveryman-tittle">Você está preste a remover um admin</h3>
                    : 
                        <h3 className="modal-deliveryman-tittle">Você está preste a tornar um admin</h3>
                    }
                    <p className="modal-deliveryman-text">Tem certeza?</p>
                    <div className="modal-deliveryman-options-btn">
                        <div className="container-option-btn-no">
                            <p onClick={()=>setIsAdmin(true)} className="option-btn-no">Não</p>
                        </div>
                        <div className="container-option-btn-yes">
                            <p  onClick={()=>setAdmin()} className="option-btn-yes">Sim</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ModalDeliveryman;