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
    const [workingDay, setWorkingDay] = useState([]);
    const [dayWeek, setDayWeek] = useState();
    const [dayOfWeek, setDayOfWeek] = useState();
    const {items} = useCart();
    const [count, setCount] = useState(0);
    let date = new Date();
    let day = 1 + date.getDay;
    let hours = date.getMinutes();

    useEffect(() => {

        fetchCategorys()
        .then(response => setCategorys(response.data))
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {    

        axios.patch(`${API_URL}/workingDay`)
        .then(sleep)
        .catch()

        const sleep = setTimeout(() => {
            teste();
        }, 10000);

    },[hours]);

    useEffect(() => {
   
        axios.get(`${API_URL}/workingDay`)
        .then(response => setWorkingDay(response.data))
        .catch(error => console.log(error))
    },[]);

    const teste = () => {

        while (true) {
            if (day = count) {
                console.log(hours);
                console.log(day);
                console.log(count)
                axios.get(`${API_URL}/workingDay/${count}`)
                .then(response => setDayWeek(response.data))
                .then(console.log(dayWeek))
                .catch(error => console.log(error))
                break
            } else {
                setCount(count + 1);
            }
        }
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
                                <p className="pLocal">Rua Aracatu, 400, Jaboatão dos Guararapes, PE</p>
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
                    <h2 className="footer">Footer</h2>
                </div>
            </div>}
        </>
    )

}

export default Home;