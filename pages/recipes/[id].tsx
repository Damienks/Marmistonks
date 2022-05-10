// React stuff/types/hooks
import { FC } from "react";
// Components
import Head from 'next/head'
import Header from "../../components/Header"
import CommentSection from '../../components/Comments';
// Types/Models
import { DocumentData } from "firebase/firestore";
import Recipe from '../../models/recipe'
// Firebase
import db from '../../src/Database';
// Redux
import { Provider } from 'react-redux';
import store from "../../store/store";
// Actions
import { getCommentsForRecipeFromDb, getRecipeByIdFromDb } from '../../actions/recipe.actions';
import { getUser } from "../../actions/user.actions";


store.dispatch(getUser());

const RecipeDetails:FC<Recipe>= (recipe) =>{
    
    return( 
        
        <Provider store={ store }>
            {recipe &&
                <>
                    <Head>
                        <title>{"marmistonks - " + recipe.title}</title>
                        <link rel='icon' href='/favicon.ico' />
                    </Head>
                    <div className="app source-sans color-primary text-base">
                        <Header />
                        <div className='container'>
                            <div className='rounded row bg-white p-20 justify-content-md-center'>
                                <div className='col-md-6 col-lg-6 text-center m-bottom-20'>
                                    <h1 className='signika color-primary text-3xl'>{recipe.title}</h1>
                                    <p className='m-top-10 m-bottom-10'>{recipe.desc}</p>
                                    <img src={recipe.imageUrl} alt={recipe.title} className='w-100-p rounded m-top-20 m-bottom-20'></img>
                                    <hr/>
                                        <div className='flex align-items-center m-top-15 m-bottom-15'>
                                            <span className='w-8 h-8 text-red-400 hover:border-red-400 bg-white border-red-400 border-1 rounded-full flex justify-center align-items-center'>{recipe.userName.charAt(0).toUpperCase()}</span>
                                            <span className='m-left-10'>Ajoutée par <span className='font-bold'>{recipe.userName}</span></span>
                                        </div>
                                    <hr/>
                                    <CommentSection {...recipe} />
                                </div>
                                <div className='col-md-6'></div>
                            </div>
                        </div>     
                    </div>
                </>
            }
        </Provider>
    )
}

// Server side rendering of the data
export const getServerSideProps = async (context:any) =>{  
    const { id } = context.params
    const recipe:DocumentData = await getRecipeByIdFromDb(db, id);

    // Getting comments of the retrieved recipe
    const comments:DocumentData = await getCommentsForRecipeFromDb(db, id);
    recipe["comments"] = comments
    
    // Parsing the data as the current page props model
    return { props: JSON.parse(JSON.stringify(recipe)) }
}

export default RecipeDetails