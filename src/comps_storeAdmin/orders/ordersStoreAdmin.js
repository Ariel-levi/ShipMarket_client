import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import LottieAnimation from '../../comps/general_comps/lottieAnimation';
import { API_URL, doApiGet } from '../../services/apiService';
import OrderItemStoreAdmin from './orderItemStoreAdmin';

function OrdersStoreAdmin(props) {
  const [ar, setAr] = useState([]);
  const [tempAr, setTempAr] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectRef = useRef();
  const params = useParams();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let ordersUrl = API_URL + `/orders/storeOrders/` + params.id;
    try {
      let respOrders = await doApiGet(ordersUrl);
      // console.log(respOrders.data);
      let filterPending = respOrders.data.filter((order) => order.status !== 'pending');
      setAr(filterPending);
      setTempAr(filterPending);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onSelectOption = () => {
    let status_val = selectRef.current.value;
    if (status_val !== '') {
      let temp_ar = ar.filter((order) => order.status === status_val);
      setTempAr(temp_ar);
    } else {
      setTempAr(ar);
    }
  };

  return (
    <div className="container">
      {/* <AuthAdminComp /> */}
      <orderItemAdminStore />
      <h2 className="display-4">All my orders</h2>
      {/* filter orders by the status */}
      <div className="my-5 col-md-3 position-absolute top-0 end-0">
        <select ref={selectRef} onChange={onSelectOption} className="form-select">
          <option value="">All Orders</option>
          <option value="shipped">Shipped</option>
          <option value="paid">Paid</option>
          <option value="complete">Complete</option>
        </select>
      </div>
      {tempAr.length === 0 && !loading ? (
        <h2 className="display-4 text-center mt-5">No Orders</h2>
      ) : (
        <table className="table table-striped table-scrollbar mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Date & Time</th>
              <th>Address</th>
              <th>Total price</th>
              <th>Products</th>
              <th>Info / Del</th>
            </tr>
          </thead>
          <tbody>
            {tempAr.map((item, i) => {
              return <OrderItemStoreAdmin key={item._id} item={item} index={i} />;
            })}
          </tbody>
        </table>
      )}
      {loading && <LottieAnimation />}
    </div>
  );
}

export default OrdersStoreAdmin;
