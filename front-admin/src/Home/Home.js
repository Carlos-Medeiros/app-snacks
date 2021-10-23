import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { API_URL } from '../api';
import Category from '../Category/Category';
import Deliveryman from '../Deliveryman/Deliveryman';
import { ReactComponent as Logo } from '../logo.svg';
import Order from '../Order/Order';
import Product from '../Product/Product';
import Schedule from '../Schedule/Schedule';
import './styles.css';

function Home() {

    const [toggleState, setToggleState] = useState(0);
    let history = useHistory();

    useEffect(() => {
        axios.get(`${API_URL}/products`)
        .then()
        .catch(function (error) {
            if (error.response.status === 403) {
                history.push('/')
            }
        })
    },)

    const getContent = (num) => {
        setToggleState(num)
    }

    const exit = () => {
        localStorage.setItem('@token', 'a');
        history.push('/')
    }

    return(
        <div className="container-home">
            <div className="container-home-header">
                <Logo className="logo"/>
                <div className="container-btn-exit" onClick={()=>exit()}>
                    <p className="btn-exit">Sair</p>
                </div>
            </div>
            <div className="container-home-items">
                <div className="btn-items" onClick={()=>getContent(1)}>
                    <p className={toggleState === 1 ? "items-active" : "items"}>Pedidos</p>
                </div>
                <div className="btn-items" onClick={()=>getContent(2)}>
                    <p className={toggleState === 2 ? "items-active" : "items"}>Entregadores</p>
                </div>
                <div className="btn-items" onClick={()=>getContent(3)}>
                    <p className={toggleState === 3 ? "items-active" : "items"}>Produtos</p>
                </div>
                <div className="btn-items" onClick={()=>getContent(4)}>
                    <p className={toggleState === 4 ? "items-active" : "items"}>Categorias</p>
                </div>
                <div className="btn-items" onClick={()=>getContent(5)}>
                    <p className={toggleState === 5 ? "items-active" : "items"}>Horários</p>
                </div>
            </div>

            <div className="container-home-contents">
                {toggleState === 1 ? <Order/> : null}
                {toggleState === 2 ? <Deliveryman/> : null}
                {toggleState === 3 ? <Product/> : null}
                {toggleState === 4 ? <Category/> : null}
                {toggleState === 5 ? <Schedule/> : null}
            </div>
        </div>
    )
}

export default Home;