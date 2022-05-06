import { FC } from 'react'
import Recipe from '../models/recipe'


const RecipeCard:FC<Recipe> = ({ id, title, desc, imageUrl, ingredientList, createdAt, userId, userName }) =>{
    return(
        <a href={"/recipes/" + id}>
            <div className='recipe m-bottom-20'>
                <div className='img-w m-bottom-10'>
                    <img src={imageUrl} alt={title} className='w-100-p' />
                </div>
                <div className='p-top-10 p-right-20 p-bottom-10 p-left-20'>
                    <h4 className='f-size-20 f-bold'>{title}</h4>
                    <p>{desc}</p>
                </div>
            </div>
        </a>
        
    )
}

export default RecipeCard
