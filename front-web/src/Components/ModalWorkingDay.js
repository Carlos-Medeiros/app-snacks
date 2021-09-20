import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../api";
import './stylesWorkingDay.css';
import { ReactComponent as Close } from '../close.svg'


function ModalWorkingDay({ onClose= () => {}, workingDay}){
 

    return (
        <div className="container-modal-wk">
           <div className="modal-wk">
                <div className="container-wk-close" onClick={onClose}>
                    <Close className="wk-close"/>
                </div>
                <div className="container-week-details">
                   <div className="week-details">
                        <p className="week-day">Dia</p>
                        <p className="week-open-time">Abertura</p>
                        <p className="week-close-time">Fechamento</p>
                   </div>
                   <div className="container-day-week">
                        {workingDay.map(wk => (
                            <div className="day-details">

                                <p className="day-name">{wk.name}</p>   
                                <p className="day-open-time">{wk.openingTime}H</p>
                                <p className="day-close-time">{wk.closingTime}H</p>
                            </div>
                        ))}
                    </div>
                </div>
               
           </div>
        </div>
    )
}

export default ModalWorkingDay;