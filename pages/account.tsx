import Head from 'next/head'
import { FC } from 'react'
import Header from '../components/Header';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from "../reducers"
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { getUser } from '../actions/user.actions';
import Dashboard from '../components/Dashboard';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(getUser());

const Login:FC = () => {

  return (
    <Provider store={ store }>
      <Head>
        <title>marmistonks | Compte</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="app source-sans color-primary text-base">
        <Header />
        { <Dashboard type='account'/> }       
      </div>
    </Provider>
  );
}

export default Login;
