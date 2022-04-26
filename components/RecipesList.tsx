import { FC, Fragment, useEffect, useState } from "react"
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { useSelector } from "react-redux"
import RecipeCard from "./RecipeCard"
import Spinner from "../components/Spinner"
import { getRecipesFromDb } from "../actions/recipe.actions";
import db from "../src/Database";

const RecipesList:FC<any> = ({ recipes }) =>{
    const [IsLoading, setIsLoading] = useState<boolean>(true)
    const Recipes = useSelector((state:any) => state.recipeReducer)

    useEffect(() =>{
        if(Recipes.length)
            setIsLoading(false)
            
    }, [Recipes]);
    
    return(
        <Fragment>
            <div className='container'>
                <div className='rounded row bg-white p-20 justify-content-md-center'>
                    <div className='row text-center m-bottom-20'>
                        <h3 className='signika color-secondary text-2xl'>Les recettes les plus récentes</h3>
                    </div>
                    { recipes &&
                        
                        <ul className='row recipe-list'>
                            {
                                Object.keys(recipes).map((key) => 
                                    <li className={recipes.length > 2 ? 'col-4' : 'col'} key={'recipe-' + recipes[key].userId + '-' + recipes[key].createdAt.seconds}>
                                        {
                                            <RecipeCard
                                            id={recipes[key].id}
                                            title={recipes[key].title}
                                            desc={recipes[key].desc}
                                            img={recipes[key].imageUrl}
                                            />
                                        }
                                    </li>
                                )
                            }
                        </ul>
                    }
                    {!recipes &&
                        <h2 className='signika text-center'>Désolés ! Il semblerait qu'aucune recette n'ait encore été créée...</h2>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default RecipesList