import React from "react";
import { useCart } from 'react-use-cart';

function ProductCard({ product, setProductItem}) {

    const { inCart } = useCart();

    function formatPrice(price) {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return formatter.format(price);
    }

    return(
        <div className={product.inventory === true ? "containerItem" : "containerItem-disable"} >
            {product.inventory === true ? 
            <div onClick={() => setProductItem(product)}>
                <div className={`product ${inCart(product.id) ? 'selected' : ''}`}>
                    <img src={product.imageUri} className="itemProduct" alt={product.name} />
                    <h2 className={`nameProduct ${inCart(product.id) ? 'selected' : ''}`}>{product.name}</h2>
                    <div className="container-price-discount">
                        <h2 className={`priceProduct ${inCart(product.id) ? 'selected' : ''}`}>{formatPrice(product.price)}</h2>
                        {product.discount?
                        <div className={`container-percentage-discount ${inCart(product.id) ? 'selected' : ''}`}>
                            <p className={`discountProduct ${inCart(product.id) ? 'selected' : ''}`}>{product.percentageDiscount.toFixed(2)}%</p>
                            <p className={`discountProductText ${inCart(product.id) ? 'selected' : ''}`}>OFF</p>
                        </div>
                        :null}
                    </div>
                    <p className={`descriptionProduct ${inCart(product.id) ? 'selected' : ''}`}>{product.description}</p>
                </div>
            </div> : 
                <div className={`product`}>
                    <img src={product.imageUri} className="itemProduct" alt={product.name} />
                    <h2 className={`nameProduct`}>{product.name}</h2>
                    <div className="container-price-discount">
                        <h2 className={`priceProduct`}>{formatPrice(product.price)}</h2>
                        {product.discount?
                        <div className="container-percentage-discount">
                            <h2 className={`discountProduct`}>{product.percentageDiscount.toFixed(2)}%</h2>
                            <p className={`discountProductText`}>OFF</p>
                        </div>
                        :null}
                    </div>
                    <p className={`descriptionProduct`}>{product.description}</p>
                </div>
            } 
        </div>
    )
}

export default ProductCard;