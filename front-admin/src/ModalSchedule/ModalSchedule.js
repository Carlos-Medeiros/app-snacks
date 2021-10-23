import './styles.css';
import axios from 'axios';
import { API_URL } from '../api';
import { toast } from 'react-toastify';
import { useState } from 'react';

function ModalSchedule({ onClose = () => {}, request = () => {}, schedule, choice}) {

    const [isAdmin, setIsAdmin] = useState(true);
    const [newTime, setNewTime] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const saveNewTime = () => {
        parseInt(typeof(newTime))
        console.log(newTime)
        if (newTime >= 0 && newTime <= 23) {
            setErrorMessage("")
            if (choice) {
                axios.patch(`${API_URL}/workingDay/${schedule.id}/opening-time`, {
                    openingTime: newTime
                })
                .then(function (resp) {
                    if (resp.status === 204) {
                        toast.warning(`Hórario de abertura de ${schedule.name} foi alterado para ${newTime}:00 H`, {
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
            else {
                axios.patch(`${API_URL}/workingDay/${schedule.id}/closing-time`, {
                    closingTime: newTime
                })
                .then(function (resp) {
                    if (resp.status === 204) {
                        toast.warning(`Hórario de fechamento de ${schedule.name} foi alterado para ${newTime}:00 H`, {
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

        }
        else {
            setErrorMessage("O novo hórario de estar entre 0 e 23")
        }  
    }

    return(
        <div className="container-modal-schedule">
            <div className="modal-schedule">
                {choice ? 
                    <h2 className="modal-schedule-tittle">Alterar hórario de abertura</h2>
                :
                    <h2 className="modal-schedule-tittle">Alterar hórario de fechamento</h2>
                }
                <div className="container-modal-schedule-day">
                    <p className="modal-schedule-tittle-day">Dia:</p>
                    <p className="modal-schedule-day">{schedule.name}</p>
                </div>  
                <div className="container-modal-schedule-time">
                    {choice ?
                        <p className="modal-schedule-tittle-open">Abertura atual:</p>
                    :
                        <p className="modal-schedule-tittle-close">Fechamento atual:</p>
                    }
                    {choice ?
                        <p className="modal-schedule-open">{schedule.openingTime}:00 H</p>
                    :
                        <p className="modal-schedule-close">{schedule.closingTime}:00 H</p>
                    }
                </div>  
                <div className="container-modal-schedule-input">
                    <p className="modal-schedule-tittle-input">Hórario novo:</p>
                    <input onChange={(e) => setNewTime(e.target.value)} type="text" className="modal-schedule-input"/>
                </div>  
                <p className={"modal-error-message"}>{errorMessage}</p>
                <div className="container-modal-schedule-btn-close">
                    <p className="modal-schedule-btn-close" onClick={onClose}>Cancelar</p>
                </div>
                <div className="container-modal-schedule-btn-save">
                    <p className="modal-schedule-btn-save" onClick={()=>saveNewTime()}>Salvar</p>
                </div>

            </div>
        </div>
    )
}

export default ModalSchedule;