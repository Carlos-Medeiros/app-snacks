
export function checkIsSelected(selectedProducts, product) {
    return selectedProducts.some(item => item.id === product.id);
}
