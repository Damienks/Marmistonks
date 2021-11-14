import { FC, Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Recipe from "../components/Recipe"
import Spinner from "../components/Spinner"

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
                        <h3 className='signika color-secondary'>Les recettes les plus récentes</h3>
                    </div>
                    { Recipes.length &&
                        <ul className='row recipe-list'>
                            {
                                Object.keys(Recipes).map((key) => 
                                    <li className={Recipes.length > 2 ? 'col-4' : 'col'} key={'recipe-' + Recipes[key].userId + '-' + Recipes[key].createdAt.seconds}>
                                        {<Recipe  
                                            title={Recipes[key].title}
                                            desc={Recipes[key].desc}
                                            img={Recipes[key].imageUrl}
                                        />}
                                    </li>
                                )
                            }
                        </ul>
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