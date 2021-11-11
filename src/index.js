import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom' 

const Root = () =>(
  <BrowserRouter>
        <Switch>
          <Route exact path='/' component={App} />
          <Route exact path='/login'>
            <App formType="login" />
          </Route>
          <Route exact path='/create-account'>
            <App formType="create-account" />
          </Route>
          <Route>
              <p>Il n'y a rien ici !</p>
          </Route>
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
