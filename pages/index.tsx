import Head from 'next/head'
import { FC, useEffect } from "react"
import Header from "../components/Header"
import RecipesList from "../components/RecipesList"
import db from '../src/Database'

// Redux
import { Provider } from 'react-redux';
import store from '../store/store';
import { getRecipesFromDb } from '../actions/recipe.actions';
import { getUser } from '../actions/user.actions';

const Root:FC<any> = (props) =>{

  useEffect(() => {
    store.dispatch(getUser());
    // store.dispatch(getRecipes());
  },[])

  return(
    <Provider store={store}>
      <Head>
        <title>marmistonks</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="app source-sans color-primary text-base">
        <Header />
        {props.recipes && <RecipesList recipes={ props.recipes } /> }
      </div>
    </Provider>
  )
}

// Server side rendering of the data
export const getServerSideProps = async () =>{  
  
  const recipes = await getRecipesFromDb(db);
  
  return { props:{ recipes: JSON.parse(JSON.stringify(recipes)) } }
}

export default Root