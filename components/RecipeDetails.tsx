import { FC } from 'react'
import Recipe from '../models/recipe'

const RecipeDetails:FC<Recipe> = (props) =>{
    return(
        <a href={"/recipes/" + props.id}>
            <div className='recipe m-bottom-20'>
                <div className='img-w m-bottom-10'>
                    <img src={props.imageUrl} alt={props.title} className='w-100-p' />
                </div>
                <div className='p-top-10 p-right-20 p-bottom-10 p-left-20'>
                    <h4 className='f-size-20 f-bold'>{props.title}</h4>
                    <p>{props.desc}</p>
                </div>
            </div>
        </a>
        
    )
}

export default RecipeDetails
