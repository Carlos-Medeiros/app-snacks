import React, { useEffect, useState } from 'react';
import './styles.css';
import { ReactComponent as Img } from '../imgHome.svg'
import { ReactComponent as Local } from '../local.svg'
import { ReactComponent as Fechado } from '../fechado.svg'
import { ReactComponent as Confirmed } from '../confirmed.svg'
import { ReactComponent as Hamburguer } from '../item-teste.svg'
import { ReactComponent as CarYellow } from '../car-yellow.svg'
import { ReactComponent as Car } from '../carrinho.svg'
import { ReactComponent as Add } from '../mais.svg'
import { Category, Product } from './types';
import { checkIsSelected } from "./helpers";
import CategoryList from './CategoryList';
import { fetchCategorys } from '../api';

function Home() {

    const [categorys, setCategorys] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategorys, setSelectedCategorys] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategorys()
        .then(response => setCategorys(response.data))
        .catch(error => console.log(error));
    }, []);

    const handleSelectCategory = (category: Category) => {
        const isAlreadySelected = checkIsSelected(selectedCategorys, category);
      
        if (isAlreadySelected) {
          const selected = selectedCategorys.filter(item => item.id !== category.id);
          setSelectedCategorys(selected);
        } else {
          setSelectedCategorys(previous => [...previous, category]);
        }
      }

    return(
        <>
            <div className="container">
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
                            onSelectCategory={handleSelectCategory}
                            selectedCategorys={selectedCategorys}/>
                    </div>
                </div>
                <div className="containerFooter">
                    <h2 className="footer">Footer</h2>
                </div>
            </div>
            
        </>
    )

}

export default Home;