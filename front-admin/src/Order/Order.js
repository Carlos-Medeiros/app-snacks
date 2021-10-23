import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { API_URL } from '../api';
import ModalOrder from '../ModalOrder/ModalOrder';
import './styles.css';

function Order() {

    const [toggleState, setToggleState] = useState(0);
    const [orders, setOrders] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [orderModal, setOrderModal] = useState();

    const getOrder = (order) => {
        setOrderModal(order)
        setIsModal(true)
    }

    const getContent = (num) => {
        setToggleState(num)

        if (num === 1) {
            axios.get(`${API_URL}/orders/pending`)
            .then(function (resp) {
                if (resp.status === 200) {
                    setOrders(resp.data)
                }
            })
            .catch(function (error) {
                if (error.response.status === 403) {
                }
            })
        }
        
        if (num === 2) {
            axios.get(`${API_URL}/orders/confirmed`)
            .then(function (resp) {
                if (resp.status === 200) {
                    setOrders(resp.data)
                }
            })
            .catch(function (error) {
                if (error.response.status === 403) {
                }
            })
        }

        if (num === 3) {
            axios.get(`${API_URL}/orders/readyForDelivery`)
            .then(function (resp) {
                if (resp.status === 200) {
                    setOrders(resp.data)
                }
            })
            .catch(function (error) {
                if (error.response.status === 403) {
                }
            })
        }

        if (num === 4) {
            axios.get(`${API_URL}/orders/readyForPickup`)
            .then(function (resp) {
                if (resp.status === 200) {
                    setOrders(resp.data)
                }
            })
            .catch(function (error) {
                if (error.response.status === 403) {
                }
            })
        }

        if (num === 5) {
            axios.get(`${API_URL}/orders/delivered`)
            .then(function (resp) {
                if (resp.status === 200) {
                    setOrders(resp.data)
                }
            })
            .catch(function (error) {
                if (error.response.status === 403) {
                }
            })
        }
    }

    return(
        <div className="container-order">
            <div className="container-order-type">
                <p className={toggleState === 1 ? "order-active" : "order"} onClick={()=>getContent(1)}>Pendente</p>
                <p className={toggleState === 2 ? "order-active" : "order"} onClick={()=>getContent(2)}>Confirmado</p>
                <p className={toggleState === 3 ? "order-active" : "order"} onClick={()=>getContent(3)}>Delivery</p>
                <p className={toggleState === 4 ? "order-active" : "order"} onClick={()=>getContent(4)}>Retirada</p>
                <p className={toggleState === 5 ? "order-active" : "order"} onClick={()=>getContent(5)}>Entregue</p>
            </div>
            <div className="container-order-contents">
                
                {orders.map(order => (
                     <div className="container-order-item" onClick={()=>getOrder(order)}>
                         <p className="order-item-tittle">Código</p>
                         <p className="order-item-code">{order.code}</p>
                     </div>
                ))}

                {isModal ? <ModalOrder 
                            request={()=>getContent(toggleState)}
                            order={orderModal}
                            onClose={()=>setIsModal(false)}/> 
                : null}
            </div>
        </div>
    )
}

export default Order;