import React, { useEffect, useState } from 'react'; 
import './styles.css';
import { ReactComponent as Logo } from '../logo.svg'
import { useCart } from 'react-use-cart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import AsyncSelect from 'react-select/async';
import { API_URL, fetchLocalMapBox } from '../api';
import axios from 'axios';

function Orders({onClose = () => {}}) {
    const [delivery, setDelivery] = useState();
    const [card, setCard] = useState();
    const {emptyCart, cartTotal, items, removeItem, updateItemQuantity, totalItems} = useCart();
    console.log(items)
    console.log(totalItems)

    const [total, setTotal] = useState(cartTotal);
    const initialPosition = {
        lat: -8.2001466, 
        lng: -34.9252881
    }
    const [address, setAddress] = useState({
        position: initialPosition
    });
    const [orderLocation, setOrderLocation] = useState();
    const [toggleState, setToggleState] = useState(0);
    const [taxDelivery, setTaxDelivey] = useState();
    const [changeMoney, setChangeMoney] = useState(null);
    const [amountChangeMoney, setAmountChangeMoney] = useState();
    const [deliveryDetails, setDeliveryDetails] = useState('');
    const [productsIds, setProductsIds] = useState([]);

    const count = () => {
        setToggleState(toggleState + 1)
    }

    useEffect(() => {
        axios.get(`${API_URL}/deliveryTax/${toggleState}`)
        .then(response => setTaxDelivey(response.data))
        .catch(count)

    }, [toggleState]);

    function formatPrice(price) {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return formatter.format(price);
    }

    const deliveryActived = () => {
        if (delivery !== true) {
            setDelivery(true)
            setTotal(total + taxDelivery.deliveryTax)
        }
    }

    const deliveryDisabled = () => {
        setDelivery(false)
        setTotal(cartTotal)
    }

    const choiceCard = () => {
        if (card !== true) {
            setCard(true)
            setChangeMoney(null)
        }
    }

    const choiceMoney = () => {
        setCard(false)
        setChangeMoney(false)
    }

    useEffect(() => {
        if(delivery === true) {
            setTotal(cartTotal + taxDelivery.deliveryTax)
        } else {
            setTotal(cartTotal)
        }
    }, [items]);


    const sendOrder = () => {
        

        items.map( products => {
            let count = 0;
            while (count != products.quantity) {
                productsIds.push(products)
                count += 1
                console.log(count)
            }
            count = 0
        });
        console.log(productsIds)
        const productsIdsts = productsIds.map(({ id }) => ({ id }));
        console.log(productsIdsts)
        emptyCart();
        //axios.post(`${API_URL}/orders`, {

        //})
        //.then(response => setTaxDelivey(response.data))
        //.catch(count)
    }

    const loadOptions = async (inputValue, callback) => {
        const response = await fetchLocalMapBox(inputValue);
      
        const places = response.data.features.map((item) => {
          return ({
            label: item.place_name,
            value: item.place_name,
            position: {
              lat: item.center[1],
              lng: item.center[0]
            },
          });
        });
      
        callback(places);
      };
      
      const handleChangeSelect = (place) => {
        setAddress(place);
        setOrderLocation({
          latitude: place.position.lat,
          longitude: place.position.lng,
          address: place.label
        });
      };

    return(
        <>
            <div className="container-orders">
                <div className="headers-orders">
                    <Logo className="logo-orders" onClick={onClose}/>
                </div>
                <div className="container-order-details">
                    <div className="order-details-tittle">
                        <h2 className="order-tittle">Finalize seu Pedido</h2>
                    </div>
                    <div className="container-resume-order">
                        <div className="container-options-order">
                            <p className="options-order-tittle">Selecione uma das opções abaixo</p>
                            <div className="container-options">
                                <div className="options-order-delivery">
                                    <div className="option-withdraw" onClick={() => deliveryDisabled()}>
                                        <div className={`item-withdraw ${delivery === false ? 'selected' : ''}`}></div>
                                        <p className={`withdraw ${delivery === false ? 'selected' : ''}`}>Retirar na loja</p>
                                    </div>
                                    <div className="option-delivery" onClick={() => deliveryActived()}>
                                        <div className={`item-delivery ${delivery === true ? 'selected' : ''}`}></div>
                                        <p className={`delivery ${delivery === true ? 'selected' : ''}`}>Delivery</p>
                                    </div>
                                </div>
                                <div className="options-order-delivery">
                                    <div className="option-withdraw" onClick={() => choiceCard()}>
                                        <div className={`item-withdraw ${card === true ? 'selected' : ''}`}></div>
                                        <p className={`withdraw ${card === true ? 'selected' : ''}`}>Cartão</p>
                                    </div>
                                    <div className="option-delivery" onClick={() => choiceMoney()}>
                                        <div className={`item-delivery ${card === false ? 'selected' : ''}`}></div>
                                        <p className={`delivery ${card === false ? 'selected' : ''}`}>Dinheiro</p>
                                    </div>
                                </div>
                                {changeMoney === false ? 
                                    <div className="options-order-delivery">
                                        <p className="change-tittle">Precisa de troco?</p>
                                        <div className="container-change-btn">
                                            <div className="card-change-btn-no" onClick={() =>setChangeMoney(null)}>
                                                <p className="change-btn-no">Não</p>
                                            </div>
                                            <div className="card-change-btn-yes" onClick={() =>setChangeMoney(true)}>
                                                <p className="change-btn-yes">Sim</p>
                                            </div>
                                        </div>
                                    </div>:
                                null}
                                {changeMoney ? 
                                    <div className="options-order-delivery">
                                        <div className="container-change-money">
                                            <p className="change-money-tittle">Valor para troco</p>
                                            <input onChange={(e) => setAmountChangeMoney(e.target.value)} type="text" className="change-money-input"/>
                                        </div>
                                    </div>:
                                null}
                            </div>
                            {delivery ?
                                <div className="container-map-delivery">
                                    <p className="tittle-map-delivery">Selecione seu endereço abaixo:</p>
                                    <div className="container-filter">
                                        <AsyncSelect
                                            placeholder="Ex: Rua, Bairro, Cidade - Estado, CEP, País"
                                            className="filter"
                                            loadOptions={loadOptions}
                                            onChange={value => handleChangeSelect(value)}
                                        />
                                    </div>
                                    <div className="card-map">
                                        <MapContainer center={address.position} zoom={17} key={address.position.lat} scrollWheelZoom>
                                            <TileLayer
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={address.position}>
                                                <Popup>
                                                    {address.label}
                                                </Popup>
                                            </Marker>
                                        </MapContainer>
                                    </div>
                                    <div className="container-delivery-details">
                                        <p className="delivery-details-tittle">Insira detalhes onde o pedido deve ser entregue:</p>
                                        <textarea id="input-delivery-details" onChange={(e) => setDeliveryDetails(e.target.value)} maxLength="250"/>
                                        <div id="characters-count">{250 - deliveryDetails.length} Caracteres restantes</div>
                                        
                                    </div>
                                </div> :
                            null}
                        </div>
                        <div className="container-card-order-item">
                            <div className="container-order-item">
                                <div className="container-order-item-tittle">
                                    <p className="order-item-tittle">Total dos Pedidos</p>
                                    <p className="order-clean-car" onClick={() => emptyCart()}>Limpar carrinho</p>
                                </div>
                                <div className="container-order-product">
                                    {items.map((product) => (
                                        <div className="card-order-product">
                                            <div className="container-img-order-product">
                                                <img src={product.imageUri} className="img-order-product" alt={product.name} />
                                            </div>
                                            <div className="container-order-product-description">
                                                <div className="order-product-description">
                                                    <p className="order-product-name">{product.name}</p>
                                                    <p className="order-product-price">{formatPrice(product.itemTotal)}</p>
                                                </div>
                                                <div className="container-order-product-amount">
                                                    <div className="card-order-product-amount">
                                                        <div className="container-product-less" onClick={() => updateItemQuantity(product.id, product.quantity - 1)}>
                                                            <div className="product-less"></div>
                                                        </div>
                                                        <div className="container-product-amount">
                                                            <p className="product-amount">{product.quantity}</p>
                                                        </div>
                                                        <div className="container-product-more" onClick={() => updateItemQuantity(product.id, product.quantity + 1)}>
                                                            <div className="more-horizontal"></div>
                                                            <div className="more-vertical"></div>
                                                        </div>
                                                    </div>
                                                    <div className="container-produt-remove">
                                                        <div className="button-product-remove" onClick={() => removeItem(product.id)}>
                                                            <p className="product-remove">Excluir</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="container-order-subtotal">
                                    <div className="card-order-subtotal">
                                        <p className="order-subtotal">Subtotal</p>
                                        <p className="order-subtotal-price">{formatPrice(cartTotal)}</p>
                                    </div>
                                    {delivery ? 
                                        <div className="card-order-tax-delivery">
                                            <p className="order-delivery">Taxa de entrega</p>
                                            <p className="order-tax-delivery">{formatPrice(taxDelivery.deliveryTax)}</p>
                                        </div> : 
                                    null}
                                    <div className="container-divider"></div>
                                    <div className="container-order-total">
                                        <p className="order-total">Total</p>
                                        <p className="order-total-price">{formatPrice(total)}</p>
                                    </div>
                                </div> 
                            </div>
                            <div className="container-btn-finish-order" onClick={() => sendOrder()}>
                                <p className="btn-finish-order">Concluir Pedido</p>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>            
        </>
    )
}

export default Orders;