import React, { useEffect, useState } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { motion } from 'framer-motion/dist/framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { GrLocation, GrLocationPin } from 'react-icons/gr';

import '../css/light_box.css';
import { ADDRESS, checkAddressLocal, saveAddressLocal } from '../../services/localService';

function AddAddress(props) {
  const [suggestions, setSuggestions] = useState([]);
  const provider = new OpenStreetMapProvider();

  useEffect(() => {
    // addCurrentLocation();
    updateInput();
  }, []);

  const addCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // רק בפעם השניה שיפעיל את היוזאפקט לאחר שהמאפ קונטיינר
        // עדכן את המאפ הסטויו יעבוד ויעביר
        // את מיקום המפה למקום של הקורדינטות
        // ולכן צריך את הסימן שאלה כדי לא לקבל אירור
        // map?.setView([pos.coords.latitude, pos.coords.longitude]);
        // setCoordAr([pos.coords.latitude, pos.coords.longitude]);
        console.log(pos);
      },
      (err) => {
        console.log(err);
        alert('there problem with the position');
      }
    );
  };

  //update the suggestions according to typing
  const onChangeHandler = async (_val) => {
    let input_val = _val;
    let result = await provider.search({ query: input_val });
    // edit the location name to contain just street and city name
    // result.forEach((item, i) => {
    //   let fileds = item.label.split(',');
    //   item.label = fileds[0] + ', ' + fileds[2];
    // });
    result = result.filter((item) => item.raw.osm_type === 'way' && item.raw.type !== 'town');
    if (result.length > 0) {
      setSuggestions(result);
      console.log(result);
    }
  };

  const onSuggestHandler = (_address) => {
    setSuggestions([]);
    saveAddressLocal(_address);
    updateInput();
  };

  const onChangeClick = () => {
    setSuggestions([]);
    localStorage.removeItem(ADDRESS);
    updateInput();
  };

  const updateInput = () => {
    document.getElementById('input').value = checkAddressLocal()?.label || null;
  };

  return (
    <div className="light_box">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="container mt-5"
        style={{ minHeight: '85vh' }}>
        <div className="container border inside_box text-start">
          <button
            onClick={() => {
              props.setDisplayLightBox(false);
            }}
            className="btn btn-outline-danger  close_button">
            <AiOutlineClose />
          </button>
          <h4 className="text-center">Select address</h4>
          <hr />

          <div className="border p-2 rounded d-flex align-items-center justify-content-between">
            <input
              id="input"
              type="text"
              className=" "
              placeholder="search address"
              onChange={(e) => onChangeHandler(e.target.value)}
            />
            {checkAddressLocal() && (
              <button className="btn text-info" onClick={onChangeClick}>
                Change
              </button>
            )}
          </div>

          {suggestions.length > 0 && (
            <div className="border shadow">
              {suggestions.map((item, i) => {
                return (
                  <div>
                    <div
                      className=" p-2 text-start list"
                      key={item.raw.place_id}
                      onClick={() => onSuggestHandler(item)}>
                      <GrLocationPin />
                      {' ' + item.label}
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default AddAddress;
