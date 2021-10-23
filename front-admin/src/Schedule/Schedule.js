import './styles.css';
import { useEffect, useState } from 'react';
import { API_URL } from '../api';
import axios from 'axios';
import { useHistory } from 'react-router';
import ModalSchedule from '../ModalSchedule/ModalSchedule';

function Schedule() {

    const [allSchedule, setAllSchedule] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [scheduleModal, setScheduleModal] = useState();
    const [choice, setChoice] = useState();
    const [count, setCount] = useState(0);
    let history = useHistory();
    let date = new Date();
    let day = date.getDay();

    useEffect(() => {
        axios.get(`${API_URL}/workingDay`)
        .then(function (resp) {
            if (resp.status === 200) {
                setAllSchedule(resp.data)
            }
        })
        .catch(function (error) {
            if (error.response.status === 403) {
                history.push('/')
            }
        })
    },[count])

    useEffect(() => {
        let hourNow = date.getHours();
        axios.patch(`${API_URL}/workingDay/${day + 1 }`, {
            hour:hourNow
        })
        .then()
        .catch()
    },[])

    const modalOpen = (schedule) => {
        setChoice(true);
        setScheduleModal(schedule);
        setIsModal(true);
    }

    const modalClose = (schedule) => {
        setChoice(false);
        setScheduleModal(schedule);
        setIsModal(true);
    }

    return(
        <div className="container-schedule">
            <div className="container-schedule-header">
                <div className="container-header-day">
                    <h3 className="header-day">Dia</h3>
                </div>
                <div className="container-header-open">
                    <h3 className="header-open">Abertura</h3>
                </div>
                <div className="container-header-close">
                    <h3 className="header-close">Fechamento</h3>
                </div>
                <div className="container-header-isOpen">
                    <h3 className="header-isOpen">Status</h3>
                </div>
            </div>
            <div className="container-schedule-body">
                {allSchedule.map(schedule => (
                    <div className="container-schedule-contents">
                        <div className="container-schedule-day">
                            <p className="schedule-day">{schedule.name}</p>
                        </div>
                        <div className="container-schedule-open" onClick={()=>modalOpen(schedule)}>
                            <p className="schedule-open">{schedule.openingTime}:00 H</p>
                        </div>
                        <div className="container-schedule-close" onClick={()=>modalClose(schedule)}>
                            <p className="schedule-close">{schedule.closingTime}:00 H</p>
                        </div>
                        <div className="container-schedule-status">
                            {schedule.open ? 
                                <p className="schedule-status">Aberto</p>
                            : 
                                <p className="schedule-status">Fechado</p>
                            }
                        </div>
                    </div>
                ))}

                {isModal ? <ModalSchedule
                            choice={choice}
                            request={()=>setCount(count + 1)}
                            onClose={()=>setIsModal(false)}
                            schedule={scheduleModal}/>
                :null}
            </div>
        </div>
    )
}
export default Schedule;