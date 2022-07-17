import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LottieAnimation from '../../comps/general_comps/lottieAnimation';
import { API_URL, doApiGet } from '../../services/apiService';
import '../css/ordersPanel.css';
import Ticket from './ticket';

function OrdersPanelAdminStore(props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + `/orders/storeOrders/` + params.id;
    try {
      let respOrders = await doApiGet(url);
      // console.log(respOrders.data);
      let filterPending = respOrders.data.filter(
        (order) => order.status === 'paid' || order.status === 'shipped'
      );
      console.log(filterPending);
      setOrders(filterPending);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid bg_color">
      <section className="container">
        <h1 className="orders_titel">Orders To Make</h1>
        {orders.length === 0 && (
          <div style={{ height: '100vh' }} className="container">
            <h2 className="display-3 text-center mt-5">No Orders</h2>
          </div>
        )}
        <div className="container row justify-content-between">
          {/* start Ticket */}
          {orders.map((item, i) => {
            return <Ticket key={item._id} item={item} i={i} />;
          })}
          {/* end Ticket */}
        </div>

        {loading && <LottieAnimation />}
      </section>
    </div>
  );
}

export default OrdersPanelAdminStore;
