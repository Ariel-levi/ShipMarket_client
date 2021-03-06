import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import { clientReducer } from '../redux/reducers/clientReducer';
import { favsReducer } from '../redux/reducers/favs_reducer';
import { socketReducer } from '../redux/reducers/socketReducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import Cart from '../cart_comps/cart';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import StartRedux from '../redux/startRedux';
import SocketOrderStatus from '../redux/socketOrderStatus';

const reduxDevTool = composeWithDevTools(applyMiddleware(thunk, logger));
const rootReducer = combineReducers({ clientReducer, favsReducer, socketReducer });
const globalStore = createStore(rootReducer, reduxDevTool);

function Layout(props) {
  return (
    <Provider store={globalStore}>
      <StartRedux />
      <SocketOrderStatus />
      <Cart />
      <Header />
      <Outlet />
      <Footer />
    </Provider>
  );
}

export default Layout;
