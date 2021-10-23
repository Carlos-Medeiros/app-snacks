import axios from 'axios';
import { API_URL } from '../api';
import './styles.css';
import { toast } from 'react-toastify';
import { useState } from 'react';

function ModalNewProduct({ onClose= () => {}, update =()=>{}}) {

    const [productName, setProductName] = useState("");
    const [productprice, setProductprice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImageUri, setProductImageUri] = useState("");
    const [productInventory, setProductInventory] = useState(true);

    const createProduct = () => {
        parseFloat(productprice)
        axios.post(`${API_URL}/products`, {
            name: productName,
            price: productprice,
            description: productDescription,
            imageUri: productImageUri,
            inventory: productInventory,
        })
        .then(function (resp) {
            if (resp.status === 201) {
                toast.warning(`Um novo produto foi criado`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });      
                update();        
                onClose();
            }
        })
    }

    return(
        <div className="container-modal-new">
            <div className="modal-new">
                <h2 className="modal-new-tittle">Criar produto</h2>
                <div className="container-modal-new-name">
                    <p className="modal-new-tittle-name">Nome:</p>
                    <input onChange={(e) => setProductName(e.target.value)} type="text" className="modal-new-input-name"/>
                </div>
                <div className="container-modal-new-price">
                    <p className="modal-new-tittle-price">Preço:</p>
                    <input onChange={(e) => setProductprice(e.target.value)} type="text" className="modal-new-input-price"/>
                </div>
                <div className="container-modal-new-description">
                    <p className="modal-new-tittle-description">Descrição:</p>
                    <textarea onChange={(e) => setProductDescription(e.target.value)} maxLength="250" className="modal-new-input-description"/>
                </div>
                <div className="characters-count">{250 - productDescription.length} Caracteres restantes</div>
                <div className="container-modal-new-imageUri">
                    <p className="modal-new-tittle-imageUri">Link da imagem:</p>
                    <input onChange={(e) => setProductImageUri(e.target.value)} type="text" className="modal-new-input-imageUri"/>
                </div>
                <div className="container-modal-new-inventory">
                    <p className="modal-new-tittle-inventory">Disponível em estoque:</p>
                    <div className="container-modal-btn-inventory">
                        <div className={`container-product-btn-no ${productInventory === false ? 'actived' : ''}`} onClick={()=>setProductInventory(false)}>
                            <p className={`product-btn-no ${productInventory === false ? 'actived' : ''}`}>Não</p>
                        </div>
                        <div className={`container-product-btn-yes ${productInventory ? 'actived' : ''}`} onClick={()=>setProductInventory(true)}>
                            <p className={`product-btn-yes ${productInventory ? 'actived' : ''}`}>Sim</p>
                        </div>
                    </div>
                </div>
                <div className="container-new-btn">
                    <div className="container-new-btn-close" onClick={onClose}>
                        <p className="new-btn-close">Voltar</p>
                    </div>  
                    <div className="container-new-btn-save" onClick={()=>createProduct()}>
                        <p className="new-btn-save">Salvar</p>
                    </div> 
                </div> 
            </div>
        </div>
    )
}

export default ModalNewProduct;