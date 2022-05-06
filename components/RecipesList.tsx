import { FC, Fragment } from "react"
import RecipeCard from "./RecipeCard"

// TODO : modeling "recipes" using "recipe" model

const RecipesList:FC<any> = ({ recipes }) =>{
    
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
                                            imageUrl={recipes[key].imageUrl}
                                            userId={recipes[key].userId}
                                            userName={recipes[key].userName}
                                            ingredientList={recipes[key].ingredientList}
                                            createdAt={recipes[key].createdAt}
                                            comments={[]}
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