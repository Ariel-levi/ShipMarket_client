import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../services/apiService';
import { MdOutlineLocationCity, MdOutlineShoppingCart } from 'react-icons/md';
import { BsInfoCircleFill, BsChevronRight } from 'react-icons/bs';
import { HiTemplate } from 'react-icons/hi';
import './css/storeInfo.css';
import Product from './product';
import LottieAnimation from './general_comps/lottieAnimation';
import Cart from '../cart_comps/cart';
import { resetAll, ShowCart } from '../redux/actions/cart_action';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

function StoreInfo(props) {
  const [shop, setShop] = useState({});
  const [storeProducts, setStoreProducts] = useState([]);
  const [productsTemp, setProductsTemp] = useState([]);
  let params = useParams();
  let nav = useNavigate();
  const dispatch = useDispatch();

  const [itemsInCart, setItemsInCart] = useState(0);
  const { cart_ar } = useSelector((state) => state.clientReducer);

  useEffect(() => {
    dispatch(resetAll()); // reset cart
    doApi();
  }, []);

  useEffect(() => {
    setItemsInCart(cart_ar.length);
  }, [cart_ar]);

  const doApi = async () => {
    let url = API_URL + '/stores/single/' + params.id;
    let resp = await doApiGet(url);
    // console.log(resp.data);
    setShop(resp.data);
    // console.table(resp.data);

    let urlProducts = API_URL + '/products/storeProducts/' + params.id;
    let resp2 = await doApiGet(urlProducts);
    setStoreProducts(resp2.data);
    setProductsTemp(resp2.data);
    console.table(resp2.data);
  };

  const sort_cat = (_catName) => {
    if (_catName === 'all') {
      setProductsTemp(storeProducts);
    } else {
      let temp = storeProducts.filter((prod) => prod.category === _catName);
      if (temp.length === 0) {
        toast.warning(`Sorry no ${_catName} found 😓`);
      }
      setProductsTemp(temp);
    }
  };

  return (
    <React.Fragment>
      {!shop ? (
        <LottieAnimation />
      ) : (
        <React.Fragment>
          <div
            style={{
              backgroundImage: `url(${shop.img_url || '/images/no_image.png'})`
            }}
            className="strip container-fluid d-flex align-items-center">
            <div className="container stripText_bg text-center">
              <h2 className="shop_name">{shop.name}</h2>
            </div>
          </div>
          <div className="container store__info text-center">
            <button
              className="cartIcon rounded border btn position-absolute top-0 start-0 m-5"
              onClick={() => dispatch(ShowCart())}>
              {cart_ar.length === 0 ? (
                ''
              ) : (
                <p className="position-absolute top-0 start-100 translate-middle itemCart">
                  {itemsInCart}
                </p>
              )}
              <MdOutlineShoppingCart />
            </button>
            <button
              style={{ background: 'none' }}
              className="position-absolute top-0 end-0 m-5 animaLinkSM "
              onClick={() => {
                nav(-1);
              }}>
              Back <BsChevronRight className="mx-2" />
            </button>
            <img
              src={shop.img_url || '/images/no_image.png'}
              alt={shop.name}
              width="100"
              height="90"
              className="logo"
            />
            <h1 className="mt-2">{shop.name}</h1>
            <div className="row">
              <div className="col-6">
                <p className="animaLink">
                  Info <BsInfoCircleFill className="mx-2" />
                </p>
                <p className="text_info">{shop.info}</p>
              </div>
              <div className="col-6">
                <p className="animaLink">
                  Address <MdOutlineLocationCity className="mx-2" />
                </p>
                <p className="text_info">{shop.address?.label}</p>
              </div>
            </div>
          </div>
          <div className="container my-4 text-center">
            <p className="animaLink">
              Categories <HiTemplate className="mx-2" />
            </p>
            <br />
            <button
              onClick={() => {
                sort_cat('all');
              }}
              className="mx-1 my-1 cat_btn">
              All Products
            </button>
            {shop.categories?.map((item) => {
              return (
                <button
                  key={item}
                  onClick={() => {
                    sort_cat(item);
                  }}
                  className="mx-1 my-1 cat_btn">
                  {item}
                </button>
              );
            })}
          </div>
          <div className="container text-center">
            <p className="animaLink">
              Products <HiTemplate className="mx-2" />
            </p>
            {productsTemp == 0 ? (
              <div>
                <small>No Products</small>
              </div>
            ) : (
              ''
            )}
          </div>
          <motion.div layout className="mb-5">
            <AnimatePresence>
              {productsTemp.map((item) => {
                return <Product key={item._id} item={item} />;
              })}
            </AnimatePresence>
          </motion.div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default StoreInfo;
