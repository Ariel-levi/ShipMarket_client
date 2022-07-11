import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsCardImage } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { API_URL, doApiMethod } from './../services/apiService';
import { toast } from 'react-toastify';
import './css/register.css';
import ImagesSearch from './general_comps/imagesSearch';
import AddAddress from '../misc_comps/addAddress';

function CreateStoreForm(props) {
  // for disabled the send btn for avoid multi click on him
  const [btnSend, setBtnSend] = useState(false);
  const [openImageSearch, setOpenImageSearch] = useState(false);
  const [imageSearch, setImageSearch] = useState('');
  const [displayLightBox, setDisplayLightBox] = useState(false);
  const [address, setAddress] = useState('');

  let imageInputRef = useRef();

  useEffect(() => {
    setValue('img_url', imageSearch);
    setValue('address', address?.label);
  }, [address, imageSearch]);

  let nav = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const onSubForm = (data) => {
    if (address) {
      data.address = JSON.stringify(address);
    }
    console.log(data);
    doApi(data);
  };

  const doApi = async (_dataBody) => {
    let url = API_URL + '/stores/';
    try {
      let resp = await doApiMethod(url, 'POST', _dataBody);
      if (resp.data._id) {
        setBtnSend(true);
        nav('/');
        toast.success(
          'Store creating requests has been sent successfully. Please whait for admin approval'
        );
      }
    } catch (err) {
      if (err.response.data.code == 11000) {
        toast.error(err.response.data.message);
      } else {
        toast.error("It's not you, it's us. Please try again");
      }
    }
  };

  let nameRef = register('name', { required: false, minLength: 2 });
  let addressRef = register('address', { required: true });
  let infoRef = register('info', { required: false, minLength: 5 });
  let img_urlRef = register('img_url', {
    required: true,
    minLength: 3,
    maxLength: 500
  });

  return (
    <div className="container">
      {openImageSearch ? (
        <ImagesSearch setOpenImageSearch={setOpenImageSearch} setImageSearch={setImageSearch} />
      ) : (
        ''
      )}
      <motion.div
        initial={{ y: '-100vw' }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-center mt-5">
        <h3 className="mb-3">You want to own a store ?</h3>
        <h6>All you have to do is fill out this form and we'll contact you</h6>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="register-photo">
        {/* search address comp */}
        {displayLightBox && (
          <AddAddress
            setDisplayLightBox={setDisplayLightBox}
            address={address}
            setAddress={setAddress}
            addCurrentLocation={false}
          />
        )}

        <div className="form-container">
          <div
            className="image-holder"
            style={{ backgroundImage: `url("/images/createStore.jpg")` }}></div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubForm)}>
            <h2 className="text-center">
              <strong>Request</strong> to create a Store.
            </h2>
            {/* name */}
            <div className="form-group mb-3">
              <input {...nameRef} className="form-control" type="name" placeholder="* Store Name" />
              {errors.name ? (
                <small className="text-danger d-block">* Enter valid name, min 2 chars</small>
              ) : (
                ''
              )}
            </div>

            {/* address */}
            <div className="form-group mb-3">
              <button
                className="btn animaLinkSM mb-2"
                onClick={(e) => {
                  setDisplayLightBox(true);
                  e.preventDefault();
                }}>
                Get address <ImLocation className="mx-2" />
              </button>

              <input
                {...addressRef}
                readOnly
                defaultValue={address?.label}
                className="form-control"
                type="address"
                placeholder="add address"
              />
              {errors.address ? (
                <small className="text-danger d-block">* Address invalid</small>
              ) : (
                ''
              )}
            </div>

            {/* Store image */}
            <div className="form-group mb-3">
              <button
                className="btn animaLinkSM mb-2"
                onClick={(e) => {
                  setOpenImageSearch(true);
                  e.preventDefault();
                }}>
                Get image from Pexels <BsCardImage className="mx-2" />
              </button>
              <input
                // readOnly
                {...img_urlRef}
                value={imageSearch}
                ref={imageInputRef}
                className="form-control"
                type="text"
                placeholder="Image"
                // onChange={() => setValue('img_url', imageSearch)}
              />
              {errors.img_url ? (
                <small className="text-danger d-block">* Enter valid image, min 3 chars</small>
              ) : (
                ''
              )}
            </div>
            {/* store info */}
            <div className="form-group mb-3">
              <textarea
                {...infoRef}
                className="form-control"
                placeholder="* Store info "
                style={{ width: '100%', height: '150px' }}></textarea>
              {errors.info ? (
                <small className="text-danger d-block">* Enter valid info, min 5 chars</small>
              ) : (
                ''
              )}
            </div>
            <div className="form-group mb-3">
              <button disabled={btnSend} className="btn btn-primary col-12" type="submit">
                Send Request
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default CreateStoreForm;
