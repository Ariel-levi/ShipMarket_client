import React from 'react';
import AuthDeliverComp from '../misc_comps/authDeliverComp';
import Map from './map';
import OrdersMap from './ordersMap';

function HomeDelivery(props) {
  return (
    <div className="container my-5">
      <AuthDeliverComp />
      <Map />
      {/* <OrdersMap /> */}
    </div>
  );
}

export default HomeDelivery;
