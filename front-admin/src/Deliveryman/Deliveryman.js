import './styles.css';
import { useEffect, useState } from 'react';
import { API_URL } from '../api';
import axios from 'axios';
import { useHistory } from 'react-router';
import ModalDeliveryman from '../ModalDeliveryman/ModalDeliveryman';
import ModalDeliveryTaxEdit from '../ModalDeliveryTaxEdit/ModalDeliveryTaxEdit';

function Deliveryman() {

    const [allDeliveryman, setAllDeliveryam] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [isModalTax, setIsModalTax] = useState(false);
    const [MdTaxDelivery, setMdTaxDelivery] = useState([]);
    const [deliverymanModal, setDeliverymanModal] = useState();
    const [taxDelivery, setTaxDelivery] = useState([]);
    const [count, setCount] = useState(0);
    let history = useHistory();

    useEffect(() => {
        axios.get(`${API_URL}/user`)
        .then(function (resp) {
            if (resp.status === 200) {
                setAllDeliveryam(resp.data)
            }
        })
        .catch(function (error) {
            if (error.response.status === 403) {
                history.push('/')
            }
        })
        axios.get(`${API_URL}/deliveryTax`)
        .then(function (resp) {
            if (resp.status === 200) {
                setTaxDelivery(resp.data)
            }
        })
        .catch()
    },[count])


    const openModal = (user) => {
        setDeliverymanModal(user);
        setIsModal(true);
    }

    const openModalDelivery = (tax) => {
        setMdTaxDelivery(tax);
        setIsModalTax(true);
    }

    
    function formatPrice(price) {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return formatter.format(price);
    }

    return(
        <>
            <div className="container-tax-delivery">
                <div className="container-tax-delivery-tittle">
                    <h3 className="tax-delivery-tittle">Taxa de entrega</h3>
                </div>
                {taxDelivery.map(tax => (
                    <p className="tax-delivery" onClick={()=>openModalDelivery(tax)}>{formatPrice(tax.deliveryTax)}</p>
                ))}
            </div>
            <div className="container-deliveryman">
                <div className="container-deliveryman-header">
                    <div className="container-header-name">
                        <h3 className="header-name">Nome</h3>
                    </div>
                    <div className="container-header-email">
                        <h3 className="header-email">Email</h3>
                    </div>
                    <div className="container-header-phone">
                        <h3 className="header-phone">Telefone</h3>
                    </div>
                    <div className="container-header-status">
                        <h3 className="header-status">Status</h3>
                    </div>
                    <div className="container-header-admin">
                        <h3 className="header-admin">Admin</h3>
                    </div>
                </div>
                <div className="container-deliveryman-body">
                    {allDeliveryman.map(user => (
                        <div className="container-deliveryman-contents" onClick={()=>openModal(user)}>
                            <div className="container-deliveryman-name">
                                <p className="deliveryman-name">{user.name}</p>
                            </div>
                            <div className="container-deliveryman-email">
                                <p className="deliveryman-email">{user.email}</p>
                            </div>
                            <div className="container-deliveryman-phone">
                                <p className="deliveryman-phone">{user.phones}</p>
                            </div>
                            <div className="container-deliveryman-status">
                                {user.status === "PENDING" ? 
                                <p className="deliveryman-status-pending">Pendente</p>
                                : null}
                                {user.status === "ACCEPTED" ? 
                                <p className="deliveryman-status-accepted">Confirmado</p>
                                : null}
                                {user.status === "REJECTED" ? 
                                <p className="deliveryman-status-rejected">Rejeitado</p>
                                : null}
                                {user.status === "DISABLED" ? 
                                <p className="deliveryman-status-disabled">Desabilitado</p>
                                : null}
                            </div>
                            <div className="container-deliveryman-admin">
                                {user.admin ? 
                                    <p className="deliveryman-admin-yes">Sim</p>
                                : 
                                    <p className="deliveryman-admin-no">Não</p>
                                }
                            </div>
                        </div>
                    ))}

                    {isModal ? <ModalDeliveryman
                                request={()=>setCount(count + 1)}
                                onClose={()=>setIsModal(false)}
                                user={deliverymanModal}/>
                    :null}
                </div>
            </div>
            {isModalTax ? <ModalDeliveryTaxEdit
                                request={()=>setCount(count + 1)}
                                onClose={()=>setIsModalTax(false)}
                                taxDelivery={MdTaxDelivery}/>
                    :null}
        </>
    )
}
export default Deliveryman;