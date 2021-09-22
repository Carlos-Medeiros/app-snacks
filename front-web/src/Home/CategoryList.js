import { useEffect, useState } from "react";
import ProductList from "./ProductList";

function CategoryList({ categorys, productItemContainer, setProductItemContainer, setCategoryActive }) {
    
    const [toggleState, setToggleState] = useState(0);
    const [productItemCard, setProductItemCard] = useState(productItemContainer);

    useEffect(() => {
        setProductItemContainer(productItemCard)
    }, [productItemCard]);
    
    useEffect(() => {
        setProductItemCard(productItemContainer)
    }, [productItemContainer]);

    categorys.map(category => {
        if (toggleState === 0) {
            setToggleState(category.id)
        }
    })

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