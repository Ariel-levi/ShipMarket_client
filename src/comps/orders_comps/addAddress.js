import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';
import { useSearchAddress } from '../../hooks/useSearchAddress';
import { useDebounce } from '../../hooks/useDebounce';
import '../css/light_box.css';

function AddAddress(props) {
  const [selected, setSelected] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const debounceSearchTerm = useDebounce(searchTerm, 1000);
  const [results, setResults, isSearching] = useSearchAddress(debounceSearchTerm);
  const address = props?.address;
  const setAddress = props?.setAddress;

  useEffect(() => {
    updateInput(address);
  }, []);

  const disabledBtn = () => {
    //  disable done btns
    if (!selected) {
      return {
        opacity: '0.6',
        pointerEvents: 'none'
      };
    }
    return {};
  };

  const onSuggestHandler = (_address) => {
    setResults([]);
    setSelected(_address);
    updateInput(_address);
  };

  const onChangeClick = () => {
    setSearchTerm('');
    setResults([]);
    setSelected(null);
    updateInput(null);
  };

  const updateInput = (_address) => {
    document.getElementById('input').value = _address?.label || null;
  };

  const onDoneClick = () => {
    setAddress(selected);
    props.setDisplayLightBox(false);
  };

  return (
    <div className="light_box">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="container mt-5">
        <div className="container border inside_box text-start" style={{ height: '70vh' }}>
          <button
            onClick={() => {
              props.setDisplayLightBox(false);
            }}
            className="btn btn-outline-danger close_button">
            <AiOutlineClose />
          </button>
          <h4 className="text-center">Select address</h4>
          <hr />

          <div className="border p-2 rounded d-flex align-items-center form-control">
            <input
              id="input"
              type="text"
              className="w-100"
              placeholder="search address"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {(address || selected) && (
              <button className="btn text-info text-end" onClick={onChangeClick}>
                Change
              </button>
            )}
          </div>

          {results.length > 0 && (
            <div className="border shadow">
              {results.map((item, i) => {
                return (
                  <div
                    className=" p-2 text-start list"
                    key={item.raw.place_id}
                    onClick={() => onSuggestHandler(item)}>
                    <IoLocationOutline />
                    {' ' + item.label}
                    <hr className="m-0" />
                  </div>
                );
              })}
            </div>
          )}
          {results.length === 0 && (
            <button
              className="btn btn-info form-control w-75"
              style={{
                position: 'absolute',
                bottom: '20px',
                left: 0,
                right: 0,
                margin: 'auto',
                width: '100px',
                ...disabledBtn()
              }}
              onClick={onDoneClick}>
              Done
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default AddAddress;
