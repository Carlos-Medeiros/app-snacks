import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { API_URL } from '../api';
import { ReactComponent as Logo } from '../logo.svg'
import RecoveryCode from '../RecoveryCode/RecoveryCode';
import './styles.css';

function RecoveryPassword({ email }) {

    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isCode, setIsCode] = useState(false);
    let history = useHistory();

    const sendPassword = () => {
        if (password === repeatPassword) {
            console.log(password.length)
            if (password.length >= 8) {
                setMessage('')
                axios.patch(`${API_URL}/user/${email}`, {
                    password: password
                })
                .then(function (resp) {
                    if (resp.status === 204) {
                        setMessage('')
                        window.location.reload();
                    }
                })
                .catch(setMessage('Error'))
            } else {
                setMessage('A senha deve conter no mínimo 8 digitos')
            }
        } else {
            setMessage('As senhas não coincidem')
        }
    }

    const back = () => {
        window.location.reload();
    }

    return(
        <div className="container">
            <div className="container-login">
                <div className="container-logo">
                    <Logo className="logo"/>
                </div>
                <div className="container-login-form">
                    <p className="form-text">Senha</p>
                    <input
                        className="form-email" 
                        type="password"
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />

                    <p className="form-text">Repita senha</p>
                    <input
                        className="form-email" 
                        type="password"
                        required 
                        value={repeatPassword} 
                        onChange={(e) => setRepeatPassword(e.target.value)} 
                    />
                    <div className="container-error">
                        <p className="form-error">{message}</p>
                    </div>
                    <div className="container-login-button" onClick={()=>sendPassword()}>
                        <p className="login-button">Enviar</p>
                    </div>
                    <p className="back-button" onClick={()=>back()}>Cancelar</p>
                </div>
            </div>  
        </div>
    )
}

export default RecoveryPassword;