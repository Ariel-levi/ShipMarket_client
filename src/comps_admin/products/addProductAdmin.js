import React, { useEffect, useState } from 'react';
import AuthAdminComp from '../../misc_comps/authAdminComp';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useForm } from 'react-hook-form';
import { MdAddShoppingCart } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BsCardImage } from 'react-icons/bs';
import ImagesSearch from '../../comps/general_comps/imagesSearch';

function AddProductAdmin(props) {
  const [btnSend, setBtnSend] = useState(false);
  const [stores, setStores] = useState([]);
  const [openImageSearch, setOpenImageSearch] = useState(false);
  const [imageSearch, setImageSearch] = useState('');
  let nav = useNavigate();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let urlStores = API_URL + '/stores?perPage=100';
    try {
      let resp2 = await doApiGet(urlStores);
      setStores(resp2.data);
      // console.log("stores", resp2.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  let {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  let nameRef = register('name', {
    required: true,
    minLength: 2,
    maxLength: 150
  });
  let priceRef = register('price', { required: true, minLength: 1 });
  let infoRef = register('info', { required: true, minLength: 5 });
  let store_short_idRef = register('store_short_id', {
    required: true,
    minLength: 5,
    maxLength: 99
  });
  let img_urlRef = register('img_url', {
    required: false,
    minLength: 3,
    maxLength: 500
  });
  let qtyRef = register('qty', {
    required: false,
    minLength: 1,
    maxLength: 99999
  });

  const onSubForm = (formData) => {
    if (imageSearch) {
      formData.img_url = imageSearch;
    }
    setBtnSend(true);
    doFormApi(formData);
  };

  const doFormApi = async (formData) => {
    let url = API_URL + '/products';
    try {
      let resp = await doApiMethod(url, 'POST', formData);
      if (resp.data._id) {
        toast.success('Product was created successfully');
        nav('/admin/products');
      }
    } catch (err) {
      console.log(err.response);
      toast.error('Product was not created. Please try again');
      nav('/admin/products');
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
      <h1 className="text-center mt-3">Add Product</h1>
      <div className="store-form">
        <form onSubmit={handleSubmit(onSubForm)}>
          <div className="form-icon">
            <span>
              <MdAddShoppingCart />
            </span>
          </div>
          <div className="form-group">
            <input
              {...nameRef}
              type="text"
              className="form-control item"
              placeholder="* product Name"
            />
            {errors.name ? (
              <small className="text-danger d-block">* Enter valid name, min 2 chars</small>
            ) : (
              ''
            )}
          </div>
          <div className="form-group">
            <input {...priceRef} type="text" className="form-control item" placeholder="* Price" />
            {errors.price ? (
              <small className="text-danger d-block">* Enter valid price, min 1</small>
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
          {/* Condition Del ? */}
          <div className="form-group">
            <input type="text" className="form-control item" placeholder="Condition" />
          </div>
          {/* Condition ? */}
          <div className="form-group">
            <input {...qtyRef} type="text" className="form-control item" placeholder="Qty" />
            {errors.qty ? (
              <small className="text-danger d-block">* Enter valid qty, min 1</small>
            ) : (
              ''
            )}
          </div>
          <div className="form-group">
            <select {...store_short_idRef} className="form-control form-select item">
              <option value="">* Select Store</option>
              {stores.map((item) => {
                return (
                  <option key={item._id} value={item.short_id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            {errors.store_short_id ? (
              <small className="text-danger d-block">* Select Store</small>
            ) : (
              ''
            )}
          </div>
          <div className="form-group">
            <textarea
              {...infoRef}
              className="form-control item"
              placeholder="* product Info"
              style={{ width: '100%', height: '150px' }}></textarea>
            {errors.info ? (
              <small className="text-danger d-block">* Enter valid info, min 5 chars</small>
            ) : (
              ''
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-block create-account mx-3" disabled={btnSend}>
              Create products
            </button>
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
      </div>
    </div>
  );
}

export default AddProductAdmin;
