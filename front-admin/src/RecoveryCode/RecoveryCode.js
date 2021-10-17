import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../api';
import { ReactComponent as Logo } from '../logo.svg'
import RecoveryPassword from '../RecoveryPassword/RecoveryPassword';
import './styles.css';

function RecoveryCode({ onClose=()=>{}, email }) {

    const [code, setCode] = useState();
    const [message, setMessage] = useState('');
    const [isPassword, setIsPassword] = useState(false);

    const sendCode = () => {
        axios.post(`${API_URL}/keyValidation`, {
            email: email,
            numberValidation: code
        })
        .then(function (resp) {
            if (resp.status === 200) {
                setMessage('')
                setIsPassword(true)
            }
        })
        .catch(function (error) {
            if (error.response.status === 400) {
                setMessage('Código inválido')
            }
        })
    }

    const resendCode = () => {
        axios.put(`${API_URL}/emailValidator/${email}/1`)
        .then(function (resp) {
            if (resp.status === 200) {
                setMessage('')
            }
        })
        .catch(function (error) {
            if (error.response.status === 400) {
                setMessage('Erro inesperado')
            }
        })
    }

    return(
        <div className="container">
            {isPassword ? 
                <RecoveryPassword email={email}/>
            :
                <div className="container-login">
                    <div className="container-logo">
                        <Logo className="logo"/>
                    </div>
                    <div className="container-login-form">
                        <p className="form-text">Código</p>
                        <input
                            className="form-code" 
                            type="text"
                            required 
                            value={code} 
                            onChange={(e) => setCode(e.target.value)} 
                        />
                        <div className="container-error">
                            <p className="form-error">{message}</p>
                        </div>
                        <p className="resend-code" onClick={()=>resendCode()}>Reenviar código</p>
                        <div className="container-login-button" onClick={()=>sendCode()}>
                            <p className="login-button">Prosseguir</p>
                        </div>
                        <p className="back-button" onClick={onClose}>Voltar</p>
                    </div>
                </div>
            }   
        </div>
    )
}

export default RecoveryCode;