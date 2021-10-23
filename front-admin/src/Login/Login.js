import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../api';
import { ReactComponent as Logo } from '../logo.svg'
import RecoveryEmail from '../RecoveryEmail/RecoveryEmail';
import './styles.css';

function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState('');
    const [isForgot, setIsForgot] = useState(false);

    let history = useHistory();

    const login = () => {
        axios.post(`${API_URL}/user/login`, {
            email: email,
            password: password
        })
        .then(function (resp) {
            if (resp.status === 200) {
                setMessage('')
                localStorage.setItem('@token', resp.data.token)
                home()
            }
        })
        .catch(function (error) {
            if (error.response.status === 401 || error.response.status === 500) {
                setMessage('Credenciais inválidas')
            }
        })
    }

    const home = () => {
        history.push('/home')
    }

    return(
        <div className="container">
            {isForgot ?
                <RecoveryEmail
                    onClose={() => setIsForgot(false)}/>
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
                    <p className="form-text">Senha</p>
                    <input
                        className="form-password" 
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="container-error">
                        <p className="form-error">{message}</p>
                    </div>
                    <div className="container-login-button" onClick={() => login()}>
                        <p className="login-button">Entrar</p>
                    </div>

                    <p className="forgot-password" onClick={() => setIsForgot(true)}>Esqueceu a senha?</p>
                </div>
        </div>
            }
        </div>
    )
}

export default Login;