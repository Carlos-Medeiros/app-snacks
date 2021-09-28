import React, { useState } from "react";
import './stylesError.css';

function ModalError({ listError, onClose = () => {}, cleanError = () => {} }){
 
    const update = () => {
        cleanError()
        onClose()
    }

    return (
            <div className="container-modal-order-error">
                <div className="modal-order-error">
                    <div className="container-modal-order-error-details">
                        <h2 className="modal-tittle">Error</h2>
                        <p className="modal-resume">Os seguintes campos estão em branco ou não foram selecionados</p>
                        <div>
                            {listError.map(erro => (
                                <p className="modal-resume-error">{erro}</p>
                            ))}
                        </div>
                        
                                        
                        
                        <div className="container-modal-btn-order-error" onClick={() => update()}>
                            <p className="modal-btn-order-error">Voltar</p>
                        </div>
                    </div>
                    
                </div>
            </div>

    )
}

export default ModalError;