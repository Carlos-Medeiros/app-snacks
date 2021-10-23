import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { API_URL } from '../api';
import CategoryProduct from '../CategoryProduct/CategoryProduct';
import ModalCategoryEdit from '../ModalCatedoryEdit/ModalCategoryEdit';
import './styles.css';

function Category() {

    const [toggleState, setToggleState] = useState(0);
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [isModal, setIsModal] = useState(0);
    const [productModal, setProductModal] = useState();
    const [categoryModal, setCategoryModal] = useState([]);
    const [count, setCount] = useState();
    let history = useHistory();

    useEffect(() => {
        axios.get(`${API_URL}/categorys/products`)
        .then(function (resp) {
            if (resp.status === 200) {
                setCategory(resp.data)
            }
        })
        .catch()
    },[])

    const openModal = (num) => {
        setIsModal(num);
    }

    const setContent = (category) => {
        setCategoryModal(category);
        setToggleState(category.id);
    }

    const refresh = () => {
        setCategory([]);
        axios.get(`${API_URL}/categorys/products`)
        .then(function (resp) {
            if (resp.status === 200) {
                setCategory(resp.data)

                axios.get(`${API_URL}/categorys/${categoryModal.id}`)
                .then(function (resp) {
                    if (resp.status === 200) {
                        setCategoryModal(resp.data);
                    }
                })
                .catch()

            }
        })
        .catch()
    }

    return(
        <div className="container-category">
            <div className="container-category-contents">
                <div className="container-category-type">
                    {category.map(category =>(
                        <p className={`category ${toggleState === category.id ? 'actived' : ''}`}onClick={()=>setContent(category)}>{category.name}</p>
                    ))
                    }
                </div>
                <div className="container-btn-new-category">
                    <p className="btn-new-category" onClick={()=>openModal(1)}>Adicionar categoria</p>
                </div>
            </div>
            <div className="container-product-contents">
                {categoryModal.length === 0 ? null
                :<CategoryProduct
                    category={categoryModal}/>
                }
            </div>
            {categoryModal.length === 0 ? null
            :    <div className="container-btn-edit-add">
                    <div className="container-btn-edit">
                        <p className="btn-edit"onClick={()=>openModal(2)}>Editar nome</p>
                    </div>
                    <div className="container-btn-add">
                        <p className="btn-add" onClick={()=>openModal(3)}>Adicionar produto</p>
                    </div>
                    <div className="container-btn-delete-category">
                        <p className="btn-delete-category" onClick={()=>openModal(4)}>Excluir categoria</p>
                    </div>
                </div>
            }
            {isModal === 1 ? <ModalCategoryEdit
                                onClose={()=>setIsModal(0)}
                                modal={isModal}
                                update={()=>refresh()}/>
            :null}
            {isModal === 2 ? <ModalCategoryEdit
                                onClose={()=>setIsModal(0)}
                                modal={isModal}
                                category={categoryModal}
                                update={()=>refresh()}/>
            :null}
            {isModal === 3 ? <ModalCategoryEdit
                                onClose={()=>setIsModal(0)}
                                modal={isModal}
                                update={()=>refresh()}
                                category={categoryModal}/>
            :null}
            {isModal === 4 ? <ModalCategoryEdit
                                onClose={()=>setIsModal(0)}
                                modal={isModal}
                                update={()=>refresh()}
                                category={categoryModal}/>
            :null}
        </div>
    )
}

export default Category;