import Head from 'next/head'
import { FC, useEffect } from "react"
import Header from "../components/Header"
import RecipesList from "../components/RecipesList"
import rootReducer from "../reducers"
import db from '../src/Database'

// Redux
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getRecipes, getRecipesFromDb } from '../actions/recipe.actions';
import { getUser } from '../actions/user.actions';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

const Root:FC<any> = ({recipes}) =>{

  useEffect(() => {
    store.dispatch(getUser());
    store.dispatch(getRecipes());
  },[])

  return(
    <Provider store={store}>
      <Head>
        <title>marmistonks</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="app source-sans color-primary text-base">
        <Header />
        {recipes && <RecipesList recipes={ recipes } /> }
      </div>
    </Provider>
  )
}

export const getServerSideProps = async (context:any) =>{  
  // Requête de la collection sur laquelle on veut taper
  const recipes = await getRecipesFromDb(db);
  
  return { props:{ recipes: JSON.parse(JSON.stringify(recipes)) } }
}

export default Root