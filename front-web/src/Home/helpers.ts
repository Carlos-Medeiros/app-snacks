import { Category } from "./types";

export function checkIsSelected(selectedCategorys: Category[], category: Category) {
    return selectedCategorys.some(item => item.id === category.id);
}