import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { composeWithDevTools } from '@redux-devtools/extension';
import {clientReducer} from "../reducers/clientReducer"
import { createStore } from "redux";
import { Provider } from 'react-redux';
import Cart from "../cart_comps/cart";

const composeEnhancers = composeWithDevTools();

const globalStore = createStore(clientReducer,composeEnhancers);

function Layout(props) {
  return (
    <Provider store={globalStore}>
      <Cart/>
      <Header />
      <Outlet />
      <Footer />
    </Provider>
  );
}

export default Layout;
