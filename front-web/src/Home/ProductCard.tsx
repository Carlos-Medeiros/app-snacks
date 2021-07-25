import { useEffect } from 'react';
import { useState } from 'react';
import { fetchCategorys } from '../api';
import { Category, Product } from './types';
import { ReactComponent as Confirmed } from '../confirmed.svg'
import { ReactComponent as Hamburguer } from '../item-teste.svg'
import { ReactComponent as CarYellow } from '../car-yellow.svg'
import { ReactComponent as Car } from '../carrinho.svg'
import { ReactComponent as Add } from '../mais.svg'

type Props = {
    product: Product;
}

function ProductCard({ product }: Props) {

    return(
        <div className="containerItem">
            <img src={product.imageUri} className="hamburguer" alt={product.name} />
            <h2 className="nameProduct">{product.name}</h2>
            <h2 className="priceProduct">R${product.price}</h2>
            <p className="descriptionProduct">{product.description}</p>
        </div>
    )
}

export default ProductCard;