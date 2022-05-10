// React
import { FC, useEffect, useState } from 'react'
// Next
import Head from 'next/head'
import router from 'next/router'
// Components
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
// Redux
import { Provider } from 'react-redux';
import store from '../store/store';
// Actions
import { getUser } from '../actions/user.actions';
// Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '@firebase/auth';
import { app } from '../src/Database'

const auth = getAuth(app);

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


