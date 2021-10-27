import React, { useState } from "react";
import './stylesOrder.css';
import { ReactComponent as Close } from '../close.svg'
import { Link, Router, Route } from "react-router-dom";
import Home from "../Home";

function ModalOrder({ code, onClose = () => {} }){
 

    return (
            <div className="container-modal-order">
                <div className="modal-order">
                        <div className="container-modal-order-details">
                            <h2 className="modal-tittle">Pedido Finalizado</h2>
                            <p className="modal-resume">Para confirmar o pedido envie o seguinte código para o wpp da loja</p>
                            <p className="modal-resume-code">{code}</p> 
                            <div className="container-modal-btn-order">
                                <a href={`https://api.whatsapp.com/send?1=pt_BR&phone=558192233905&text=Código_do_pedido_${code}`} 
                                    className="modal-btn-order">Enviar Código</a>
                            </div>
                        </div>
                    
                </div>
            </div>

    )
}

export default ModalOrder;