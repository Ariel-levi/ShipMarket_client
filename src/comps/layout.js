import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { clientReducer } from "../redux/reducers/clientReducer";
import { favsReducer } from "../redux/reducers/favs_reducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import Cart from "../cart_comps/cart";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import StartRedux from "../redux/startRedux";

<<<<<<< HEAD
const reduxDevTool = composeWithDevTools(applyMiddleware(thunk, logger));
const rootReducer = combineReducers({ clientReducer, favsReducer });
const globalStore = createStore(rootReducer, reduxDevTool);
=======
const reduxDevTool = composeWithDevTools(applyMiddleware(thunk, logger))
const rootReducer = combineReducers({clientReducer, favsReducer})
const globalStore = createStore(rootReducer , reduxDevTool);

>>>>>>> f1fa0af9128169b9c1e3cd37746aa361126d0a13

function Layout(props) {
  
  return (
    <Provider store={globalStore}>
      <StartRedux />
      <Cart />
      <Header />
      <Outlet />
      <Footer />
    </Provider>
  );
}

export default Layout;
