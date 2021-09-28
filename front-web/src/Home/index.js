import React, { useEffect, useState } from 'react';
import './styles.css';
import { ReactComponent as Img } from '../imgHome.svg'
import { ReactComponent as Local } from '../local.svg'
import { ReactComponent as Fechado } from '../fechado.svg'
import { ReactComponent as Logo } from '../logo.svg'
import { ReactComponent as Car } from '../carrinho.svg'
import CategoryList from './CategoryList';
import { API_URL, fetchCategorys } from '../api';
import ModalProduct from '../Components/ModalProduct';
import Orders from '../Orders';
import { useCart } from 'react-use-cart';
import ModalWorkingDay from '../Components/ModalWorkingDay';
import axios from 'axios';

function Home() {

    const [categorys, setCategorys] = useState([]);
    const [productItemContainer, setProductItemContainer] = useState(0);
    const [viewOrders, setViewOrders] = useState(false);
    const [categoryActive, setCategoryActive] = useState();
    const [viewWorkingDay, setViewWorkingDay] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [dayWeek, setDayWeek] = useState();
    const [count, setCount] = useState(0);
    const [workingDay, setWorkingDay] = useState([]);
    const {items} = useCart();
    let date = new Date();
    let day = date.getDay();
    useEffect(() => {

        fetchCategorys()
        .then(response => setCategorys(response.data))
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {    
        requestDay();
    }, [count]);

    useEffect(() => {
   
        axios.get(`${API_URL}/workingDay`)
        .then(response => setWorkingDay(response.data))
        .catch(error => console.log(error))
    },[]);

    const requestDay = () => {
        let hourNow = date.getHours();
        axios.patch(`${API_URL}/workingDay/${day}`, {
            hour:hourNow
        })
        .then(response => setDayWeek(response.data))
        .catch(error => console.log(error))  
        if (dayWeek != undefined) {
            setIsOpen(dayWeek.open)
        } else {
            setTimeout(() => {
                setCount(count + 1)
            }, 1000);            
        }
        setTimeout(() => {
            setCount(count + 1)
        }, 60000);
    }

    return(
        <>  
            {viewOrders ? <Orders onClose={() => setViewOrders(false)}/>:
            <div className="container">
                <div className="main-navbar">
                    <Logo className="logo"/>
                    <div className="shopping-car" onClick={() => setViewOrders(true)}>
                        {items.length >= 1 ?
                            <div className="shopping-car-itens-amount">
                                <p className="shopping-car-amount">{items.length}</p>
                            </div> : 
                            <div className="shopping-car-itens-amount-null">
                            </div>
                        }
                        <Car className="car"/>
                    </div>
                </div>
                    <div className="containerHome">
                        <div className="infoHome">
                            <h1 className="h1Home">Peça já o seu lanche!</h1>
                            <p className="pHome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit nisi proin fringilla nibh.</p>
                            <div className="containerLocal">
                                <Local className="imgLocal"/>
                                <p className="pLocal">Rua Cuiabá, 835, Jaboatão dos Guararapes, PE</p>
                            </div>
                            <div className="containerStatus" onClick={() => setViewWorkingDay(true)}>
                                {isOpen ? 
                                <p className="pStatus">Aberto</p>
                                : 
                                <p className="pStatus">Fechado</p>
                                }
                            </div>
                            {viewWorkingDay ? 
                                <ModalWorkingDay onClose={() => setViewWorkingDay(false)}
                                    workingDay={workingDay}/>
                            :null}
                        </div>
                        <Img className="imgHome"/>
                    </div> 

                <div className="containerProdutos">
                    <div className="produtos">
                        <h2 className="produtosName">Produtos</h2>
                    </div>
                    <div className="containerItens">
                        <CategoryList
                        categorys={categorys}
                        productItemContainer={productItemContainer}
                        setProductItemContainer={setProductItemContainer}
                        setCategoryActive={setCategoryActive}/>
                        
                        {productItemContainer !== 0?
                            <ModalProduct 
                                onClose={() => setProductItemContainer(0)}
                                productItemContainer={productItemContainer}
                                categoryActive={categoryActive}/>
                        : null}
                    </div>
                </div>
                <div className="containerFooter">
                    <h2 className="footer">Rodapé</h2>
                </div>
            </div>}
        </>
    )

}

export default Home;