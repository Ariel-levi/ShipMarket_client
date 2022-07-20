import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import for toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// super_admin imports
import LayoutAdmin from './comps_admin/layoutAdmin';
import LoginAdmin from './comps_admin/loginAdmin';
import LogoutAdmin from './comps_admin/logoutAdmin';
import AdminHome from './comps_admin/adminHome';
import UsersList from './comps_admin/usersList';
import StoresAdmin from './comps_admin/stores/storesAdmin';
import EditStore from './comps_admin/stores/editStore';
import AddStore from './comps_admin/stores/addStore';
import ProductsAdmin from './comps_admin/products/productsAdmin';
import AddProductAdmin from './comps_admin/products/addProductAdmin';
import ProductAdminInfo from './comps_admin/products/productAdminInfo';
import EditProductAdmin from './comps_admin/products/editProductAdmin';
import OrdersAdmin from './comps_admin/orders/ordersAdmin';
import OrderInfoAdmin from './comps_admin/orders/orderInfoAdmin';
// user imports
import Page404 from './comps/general_comps/page404';
import Home from './comps/home';
import Layout from './comps/layout';
import About from './comps/about';
import Register from './comps/register';
import Login from './comps/login';
import Logout from './comps/logout';
import AllStores from './comps/allStores';
import StoreInfo from './comps/storeInfo';
import SearchStore from './comps/searchStore';
import FavsProducts from './comps/favsProducts';
import CreateStoreFrom from './comps/createStoreForm';
import Checkout from './comps/orders_comps/checkout';
import OldOrders from './comps/orders_comps/oldOrders';
import OldOrderInfoClient from './comps/orders_comps/oldOrderInfoClient';
import WelcomePage from './comps/general_comps/welcomePage';
// Driver imports
import ApplyingDriverForm from './comps/applyingDriverForm';
import LayoutCourier from './comps_courier/layoutCourier';
import HomeCourier from './comps_courier/homeCourier';
import MapRouting from './comps_courier/mapRouting';
import MyOrders from './comps_courier/myOrders';
import DeliveryInfo from './comps_courier/deliveryInfo';
// store Admin imports
import LayoutStore from './comps_storeAdmin/layoutStore';
import MyStore from './comps_storeAdmin/myStore';
import StoreHome from './comps_storeAdmin/storeHome';
import EditStoreAdmin from './comps_storeAdmin/editStoreAdmin';
import MoreStore from './comps_storeAdmin/moreStore';
import ProductsStoreAdmin from './comps_storeAdmin/products/productsStoreAdmin';
import EditProductAdminStore from './comps_storeAdmin/products/editProductAdminStore';
import ProductInfoAdminStore from './comps_storeAdmin/products/productInfoAdminStore';
import AddProductStoreAdmin from './comps_storeAdmin/products/addProductStoreAdmin';
import CategoriesAdminStore from './comps_storeAdmin/categories/categoriesAdminStore';
import OrdersStoreAdmin from './comps_storeAdmin/orders/ordersStoreAdmin';
import OrderItemInfoAdminStore from './comps_storeAdmin/orders/orderItemInfoAdminStore';
import OrdersPanelAdminStore from './comps_storeAdmin/orders_panel/ordersPanelAdminStore';

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
          <Route path="/admin/orders" element={<OrdersAdmin />} />
          <Route path="/admin/orders/:id" element={<OrderInfoAdmin />} />
        </Route>
        {/* Store Admin */}
        <Route path="/storeAdmin" element={<LayoutStore />}>
          <Route index element={<MyStore />} />
          <Route path="/storeAdmin/:id" element={<StoreHome />} />
          <Route path="/storeAdmin/editStore/:id" element={<EditStoreAdmin />} />
          <Route path="/storeAdmin/more/:id" element={<MoreStore />} />
          <Route path="/storeAdmin/products/:id" element={<ProductsStoreAdmin />} />
          <Route path="/storeAdmin/products/edit/:id" element={<EditProductAdminStore />} />
          <Route path="/storeAdmin/products/info/:id" element={<ProductInfoAdminStore />} />
          <Route path="/storeAdmin/products/addProduct" element={<AddProductStoreAdmin />} />
          <Route path="/storeAdmin/categories/:id" element={<CategoriesAdminStore />} />
          <Route path="/storeAdmin/orders/:id" element={<OrdersStoreAdmin />} />
          <Route path="/storeAdmin/orderInfo/:id" element={<OrderItemInfoAdminStore />} />
          <Route path="/storeAdmin/ordersPanel/:id" element={<OrdersPanelAdminStore />} />
        </Route>
        {/* For regular user client path */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/createStore" element={<CreateStoreFrom />} />
          <Route path="/allStore" element={<AllStores />} />
          <Route path="/store/:id" element={<StoreInfo />} />
          <Route path="/searchStore/:searchQ" element={<SearchStore />} />
          <Route path="/favs" element={<FavsProducts />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/oldOrders" element={<OldOrders />} />
          <Route path="/oldOrders/:idOrder" element={<OldOrderInfoClient />} />
          <Route path="/applyAsDriver" element={<ApplyingDriverForm />} />
          {/* * - for any url that not in another route go to 404 */}
          <Route path="/*" element={<Page404 />} />
        </Route>
        {/* Courier routes */}
        <Route path="/courier" element={<LayoutCourier />}>
          <Route index element={<HomeCourier />} />
          <Route path="/courier/takeDelivery/:id" element={<MapRouting />} />
          <Route path="/courier/myOrders" element={<MyOrders />} />
          <Route path="/courier/deliveryInfo/:id" element={<DeliveryInfo />} />
        </Route>
      </Routes>
      {/* theme='colored' make the toast message bg to be red,green... */}
      <ToastContainer position="top-right" theme="colored" />
    </Router>
  );
}

export default AppRoutes;
