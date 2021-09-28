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


    if (toggleState == 0) {
        if (categorys.length > 0) {
            setToggleState(categorys[0].id)
        }
    }


    return (
        <>
            <div className="categorias">
                <div className="containerCategoriaName">
                    <p className="categoriaName">Categorias</p>
                </div>
                <div className="containerItensCategoria">
                    {categorys.map(category => (
                        
                        <p className={toggleState === category.id ? "category-name-active" : "category-name"}
                            onClick={() => setToggleState(category.id)}>
                            {category.name}                 
                            {toggleState === category.id ? setCategoryActive(category.name): null}
                        </p>
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