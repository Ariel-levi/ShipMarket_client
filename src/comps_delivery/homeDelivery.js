import React from 'react';
import AuthComp from '../misc_comps/authAdminComp';
import OrdersMap from './ordersMap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function HomeDelivery(props) {
  return (
    <div className="container my-5">
      {/* <AuthComp role="delivery" /> */}
      <h3> HomeDelivery work 🏡</h3>
      <OrdersMap />
    </div>
  );
}

export default HomeDelivery;
