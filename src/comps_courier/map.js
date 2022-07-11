import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { API_URL, doApiGet } from '../services/apiService';
import PopupMap from './popupMap';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './css_courier/courier.css';

function Map(props) {
  const [stores_ar, setStores_ar] = useState([]);
  const [currLocation, setCurrLocation] = useState([0, 0]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState([]);
  const [map, setMap] = useState();

  const containerStyle = {
    width: '400px',
    height: '400px'
  };

  const center = {
    lat: -3.745,
    lng: -38.523
  };

  // useEffect(() => {
  //   doApi();
  // }, []);

  // useEffect(() => {
  //   getCurrentLocations();
  // }, [map]);

  // const doApi = async () => {
  //   let ordersUrl = API_URL + '/orders/storesWithOrders';
  //   try {
  //     let resp = await doApiGet(ordersUrl);
  //     console.log('storesWithOrders : ', resp.data.data);
  //     setStores_ar(resp.data.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getCurrentLocations = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       map?.setView([pos.coords.latitude, pos.coords.longitude]);
  //       setCurrLocation([pos.coords.latitude, pos.coords.longitude]);
  //     },
  //     (err) => {
  //       console.log(err);
  //       alert('there problem with the position');
  //     }
  //   );
  // };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
    // <div className="container my-5">
    //   {popupOpen && <PopupMap popupInfo={popupInfo} setPopupOpen={setPopupOpen} />}
    //   {/* zoom={18} / 12  */}
    //   <MapContainer whenCreated={setMap} center={currLocation} zoom={12} scrollWheelZoom={true}>
    //     <TileLayer
    //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //       attribution="ShipMarket"
    //     />
    //     {stores_ar.reverse().map((item) => {
    //       return (
    //         <Marker
    //           key={item.orders[0]._id}
    //           position={[item.store.address.y, item.store.address.x]}
    //           eventHandlers={{
    //             click: (e) => {
    //               setPopupInfo(item);
    //               setPopupOpen(true);
    //             }
    //           }}>
    //           <Tooltip>{item.store.address.label}</Tooltip>
    //         </Marker>
    //       );
    //     })}
    //   </MapContainer>
    // </div>
  );
}

export default Map;
