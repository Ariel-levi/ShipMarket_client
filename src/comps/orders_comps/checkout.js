import React, { useEffect, useState } from 'react';
import { API_URL, doApiMethod } from '../../services/apiService';
import AuthClientComp from '../general_comps/authClientComp';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutItem from './checkoutItem';
import { MdOutlineDeliveryDining, MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { GrNext } from 'react-icons/gr';
import { resetAll } from '../../redux/actions/cart_action';
import { PayPalButton } from 'react-paypal-button-v2';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/checkout.css';
import AddAddress from './addAddress';
import { ADDRESS, checkAddressLocal, saveAddressLocal } from './../../services/localService';
import { joinSocket } from '../../redux/actions/socket_action';

function Checkout(props) {
  const { cart_ar, totalPrice, store_short_id } = useSelector((state) => state.clientReducer);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [displayLightBox, setDisplayLightBox] = useState(false);
  const [address, setAddress] = useState(checkAddressLocal());

  const disabledBtn = () => {
    //  disable paypal btns
    if (cart_ar.length === 0 || !address) {
      return {
        opacity: '0.6',
        pointerEvents: 'none'
      };
    }
    return {};
  };

  useEffect(() => {
    if (address) {
      saveAddressLocal(address);
    } else {
      localStorage.removeItem(ADDRESS);
    }
  }, [address]);

  useEffect(() => {
    if (cart_ar.length > 0 && address) {
      doApiAddToCheckout();
    }
  }, [cart_ar]);

  const dellAll = () => {
    if (window.confirm('Are you sure you want to delete all ?')) {
      dispatch(resetAll());
    }
  };

  const doApiAddToCheckout = async () => {
    // add to checkout
    let url = API_URL + '/orders';
    // console.log(cart_ar);
    // console.log(totalPrice);
    let body = {
      total_price: totalPrice,
      products_ar: cart_ar,
      store_short_id: store_short_id,
      destination: address
    };
    console.log(body);
    let resp = await doApiMethod(url, 'POST', body);
    console.log(resp.data);
    if (resp.data._id) {
      //if new order was added
      //join to a socket roon in order to get shippment status form the deliver
      dispatch(joinSocket(resp.data.short_id));
    }
  };

  // paypal pay
  const onCommit = async (_data) => {
    console.log(_data);
    let url = API_URL + '/orders/orderPaid/';
    let paypalObject = {
      tokenId: _data.facilitatorAccessToken,
      orderId: _data.orderID,
      realPay: 'sandbox' //if yes is real
    };
    let resp = await doApiMethod(url, 'PATCH', paypalObject);
    if (resp.data.modifiedCount == 1) {
      toast.success('Your order completed');
      dispatch(resetAll());
      nav('/oldOrders');
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        delay: 0.5,
        duration: 0.7
      }}
      className="container mt-5"
      style={{
        minHeight: '85vh'
      }}>
      <AuthClientComp />
      {displayLightBox && (
        <AddAddress
          setDisplayLightBox={setDisplayLightBox}
          address={address}
          setAddress={setAddress}
        />
      )}
      <div></div>
      <section className="shopping-cart">
        <div className="container">
          <div className="py-3">
            <h3> Delivery details</h3>
            <button className="btn text-start py-3 shadow" onClick={() => setDisplayLightBox(true)}>
              <MdOutlineDeliveryDining className="mx-3" />
              {address ? 'Delivery to ' + address.label : ' Please enter a delivery address'}
              <GrNext className="ms-4 me-2" />
            </button>
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="items">
                  {/* start product */}
                  {cart_ar.length == 0 ? (
                    <h2 className="text-center mt-5">
                      Cart is empty <MdOutlineRemoveShoppingCart className="mx-2" />
                    </h2>
                  ) : (
                    ''
                  )}
                  {cart_ar.map((item) => {
                    return <CheckoutItem key={item._id} item={item} />;
                  })}
                  {/* end product */}
                </div>
              </div>
              {/* start Checkout */}
              <div className="col-md-12 col-lg-4">
                <div className="summary">
                  <h3> Summary </h3>
                  <div className="summary-item">
                    <span className="text"> Tip </span>
                    <span className="price"> It 's up to you.</span>
                  </div>
                  <div className="summary-item">
                    <span className="text"> Delivery </span>
                    <span className="price"> ₪{cart_ar.length == 0 ? 0 : 20} </span>
                  </div>
                  <div className="summary-item">
                    <span className="text"> Total </span>
                    <span className="price"> ₪{totalPrice} </span>
                  </div>
                  {cart_ar.length > 0 ? (
                    <button onClick={dellAll} className="btn btn-outline-danger col-12 my-5">
                      Delete all Products
                    </button>
                  ) : (
                    ''
                  )}
                  <div style={disabledBtn()}>
                    <PayPalButton
                      currency="ILS"
                      amount={totalPrice}
                      options={{
                        clientId:
                          'ATRPIUvU2B6lrdeCovo7c4NzauAsSjlElL4xi_BaxHyCrrcmAO_fjdCddURxRhRPcq9W9hBQpnxjBzMD'
                      }}
                      onSuccess={(details, data) => {
                        // data - have info of pay token to check in nodejs
                        // console.log("data", data);
                        // details have info about the buyer
                        // console.log("details", details);
                        // if payment success ,
                        if (data.orderID) {
                          onCommit(data);
                        }
                      }}
                      onCancel={(err) => {
                        toast.error('The process end before the payment, try again');
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* end Checkout */}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Checkout;
