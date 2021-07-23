import { checkIsSelected } from "./helpers";
import CategoryCard from "./CategoryCard";
import { Category } from "./types";

type Props = {
    categorys: Category[];
    selectedCategorys: Category[];
    onSelectCategory: (category: Category) => void;
}

function CategoryList({ categorys, selectedCategorys, onSelectCategory }: Props) {
    return (
        <div className="containerItensCategoria">
            {categorys.map(category => (
                <CategoryCard
                key={category.id}
                category={category}
                onSelectCategory={onSelectCategory}
                isSelected={checkIsSelected(selectedCategorys, category)}/>
            ))}
        </div>
    )
}

export default CategoryList;