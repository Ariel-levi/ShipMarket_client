import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { API_URL, doApiGet } from '../services/apiService';
import './cssDelivery/delivery.css';
import { GoLocation } from 'react-icons/go';
import { Icon } from 'leaflet';

function OrdersMap(props) {
  const [orders_ar, setOrders_ar] = useState([]);
  const [currLocation, setCurrLocation] = useState([0, 0]);
  const [map, setMap] = useState();

  useEffect(() => {
    doApi();
  }, []);

  useEffect(() => {
    getCurrentLocations();
  }, [map]);

  const doApi = async () => {
    let url = API_URL + '/orders/allOrders?status=paid&&perPage=1000';
    let resp = await doApiGet(url);
    console.log(resp.data);
    setOrders_ar(resp.data);
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
  return (
    <div className="leaflet-container">
      <MapContainer center={currLocation} ref={setMap} zoom={15} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {orders_ar.length > 0 &&
          orders_ar.map((item, i) => {
            // item.destination.x = Number(item.destination.x.toFixed(7));
            // item.destination.y = Number(item.destination.y.toFixed(6));
            console.log('marker');
            console.log([item.destination.x, item.destination.y]);
            console.log(currLocation);
            return (
              <Marker
                key={item.destination.raw.place_id}
                position={[item.destination.x, item.destination.y]}
                // position={[35.209802, 31.780485]}
                eventHandlers={{
                  click: (e) => {
                    alert('work');
                    // window.open(item.link, '_blank');
                  }
                }}>
                <Tooltip>{item.destination.label}</Tooltip>
              </Marker>
            );
          })}
      </MapContainer>
      fjsadkljfhgdfs
    </div>
  );
}

export default OrdersMap;
