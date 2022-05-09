import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import for toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// super_admin imports
import LayoutAdmin from "./comps_admin/layoutAdmin";
import LoginAdmin from "./comps_admin/loginAdmin";
import LogoutAdmin from "./comps_admin/logoutAdmin";
import AdminHome from "./comps_admin/adminHome";
import UsersList from "./comps_admin/usersList";
import StoresAdmin from "./comps_admin/stores/storesAdmin";
import EditStore from "./comps_admin/stores/editStore";
import AddStore from "./comps_admin/stores/addStore";
import ProductsAdmin from "./comps_admin/products/productsAdmin";
import AddProductAdmin from "./comps_admin/products/addProductAdmin";
import ProductAdminInfo from "./comps_admin/products/productAdminInfo";
import EditProductAdmin from "./comps_admin/products/editProductAdmin";
import CategoriesAdmin from "./comps_admin/categories/categoriesAdmin";
import AddCategory from "./comps_admin/categories/addCategory";
import EditCategory from "./comps_admin/categories/editCategory";
import OrdersAdmin from "./comps_admin/orders/ordersAdmin";
// user imports
import Page404 from "./comps/general_comps/page404";
import Home from "./comps/home";
import Layout from "./comps/layout";
import About from "./comps/about";
import Register from "./comps/register";
import Login from "./comps/login";
import Logout from "./comps/logout";
import AllStores from "./comps/allStores";
import StoreInfo from "./comps/storeInfo";
import SearchStore from "./comps/searchStore";
import FavsProducts from "./comps/favsProducts";
import CreateStoreFrom from "./comps/createStoreFrom";

function AppRoutes(props) {
  return (
    <Router>
      <Routes>
        {/* for super_admin user */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<LoginAdmin />} />
          <Route path="/admin/logout" element={<LogoutAdmin />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/stores" element={<StoresAdmin />} />
          <Route path="/admin/editStore/:id" element={<EditStore />} />
          <Route path="/admin/addStore" element={<AddStore />} />
          <Route path="/admin/products" element={<ProductsAdmin />} />
          <Route path="/admin/addProduct" element={<AddProductAdmin />} />
          <Route path="/admin/productInfo/:id" element={<ProductAdminInfo />} />
          <Route path="/admin/editProduct/:id" element={<EditProductAdmin />} />
          <Route path="/admin/categories" element={<CategoriesAdmin />} />
          <Route path="/admin/addCategory" element={<AddCategory />} />
          <Route path="/admin/editCategory/:id" element={<EditCategory />} />
          <Route path="/admin/orders" element={<OrdersAdmin />} />
        </Route>
        {/* For regular user client path */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createStore" element={<CreateStoreFrom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/allStore" element={<AllStores />} />
          <Route path="/store/:id" element={<StoreInfo />} />
          <Route path="/searchStore/:searchQ" element={<SearchStore />} />
          <Route path="/favs" element={<FavsProducts />} />
          {/* * - for any url that not in another route go to 404 */}
          <Route path="/*" element={<Page404 />} />
        </Route>
      </Routes>
      {/* theme='colored' make the toast message bg to be red,green... */}
      <ToastContainer position="top-right" theme="colored" />
    </Router>
  );
}

export default AppRoutes;
