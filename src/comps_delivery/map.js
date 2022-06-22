import React, { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { API_URL, doApiGet } from '../services/apiService';
import PopupMap from './popupMap';
import { uniqBy } from 'lodash';

function Map(props) {
  const [stores_ar, setStores_ar] = useState([]);
  const [currLocation, setCurrLocation] = useState([0, 0]);
  const [map, setMap] = useState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState([]);
  // const [temp_ar, setTemp_ar] = useState([]);

  useEffect(() => {
    doApi();
  }, []);

  useEffect(() => {
    getCurrentLocations();
  }, [map]);

  const doApi = async () => {
    let ordersUrl = API_URL + '/orders/storesWithOrders';
    try {
      let resp = await doApiGet(ordersUrl);
      console.log('storesWithOrders : ', resp.data.data);
      setStores_ar(resp.data.data);
      // setTemp_ar(resp.data.data);
      // console.log('temp_ar', uniqBy(resp.data.data, 'store._id'));
      // setStores_ar(uniqBy(resp.data.data, 'store._id'));
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentLocations = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map?.setView([pos.coords.latitude, pos.coords.longitude]);
        setCurrLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.log(err);
        alert('there problem with the position');
      }
    );
  };

  // const filterOrders = (_arr, _idStore) => {
  //   return _arr.filter((item) => item.store._id === _idStore);
  // };

  return (
    <div className="container my-5">
      {popupOpen && <PopupMap popupInfo={popupInfo} setPopupOpen={setPopupOpen} />}
      {/* zoom={18} / 12  */}
      <MapContainer whenCreated={setMap} center={currLocation} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="ShipMarket"
        />
        {stores_ar.reverse().map((item) => {
          return (
            <Marker
              key={item.orders[0]._id}
              position={[item.store.address.y, item.store.address.x]}
              eventHandlers={{
                click: (e) => {
                  setPopupInfo(item);
                  // filterOrders(temp_ar, item.store._id);
                  setPopupOpen(true);
                }
              }}>
              <Tooltip>{item.store.address.label}</Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
