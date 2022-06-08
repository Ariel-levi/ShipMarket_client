import React, { useEffect, useState, useRef } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { motion } from 'framer-motion/dist/framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { GrLocation, GrLocationPin } from 'react-icons/gr';
import { ADDRESS, checkAddressLocal, saveAddressLocal } from '../services/localService';
import { useDebounce } from '../hooks/useDebounce';
import './css/light_box.css';

function AddAddress(props) {
  const address = props.address;
  const setAddress = props.setAddress;

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [selected, setSelected] = useState(address);
  const provider = new OpenStreetMapProvider();
  let inputRef = useRef();

  useEffect(() => {
    updateInput();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      doApi();
    } else {
      setIsSearching(false);
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  const doApi = async () => {
    let tempRes = await provider.search({ query: debouncedSearchTerm });
    tempRes = tempRes.filter((item) => item.raw.osm_type === 'way' && item.raw.type !== 'town');
    if (tempRes.length > 0) {
      setResults(tempRes);
      console.log(tempRes);
      setIsSearching(false);
    }
  };

  const onSuggestHandler = (_address) => {
    setAddress(_address);
    setResults([]);
    // updateInput();
  };

  const onChangeClick = () => {
    // setAddress(null);
    setResults([]);
    // updateInput();
    inputRef.current.value = null;
    // document.getElementById('input').value = undefined;
  };

  const updateInput = () => {
    inputRef.current.value = selected?.label || undefined;
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
              ref={inputRef}
              type="text"
              placeholder="search address"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={selected ? selected.label : undefined}
            />
            {selected && (
              <button className="btn text-info" onClick={onChangeClick}>
                Change
              </button>
            )}
          </div>

          {results.length > 0 && (
            <div className="border shadow">
              {results.map((item, i) => {
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
