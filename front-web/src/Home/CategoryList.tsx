import { Category } from "./types";
import { useState } from "react";
import ProductList from "./ProductList";

type Props = {
    categorys: Category[];
    selectedCategorys: Category[];
    onSelectCategory: (category: Category) => void;
}

function CategoryList({ categorys, selectedCategorys, onSelectCategory }: Props) {
    const [toggleState, setToggleState] = useState(1);
    console.log(toggleState)
    return (
        <>
            <div className="categorias">
                <div className="containerCategoriaName">
                    <p className="categoriaName">Categorias</p>
                </div>
                <div>
                    {categorys.map(category => (
                        <div className="containerItensCategoria">
                            <div 
                            onClick={() => setToggleState(category.id)}>
                                <p className={toggleState === category.id ? "category-name-active" : "category-name"}>{category.name}</p>
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
                            state={toggleState}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CategoryList;