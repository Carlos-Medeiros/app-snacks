import axios from 'axios';
import { API_URL } from '../api';
import './styles.css';
import { toast } from 'react-toastify';
import { useState } from 'react';

function ModalProductEdit({ onClose= () => {}, onUpdate =()=>{}, request =()=>{}, product}) {

    const [productName, setProductName] = useState(product.name);
    const [productprice, setProductprice] = useState(product.price);
    const [productDescription, setProductDescription] = useState(product.description);
    const [productImageUri, setProductImageUri] = useState(product.imageUri);
    const [productInventory, setProductInventory] = useState(product.inventory);

    const updateProduct = () => {
        parseFloat(productprice)
        axios.put(`${API_URL}/products/${product.id}`, {
            name: productName,
            price: productprice,
            description: productDescription,
            imageUri: productImageUri,
            inventory: productInventory,
            discount: product.discount
        })
        .then(function (resp) {
            if (resp.status === 200) {
                toast.warning(`O produto de id ${product.id} foi editado`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });      
                onUpdate();  
                request();        
                onClose();
            }
        })
        .catch()    
    }

    return(
        <div className="container-modal-edit">
            <div className="modal-edit">
                <h2 className="modal-edit-tittle">Editar produto</h2>
                <div className="container-modal-edit-name">
                    <p className="modal-edit-tittle-name">Nome:</p>
                    <input value={productName} onChange={(e) => setProductName(e.target.value)} type="text" className="modal-edit-input-name"/>
                </div>
                <div className="container-modal-edit-price">
                    <p className="modal-edit-tittle-price">Preço:</p>
                    <input value={productprice} onChange={(e) => setProductprice(e.target.value)} type="text" className="modal-edit-input-price"/>
                </div>
                <div className="container-modal-edit-description">
                    <p className="modal-edit-tittle-description">Descrição:</p>
                    <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} maxLength="250" className="modal-edit-input-description"/>
                </div>
                <div className="characters-count">{250 - productDescription.length} Caracteres restantes</div>
                <div className="container-modal-edit-imageUri">
                    <p className="modal-edit-tittle-imageUri">Link da imagem:</p>
                    <input value={productImageUri} onChange={(e) => setProductImageUri(e.target.value)} type="text" className="modal-edit-input-imageUri"/>
                </div>
                <div className="container-modal-edit-inventory">
                    <p className="modal-edit-tittle-inventory">Disponível em estoque:</p>
                    <div className="container-modal-btn-inventory">
                        <div className={`container-product-btn-no ${productInventory === false ? 'actived' : ''}`} onClick={()=>setProductInventory(false)}>
                            <p className={`product-btn-no ${productInventory === false ? 'actived' : ''}`}>Não</p>
                        </div>
                        <div className={`container-product-btn-yes ${productInventory ? 'actived' : ''}`} onClick={()=>setProductInventory(true)}>
                            <p className={`product-btn-yes ${productInventory ? 'actived' : ''}`}>Sim</p>
                        </div>
                    </div>
                </div>
                <div className="container-edit-btn">
                    <div className="container-edit-btn-close" onClick={onClose}>
                        <p className="edit-btn-close">Voltar</p>
                    </div>  
                    <div className="container-edit-btn-save" onClick={()=>updateProduct()}>
                        <p className="edit-btn-save">Salvar</p>
                    </div> 
                </div> 
            </div>
        </div>
    )
}

export default ModalProductEdit;