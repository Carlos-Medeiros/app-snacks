import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../api';
import { ReactComponent as Logo } from '../logo.svg'
import RecoveryCode from '../RecoveryCode/RecoveryCode';
import './styles.css';

function RecoveryEmail({ onClose=()=>{} }) {

    const [email, setEmail] = useState();
    const [message, setMessage] = useState('');
    const [isCode, setIsCode] = useState(false);

    const sendEmail = () => {
        axios.put(`${API_URL}/emailValidator/${email}/1`)
        .then(function (resp) {
            if (resp.status === 200) {
                setMessage('')
                setIsCode(true)
            }
        })
        .catch(function (error) {
            if (error.response.status === 400) {
                setMessage('Conta não encontrada')
            }
        })
    }

    return(
        <div className="container">
            {isCode ? 
                <RecoveryCode
                    onClose={() => setIsCode(false)}
                    email={email}
                    />
            :
                <div className="container-login">
                    <div className="container-logo">
                        <Logo className="logo"/>
                    </div>
                    <div className="container-login-form">
                        <p className="form-text">Email</p>
                        <input
                            className="form-email" 
                            type="text"
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <div className="container-error">
                            <p className="form-error">{message}</p>
                        </div>
                        <div className="container-login-button" onClick={()=>sendEmail()}>
                            <p className="login-button">Enviar</p>
                        </div>
                        <p className="back-button" onClick={onClose}>Cancelar</p>
                    </div>
                </div>
            }   
        </div>
    )
}

export default RecoveryEmail;