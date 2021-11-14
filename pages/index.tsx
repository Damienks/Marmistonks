import Head from 'next/head'
import logo from '../src/logo.svg';
import { FC, useEffect, useState } from "react"
import Header from "../components/Header"
import RecipesList from "../components/RecipesList"
import rootReducer from "../reducers"

// Redux
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getRecipes } from '../actions/recipe.actions';
import { getUser } from '../actions/user.actions';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

const Root:FC = () =>{
  const [IsLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    store.dispatch(getUser());
    store.dispatch(getRecipes());
  },[])

  return(
    <Provider store={ store }>
      <Head>
        <title>Marmistonks</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="app source-sans color-primary">
        { !IsLoading &&
          <Header />
        }
        <RecipesList />
      </div>
    </Provider>
  )
}

export default Root
