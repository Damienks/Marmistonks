import Head from 'next/head'
import Header from "../../components/Header"
import { FC, useEffect } from "react";
import { DocumentData } from "firebase/firestore";
import db from '../../src/Database';
import { getRecipeByIdFromDb } from '../../actions/recipe.actions';
import { Provider } from 'react-redux';
import Recipe from '../../models/recipe'
import store from "../../store/store";
import { getUser } from "../../actions/user.actions";

const Recipe:FC<Recipe>= (props) =>{

    useEffect(() => {
        store.dispatch(getUser());
      },[])

    return( 
        
        <Provider store={ store }>
            {props &&
                <>
                    <Head>
                        <title>{"marmistonks - " + props.title}</title>
                        <link rel='icon' href='/favicon.ico' />
                    </Head>
                    <div className="app source-sans color-primary text-base">
                        <Header />
                        <div className='container'>
                            <div className='rounded row bg-white p-20 justify-content-md-center'>
                                <div className='row text-center m-bottom-20'>
                                    <h1 className='signika color-primary text-3xl'>{props.title}</h1>
                                </div>
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
    
    // Parsing the data as the current page props model
    return { props: JSON.parse(JSON.stringify(recipe)) }
}

export default Recipe