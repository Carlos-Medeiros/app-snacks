import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import axios from "axios";
import { API_URL } from "../api";

function CategoryList({ categorys, productItemContainer, setProductItemContainer, setCategoryActive }) {
    
    const [toggleState, setToggleState] = useState(0);
    const [productItemCard, setProductItemCard] = useState(productItemContainer);

    const count = () => {
        setToggleState(toggleState + 1)
    }

    useEffect(() => {
        axios.get(`${API_URL}/categorys/${toggleState}`)
        .then()
        .catch(count)

    }, [toggleState]);

    useEffect(() => {
        setProductItemContainer(productItemCard)
    }, [productItemCard]);
    
    useEffect(() => {
        setProductItemCard(productItemContainer)
    }, [productItemContainer]);

    return (
        <>
            <div className="categorias">
                <div className="containerCategoriaName">
                    <p className="categoriaName">Categorias</p>
                </div>
                <div>
                    {categorys.map(category => (
                        
                        <div  className="containerItensCategoria">
                            <div
                            onClick={() => setToggleState(category.id)}>
                                <p className={toggleState === category.id ? "category-name-active" : "category-name"}>{category.name}</p>
                                {toggleState === category.id ? setCategoryActive(category.name): null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="itens">
                <div className="itens-grid">
                    {categorys.map(category => (
                            <ProductList
                            key={category.id}
                            category={category}
                            state={toggleState}
                            productItemCard={productItemCard}
                            setProductItemCard={setProductItemCard}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CategoryList;