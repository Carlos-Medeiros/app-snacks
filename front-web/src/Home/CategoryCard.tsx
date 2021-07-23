import { useEffect } from 'react';
import { useState } from 'react';
import { Category } from './types';

type Props = {
    category: Category;
    onSelectCategory: (category: Category) => void;
    isSelected: boolean;
}

function CategoryCard({ category, onSelectCategory, isSelected }: Props) {

    const [formData, setFromData] = useState({
        isAgree: false,
        gender: 3
    })

    useEffect(() => {
        if (formData.gender != category.id){
            setTeste(false)
        }
        if (formData.gender == category.id) {
            setTeste(true)
        }
    }, [formData.gender]);


    const [teste, setTeste] = useState(false)

    const handleChanage = (event: any) => {
        const target = event.target
        const name = target.name
        const value = target.value
        setFromData({
            ...formData,
            [name] : value
        })
    }

    return(
        <div>
            <p>{formData.gender},{teste}</p>
            <input className="radio-teste" type="radio" name="gender" value={category.id}
            onChange={handleChanage} checked={formData.gender==category.id}/>
            <p className="radio-name">{category.name}</p>
        </div>
    )
}

export default CategoryCard;