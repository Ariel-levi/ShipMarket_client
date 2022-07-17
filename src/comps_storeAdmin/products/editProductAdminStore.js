import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegEdit } from 'react-icons/fa';
import { BsCardImage } from 'react-icons/bs';
import LottieAnimation from '../../comps/general_comps/lottieAnimation';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import ImagesSearch from '../../comps/general_comps/imagesSearch';
import AuthClientComp from '../../comps/general_comps/authClientComp';

function EditProductAdminStore(props) {
  const [product, setProduct] = useState({});
  const [openImageSearch, setOpenImageSearch] = useState(false);
  const [imageSearch, setImageSearch] = useState('');
  let params = useParams();
  let nav = useNavigate();

  // to get store id
  const location = useLocation();
  const storeInfo = location.state.storeInfo;

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
  let cat_short_idRef = register('cat_short_id', {
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

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let urlProduct = API_URL + '/products/single/' + params.id;
    let resp2 = await doApiGet(urlProduct);
    setProduct(resp2.data);
    setImageSearch(resp2.data.img_url);
  };

  const onSubForm = (formData) => {
    if (imageSearch) {
      formData.img_url = imageSearch;
    }
    doFormApi(formData);
  };

  const doFormApi = async (formData) => {
    let url = API_URL + '/products/' + product._id;

    try {
      let resp = await doApiMethod(url, 'PUT', formData, storeInfo._id);
      if (resp.data.modifiedCount) {
        toast.success('Product Updated');
        nav(-1);
      } else {
        toast.warning('Nothing to update');
      }
    } catch (err) {
      console.log(err.response);
      alert('Failed to update the product, please try again');
      nav(-1);
    }
  };

  return (
    <div className="container">
      <AuthClientComp />
      {openImageSearch ? (
        <ImagesSearch setOpenImageSearch={setOpenImageSearch} setImageSearch={setImageSearch} />
      ) : (
        ''
      )}
      <h1 className="text-center mt-3">Edit Product</h1>
      <div className="store-form">
        {product._id ? (
          <form onSubmit={handleSubmit(onSubForm)}>
            <div
              className="form-icon edit_img"
              style={{
                backgroundImage: `url(${product.img_url})`
              }}>
              <span>
                <FaRegEdit />
              </span>
            </div>
            <div className="form-group">
              <p className="small">Name</p>
              <input
                {...nameRef}
                defaultValue={product.name}
                type="text"
                className="form-control item"
                placeholder="product Name"
              />
              {errors.name ? (
                <small className="text-danger d-block">* Enter valid name, min 2 chars</small>
              ) : (
                ''
              )}
            </div>
            <div className="form-group">
              <p className="small">Price</p>
              <input
                {...priceRef}
                defaultValue={product.price}
                type="text"
                className="form-control item"
                placeholder="Price"
              />
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
            <div className="form-group">
              <p className="small">Condition</p>
              <input
                defaultValue={product.condition}
                type="text"
                className="form-control item"
                placeholder="Condition"
              />
            </div>
            <div className="form-group">
              <p className="small">Qty</p>
              <input
                {...qtyRef}
                defaultValue={product.qty}
                type="text"
                className="form-control item"
                placeholder="Qty"
              />
              {errors.qty ? (
                <small className="text-danger d-block">* Enter valid qty, min 1</small>
              ) : (
                ''
              )}
            </div>
            <div className="form-group">
              <p className="small">Cat Short Id</p>
              <input
                {...cat_short_idRef}
                defaultValue={product.cat_short_id}
                type="text"
                className="form-control item"
                placeholder="Cat Short Id"
              />
              {errors.store_short_id ? (
                <small className="text-danger d-block">* Enter valid qty, min 5 max 99</small>
              ) : (
                ''
              )}
            </div>
            <div className="form-group">
              <p className="small">Store Short Id</p>
              <input
                {...store_short_idRef}
                defaultValue={product.store_short_id}
                type="text"
                className="form-control item"
                placeholder="Store Short Id"
              />
              {errors.store_short_id ? (
                <small className="text-danger d-block">* Enter valid qty, min 5 max 99</small>
              ) : (
                ''
              )}
            </div>
            <div className="form-group">
              <p className="small">Info</p>
              <textarea
                {...infoRef}
                defaultValue={product.info}
                className="form-control item"
                placeholder="product Info"
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

export default EditProductAdminStore;
