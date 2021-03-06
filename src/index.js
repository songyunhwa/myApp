import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check } from './modules/user';
import { HelmetProvider } from 'react-helmet-async';

//미들웨어 적용
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer , composeWithDevTools(applyMiddleware(sagaMiddleware)));


function loadUser(){
  try{
    const user = localStorage.getItem('user');
    if(!user) return;

    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  }catch(e){
    console.log('localstorage is not workig');
  }
}

sagaMiddleware.run(rootSaga);
loadUser(); //미들웨어다음 넣기

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <HelmetProvider>
    <App />
    </HelmetProvider>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
