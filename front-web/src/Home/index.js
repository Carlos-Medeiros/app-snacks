import React, { useEffect, useState } from 'react';
import './styles.css';
import { ReactComponent as Img } from '../imgHome.svg'
import { ReactComponent as Local } from '../local.svg'
import { ReactComponent as Fechado } from '../fechado.svg'
import { ReactComponent as Logo } from '../logo.svg'
import { ReactComponent as Car } from '../carrinho.svg'
import { ReactComponent as ArrowYellow } from '../arrow-left-yellow.svg'
import CategoryList from './CategoryList';
import { fetchCategorys } from '../api';
import { checkIsSelected } from './helpers';
import Modal from '../Components/ModalProduct';
import ModalProduct from '../Components/ModalProduct';
import ModalShoppingCar from '../Components/ModalShoppingCar';
import Orders from '../Orders';

function Home() {

    const [categorys, setCategorys] = useState([]);
    const [productItemContainer, setProductItemContainer] = useState(0);
    const [removeItem, setRemoveItem] = useState(false);
    const [viewOrders, setViewOrders] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [amount, setAmount] = useState([]);
    const [categoryActive, setCategoryActive] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (checkIsSelected(selectedProducts, productItemContainer)) {
            setRemoveItem(true)
        } else {
            setRemoveItem(false)
        }
        console.log(checkIsSelected(selectedProducts, productItemContainer))
    }, [productItemContainer]);

    const addCar = () => {

        if (removeItem === false) {
            handleSelectProduct(productItemContainer)
            setRemoveItem(true)
        } else {
            handleSelectProduct(productItemContainer)
            setRemoveItem(false)
        }
    }
    
    const addProduct = (product) => {
        amount.push(product)
        console.log(amount)
    }
    const [teste, setTeste] = useState(false);

    const removeProduct = (product) => {
        let bool = false
        const sla = amount.find(item => item.id === product.id)
        console.log(sla)
        if (sla === undefined) {
            console.log('não tem mais')
        } else {
            if (sla.id === product.id) {
                amount.splice(amount.lastIndexOf(product.id), 1)
                console.log(amount)
            } else {
                console.log('não tem mais')
            }
        }
    }

    const handleSelectProduct = (product) => {
        const isAlreadySelected = checkIsSelected(selectedProducts, product);
      
        if (isAlreadySelected) {
          const selected = selectedProducts.filter(item => item.id !== product.id);
          setSelectedProducts(selected);
        } else {
            setSelectedProducts(previous => [...previous, product]);
        }
    }


    useEffect(() => {
        fetchCategorys()
        .then(response => setCategorys(response.data))
        .catch(error => console.log(error));
    }, []);

    return(
        <>  
            {viewOrders ? <Orders onClose={() => setViewOrders(false)}
            amount={amount}/>:
            <div className="container">
                <div className="main-navbar">
                    <Logo className="logo"/>
                    <div className="shopping-car" onClick={() => setViewOrders(true)}>
                        {selectedProducts.length >= 1 ?
                            <div className="shopping-car-itens-amount">
                                <p className="shopping-car-amount">{selectedProducts.length}</p>
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
                            <div className="containerStatus">
                                <Fechado className="imgFechado"/>
                                <p className="pStatus">Fechado para pedidos</p>

                            </div>
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
                        onSelectProducts={handleSelectProduct}
                        selectedProducts={selectedProducts}
                        productItemContainer={productItemContainer}
                        setProductItemContainer={setProductItemContainer}
                        setCategoryActive={setCategoryActive}/>
                        
                        {productItemContainer !== 0?
                            <ModalProduct 
                                removeProduct={removeProduct}
                                addProduct={addProduct}
                                onClose={() => setProductItemContainer(0)}
                                addItemCar={() => addCar()}
                                removeItem={removeItem}
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