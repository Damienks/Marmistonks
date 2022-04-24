import { FC, Fragment, useEffect, useState } from "react"
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { useSelector } from "react-redux"
import RecipeCard from "./RecipeCard"
import Spinner from "../components/Spinner"


const FadeIn = styled.div`animation: 0.8s ${keyframes`${fadeIn}`}`

const RecipesList:FC = () =>{
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
                    { Recipes.length &&
                        <FadeIn>
                            <ul className='row recipe-list'>
                                {
                                    Object.keys(Recipes).map((key) => 
                                        <li className={Recipes.length > 2 ? 'col-4' : 'col'} key={'recipe-' + Recipes[key].userId + '-' + Recipes[key].createdAt.seconds}>
                                            {
                                                <RecipeCard
                                                id={Recipes[key].id}
                                                title={Recipes[key].title}
                                                desc={Recipes[key].desc}
                                                img={Recipes[key].imageUrl}
                                                />
                                            }
                                        </li>
                                    )
                                }
                            </ul>
                        </FadeIn>
                    }
                    {IsLoading &&
                        <Spinner CssClass='color-secondary' />
                    }
                    {!IsLoading && !Recipes.length &&
                        <h2 className='signika text-center'>Désolés ! Il semblerait qu'aucune recette n'ait encore été créée...</h2>
                    }
                </div>
            </div>
        </Fragment>
    )
}
export default RecipesList