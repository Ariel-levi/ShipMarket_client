import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsPen, BsEraser, BsInfoCircle } from 'react-icons/bs';
import { MdAddShoppingCart } from 'react-icons/md';
import { toast } from 'react-toastify';
import LottieAnimation from '../../comps/general_comps/lottieAnimation';
import { dateCreated } from '../../misc_comps/dateCreated';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AuthClientComp from '../../comps/general_comps/authClientComp';

function ProductsStoreAdmin(props) {
  const [products, setProducts] = useState([]);
  const [storeInfo, setStoreInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  let params = useParams();
  let nav = useNavigate();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let productsUrl = API_URL + '/products/storeProducts/' + params.id;
    let storeUrl = API_URL + '/stores/single/' + params.id;
    try {
      let resp = await doApiGet(productsUrl);
      // console.log(resp.data);
      setProducts(resp.data);

      let resp2 = await doApiGet(storeUrl);
      // console.log(resp2.data);
      setStoreInfo(resp2.data);

      setLoading(false);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  const delProduct = async (_idDel) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        let url = API_URL + '/products/' + _idDel;
        let resp = await doApiMethod(url, 'DELETE', {}, params.id);
        // console.log(resp.data);
        if (resp.data.deletedCount) {
          toast.info('Product deleted successfully');
        }
        // to show the new list without the product that we deleted
        doApi();
      } catch (err) {
        console.log(err.response);
        alert('there problem , try again later');
      }
    }
  };

  return (
    <div className="container">
      <AuthClientComp />
      <h1 className="display-5">{storeInfo.name} Products</h1>
      <Link
        className="btn btn-outline-success my-3"
        to="/storeAdmin/products/addProduct"
        state={{ storeInfo }}>
        Add Product <MdAddShoppingCart />
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Date Created</th>
            <th>Qty</th>
            <th>Short_id</th>
            <th>Del/Edit/Info</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={item.img_url || '/images/no_image.png'}
                    alt={item.name + ' image'}
                    height="50"
                    width="90"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{dateCreated(item.date_created)}</td>
                <td>{item.qty}</td>
                <td>{item.short_id}</td>
                <td>
                  <button
                    onClick={() => {
                      delProduct(item._id);
                    }}
                    className="btn btn-outline-danger"
                    title="Delete">
                    <BsEraser />
                  </button>
                  <Link
                    to={'/storeAdmin/products/edit/' + item._id}
                    state={{ storeInfo }}
                    className="btn btn-outline-secondary mx-2"
                    title="Edit">
                    <BsPen />
                  </Link>
                  <button
                    onClick={() => {
                      nav('/storeAdmin/products/info/' + item._id);
                    }}
                    className="btn btn-outline-info"
                    title="Info">
                    <BsInfoCircle />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {products.length === 0 ? <h2 className="text-center display-2">No Products</h2> : ''}
      {loading ? <LottieAnimation /> : ''}
    </div>
  );
}

export default ProductsStoreAdmin;
