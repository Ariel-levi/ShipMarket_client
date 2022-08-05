import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../redux/actions/cart_action';
import { MdAddShoppingCart } from 'react-icons/md';
import { BsStar, BsStarFill } from 'react-icons/bs';
import './css/product.css';
import { toast } from 'react-toastify';
import { addRemoveFavs } from '../redux/actions/favs_action';
import { motion } from 'framer-motion';

function Product(props) {
  let item = props.item;
  const dispatch = useDispatch();
  const { favs } = useSelector((state) => state.favsReducer);

  const starColor = {
    background: '#ffefc1',
    color: '#fabb00'
  };

  const inFavs = () => {
    return favs.includes(item.short_id);
  };

  const addRemoveFavsClick = () => {
    if (localStorage['tok']) {
      dispatch(addRemoveFavs(item.short_id));
    } else toast.error('Pleade logged in');
  };

  const addItemoCart = () => {
    if (localStorage['tok']) {
      dispatch(addCart(item));
      toast.info(item.name + ' add to cart');
    } else toast.error('Pleade logged in');
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="blog-card bg-white mb-4 overflow-hidden d-lg-flex rounded position-relative hover">
            <div className="blog-image overflow-hidden d-flex align-items-center">
              <img
                src={item.img_url || '/images/no_image.png'}
                alt={item.name}
                className="blog-thumbnail"
              />
            </div>
            <div className="p-4 blog-container">
              <small
                style={{
                  color: item.category ? '#28a745' : '#f47373',
                  background: item.category ? 'rgba(40, 167, 69, 0.1)' : 'rgba(167, 40, 40, 0.1)'
                }}
                className="font_bold blog-category text-uppercase py-1 px-2 float-left rounded">
                {item.category || 'no category'}
              </small>
              <button
                onClick={addRemoveFavsClick}
                className="font_bold text-uppercase py-1 px-2 float-end rounded"
                style={!inFavs() ? {} : starColor}>
                {!inFavs() ? <BsStar /> : <BsStarFill />}
              </button>
              <h4 className="mt-2 font_bold text-dark">{item.name}</h4>
              <p className="text-muted">{item.info}</p>
              <div className="blog-footer d-flex justify-content-between align-items-center border-top">
                <h2 className="mr-2">₪ {item.price}</h2>
                <button className="btn btn-outline-primary" onClick={addItemoCart}>
                  Add to cart <MdAddShoppingCart className="me-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Product;
