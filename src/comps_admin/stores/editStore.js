import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AuthAdminComp from '../../misc_comps/authAdminComp';
import { FaRegEdit } from 'react-icons/fa';
import { BsCardImage } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import LottieAnimation from '../../comps/general_comps/lottieAnimation';
import '../css/formStore.css';
import ImagesSearch from '../../comps/general_comps/imagesSearch';
import AddAddress from '../../misc_comps/addAddress';

function EditStore(props) {
  const [store, setStore] = useState({});
  const [openImageSearch, setOpenImageSearch] = useState(false);
  const [imageSearch, setImageSearch] = useState('');
  const [displayLightBox, setDisplayLightBox] = useState(false);
  const [address, setAddress] = useState('');
  let params = useParams();
  let nav = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  let nameRef = register('name', {
    required: true,
    minLength: 2,
    maxLength: 150
  });
  let addressRef = register('address', { required: true, minLength: 5 });
  let infoRef = register('info', { required: true, minLength: 5 });
  let img_urlRef = register('img_url', {
    required: false,
    minLength: 3,
    maxLength: 500
  });

  useEffect(() => {
    doApi();
  }, []);

  useEffect(() => {
    setValue('img_url', imageSearch);
    setValue('address', address?.label);
  }, [address, imageSearch]);

  const doApi = async () => {
    let urlStore = API_URL + '/stores/single/' + params.id;
    let resp2 = await doApiGet(urlStore);
    setStore(resp2.data);
    console.log(resp2.data);
    setAddress(resp2.data.address);
    setImageSearch(resp2.data.img_url);
  };

  const onSubForm = (formData) => {
    if (address) {
      formData.address = JSON.stringify(address);
    }
    console.log(formData);
    doFormApi(formData);
  };

  const doFormApi = async (formData) => {
    let url = API_URL + '/stores/' + store._id;
    try {
      let resp = await doApiMethod(url, 'PUT', formData);
      // console.log(resp.data);
      if (resp.data.modifiedCount) {
        toast.success('Store updated');
        // back to the list of stores in the admin panel
        nav('/admin/stores');
      } else {
        toast.warning('Nothing to updated');
      }
    } catch (err) {
      console.log(err.response);
      toast.error("It's not you, it's us. Please try again");
      nav('/admin/stores');
    }
  };

  return (
    <div className="container">
      <AuthAdminComp />
      {openImageSearch ? (
        <ImagesSearch setOpenImageSearch={setOpenImageSearch} setImageSearch={setImageSearch} />
      ) : (
        ''
      )}
      {/* search address comp */}
      {displayLightBox && (
        <AddAddress
          setDisplayLightBox={setDisplayLightBox}
          address={address}
          setAddress={setAddress}
          addCurrentLocation={false}
        />
      )}
      <h1 className="text-center mt-3">Edit Store</h1>
      <div className="store-form">
        {store._id ? (
          <form onSubmit={handleSubmit(onSubForm)}>
            <div
              className="form-icon edit_img"
              style={{
                backgroundImage: `url(${store.img_url})`
              }}>
              <span>
                <FaRegEdit />
              </span>
            </div>
            <div className="form-group">
              <p className="small">* Name</p>
              <input
                defaultValue={store.name}
                {...nameRef}
                type="text"
                className="form-control item"
                placeholder="Store Name *"
              />
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
                className="form-control item"
                type="address"
                placeholder="Address *"
              />
              {errors.address ? (
                <small className="text-danger d-block">* Address invalid</small>
              ) : (
                ''
              )}
            </div>
            <div className="form-group">
              <button
                className="btn animaLinkSM mb-2"
                onClick={(e) => {
                  setOpenImageSearch(true);
                  e.preventDefault();
                }}>
                Get image from Pexels <BsCardImage className="mx-2" />
              </button>
              <input
                {...img_urlRef}
                defaultValue={imageSearch}
                type="text"
                className="form-control item"
                placeholder="Add Image"
              />
              {errors.img_url ? (
                <small className="text-danger d-block">* Enter valid image, min 3 chars</small>
              ) : (
                ''
              )}
            </div>
            <div className="form-group">
              <p className="small">* Info</p>
              <textarea
                defaultValue={store.info}
                {...infoRef}
                required
                className="form-control item"
                placeholder="Store Info *"
                style={{ width: '100%', height: '150px' }}></textarea>
              {errors.info ? (
                <small className="text-danger d-block">* Enter valid info, min 5 chars</small>
              ) : (
                ''
              )}
            </div>
            <div className="form-group">
              <button className="btn btn-block create-account mx-3">Edit</button>
              <button
                className="btn btn-block create-account"
                onClick={(e) => {
                  e.preventDefault();
                  nav(-1);
                }}>
                Back
              </button>
            </div>
          </form>
        ) : (
          <LottieAnimation />
        )}
      </div>
    </div>
  );
}

export default EditStore;
