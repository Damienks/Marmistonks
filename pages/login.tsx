import Head from 'next/head'
import { FC, useEffect, useState } from 'react'
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers'
import thunk from 'redux-thunk';
import { getUser } from '../actions/user.actions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '@firebase/auth';
import { app } from '../src/Database'
import router from 'next/router'

const auth = getAuth(app);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(getUser());

const Login:FC = () => {

  const [user, loading] = useAuthState(auth);
  const [IsLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() =>{
    if(!loading){
      setIsLoading(loading);
      if(user != null){
        router.push('/')
      }
    }
},[loading, user]);

  return (
    <Provider store={ store }>
      
      <Head>
        <title>marmistonks | Login</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {!IsLoading && user == null &&
        <main className="app source-sans color-primary text-base">
          <Header />
          { <Dashboard type='login'/> }
        </main>
      }
    </Provider>
  );
}

export default Login;


