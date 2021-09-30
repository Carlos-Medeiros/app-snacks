import React, { useEffect, useState } from 'react'; 
import './styles.css';
import { ReactComponent as Logo } from '../logo.svg'
import { useCart } from 'react-use-cart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import AsyncSelect from 'react-select/async';
import { API_URL, fetchLocalMapBox } from '../api';
import axios from 'axios';
import ModalOrder from '../Components/ModalOrder';
import ModalError from '../Components/ModalError';

function Orders({onClose = () => {}}) {
    const [delivery, setDelivery] = useState();
    const [card, setCard] = useState();
    const {emptyCart, cartTotal, items, removeItem, updateItemQuantity} = useCart();
    const [deliveryId, setDeliveryId] = useState([]); 
    const [isOpen, setIsOpen] = useState(false);
    const [total, setTotal] = useState(cartTotal);
    const [error, setError] = useState([]);
    const [isError, setIsError] = useState(false);

    const initialPosition = {
        lat: -8.2001466, 
        lng: -34.9252881
    }
    const [address, setAddress] = useState({
        position: initialPosition
    });

    const [orderLocation, setOrderLocation] = useState();
    const [taxDelivery, setTaxDelivey] = useState();
    const [listTaxDelivery, setListTaxDelivery] = useState([]);
    const [changeMoney, setChangeMoney] = useState(null);
    const [amountChangeMoney, setAmountChangeMoney] = useState("");
    const [deliveryDetails, setDeliveryDetails] = useState("");
    const [productsIds, setProductsIds] = useState([]);
    const [code, setCode] = useState();

    let numberRandom = 0;


    useEffect(() => {
        axios.get(`${API_URL}/deliveryTax`)
        .then(response => setListTaxDelivery(response.data))
        .catch()
        setOrderLocation({
            latitude: -8.200085,
            longitude: -34.9274177,
            address: "Rua Cuiabá, 835 - Candeias"
        })

        
    numberRandom = Math.floor(Math.random() * 999999 + 100000)
    setCode(numberRandom)
    }, []);

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
        setDeliveryDetails("")
    }

    const deliveryDisabled = () => {
        setDelivery(false)
        setTotal(cartTotal)
        setOrderLocation({
            latitude: -8.200085,
            longitude: -34.9274177,
            address: "Rua Cuiabá, 835 - Candeias"
        })

        setDeliveryDetails("Retirar na loja")
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
    
    const completedOrder = () => {      
        items.map( products => {
            let count = 0;
            while (count != products.quantity) {
                productsIds.push(products)
                count += 1
            }
            count = 0
        });
        const allProductsIds = productsIds.map(({ id }) => ({ id }));

        if (deliveryDetails == '' 
            | card == undefined 
            | amountChangeMoney == ""
            | delivery == undefined 
            | allProductsIds.length == 0) {
            
            if (delivery == undefined) {
                error.push("Forma de entrega não selecionada")
                setIsError(true)
            }
            if (delivery == true & deliveryDetails == "") {
                error.push("Detalhes para a entrega em branco")
                setIsError(true)
            }
            if (card == undefined) {
                error.push("Forma de pagamento não selecionada")
                setIsError(true)
            }
            if (card == false) {
                if(changeMoney == false) {
                    error.push("Troco não selecionado")
                    setIsError(true)
                }
                if(changeMoney == true & amountChangeMoney.length == ""){
                    error.push("Valor para troco em branco")
                    setIsError(true)
                }
            }
            if (allProductsIds.length == 0) {
                error.push("Nenhum item selecionado")
                setIsError(true)
            } 
        }

        if (isError === false & error.length === 0) {
            sendOrder(allProductsIds);
        }
    }

    const sendOrder = (allProductsIds) => {
        numberRandom = Math.floor(Math.random() * 999999 + 100000)
        while (numberRandom > 999999) {
            numberRandom = Math.floor(Math.random() * 999999 + 100000)
        }
        setCode(numberRandom)
        setDeliveryId([])
        deliveryId.push(taxDelivery)


        
        const allTaxDeliveryId = deliveryId.map(({ id }) => ({ id }));

        if (changeMoney == true) {
            setAmountChangeMoney(parseInt(amountChangeMoney))
        }

        axios.post(`${API_URL}/orders`, {
            code: numberRandom,
            address: orderLocation.address,
            latitude: orderLocation.latitude,
            longitude: orderLocation.longitude,
            details: deliveryDetails,
            paymantToCard: card,
            change: amountChangeMoney,
            delivery: delivery,
            products: allProductsIds,
            deliveryTax: allTaxDeliveryId
        })
        .then(cleanAttributes())
        .catch(error => console.log(error))
    }

    const cleanAttributes = () => {
        emptyCart()
        setDeliveryId([])
        setIsOpen(true)
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

    if (taxDelivery === undefined) {
        if (listTaxDelivery.length > 0) {
            setTaxDelivey(listTaxDelivery[0])
        }
    }

    const cancelOrder = () => {
        emptyCart()
        onClose()
    }

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
                        {isError? 
                            <ModalError listError={error}
                                        onClose={() => setIsError(false)}
                                        cleanError={() => setError([])}/>
                        :null}
                        {isOpen ? 
                            <ModalOrder code={code}/>
                        :null}
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
                            <div className="container-btn-order">
                                <div className="container-btn-cancel-order" onClick={() => cancelOrder()}>
                                    <p className="btn-cancel-order">Cancelar Pedido</p>
                                </div>
                                <div className="container-btn-finish-order" onClick={() => completedOrder()}>
                                    <p className="btn-finish-order">Concluir Pedido</p>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>            
        </>
    )
}

export default Orders;