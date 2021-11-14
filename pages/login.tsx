import Head from 'next/head'
import { FC } from 'react'
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers'
import thunk from 'redux-thunk';
import { getUser } from '../actions/user.actions';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(getUser());

const Login:FC = () => {
  return (
    <Provider store={ store }>
      <Head>
        <title>Marmistonks | Login</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className="app source-sans color-primary">
        <Header />
        { <Dashboard type='login'/> }
      </main>
    </Provider>
  );
}

export default Login;
