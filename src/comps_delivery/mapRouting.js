import React, { useEffect, useState, useRef, useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import RoutingMachine from './routingMachine';

function MapRouting(props) {
  // המיקום שלי ו- עיריית פתח תקווה זה הדיפולת
  const [startPos, setStartPos] = useState([0, 0]);
  const [middlePos, setmiddlePos] = useState([32.0864256, 34.8848128]);
  // המיקום שהמשתמש הביא
  const [endDestinationPos, setEndDestinationPos] = useState([32.0906375, 34.8823783]);

  // let inputRef = useRef();
  // const provider = new OpenStreetMapProvider();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let location = [pos.coords.latitude, pos.coords.longitude];
        console.log('location', location);
        setStartPos(location);
      },
      (err) => {
        console.log(err);
        alert('there problem with the position');
      }
    );
    console.log(
      `to the store https://www.waze.com/he/live-map/directions?navigate=yes&to=ll.${middlePos[0]},${middlePos[1]}&from=ll.${startPos[0]},${startPos[1]}`
    );
    console.log(
      `to the client https://www.waze.com/he/live-map/directions?navigate=yes&to=ll.${endDestinationPos[0]},${endDestinationPos[1]}&from=ll.${startPos[0]},${startPos[1]}`
    );
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="display-5 mb-4 animaLinkSM">Order Details</h2>
      {/* https://www.waze.com/ul?ll={40.75889500}%2C-{73.98513100}&navigate=yes&zoom=17 */}
      {/* <a
        className="map_btn"
        href={`https://www.waze.com/ul?ll=${endDestinationPos[0]},${endDestinationPos[1]}&navigate=yes&zoom=17`}
        onClick={() => {
          console.log(
            `https://www.waze.com/ul?ll=${endDestinationPos[0]},${endDestinationPos[1]}&navigate=yes&zoom=17`
          );
        }}>
        Waze
      </a> */}

      <MapContainer className="map" center={startPos} zoom={18} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="ShipMarket"
        />
        {/* comp for Route */}
        <RoutingMachine start={startPos} stop={middlePos} end={endDestinationPos} />
      </MapContainer>
    </div>
  );
}

export default MapRouting;
