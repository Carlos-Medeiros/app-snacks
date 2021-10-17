import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../api';
import './styles.css';

function ModalDelete({ onCloseDelete = () => {}, onCloseAll, order}) {

    const setDelete = () => {
        axios.delete(`${API_URL}/orders/${order.id}`)
        .then(function (resp) {
            if (resp.status === 204) {
                toast.error(`Pedido N°${order.code} foi excluido`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });
                onCloseAll();
            }
        })
        .catch()    
    }

    return(
        <div className="container-modal-delete">
           
        </div>
    )
}

export default ModalDelete;