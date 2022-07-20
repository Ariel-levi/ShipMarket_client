import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsEraser } from 'react-icons/bs';
import LottieAnimation from '../../comps/general_comps/lottieAnimation';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { toast } from 'react-toastify';

function CategoriesAdminStore(props) {
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const catRef = useRef();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let storeUrl = API_URL + '/stores/single/' + params.id;
    try {
      let resp = await doApiGet(storeUrl);
      // console.log(resp.data);
      setStore(resp.data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  const delCategory = async (_CatName) => {
    if (window.confirm(`Are you sure you want to delete ${_CatName} ?`)) {
      let categories = store.categories.filter((cat) => cat !== _CatName);
      // console.log(categories);
      try {
        let url = API_URL + '/stores/editCat/' + params.id;
        let resp = await doApiMethod(url, 'PATCH', { categories }, params.id);
        // console.log(resp.data);
        if (resp.data.modifiedCount) {
          toast.info('Category deleted successfully');
        }
        // to show the new list without the Category that we deleted
        doApi();
      } catch (err) {
        console.log(err.response);
        alert('there problem , try again later');
      }
    }
  };

  const addCategory = async () => {
    let cat = catRef.current.value;
    if (window.confirm(`Are you sure you want to Add ${cat} ?`)) {
      if (!store.categories.includes(cat)) {
        store.categories.push(cat);
        let categories = store.categories;
        // console.log(categories);
        try {
          let url = API_URL + '/stores/editCat/' + params.id;
          let resp = await doApiMethod(url, 'PATCH', { categories }, params.id);
          // console.log(resp.data);
          if (resp.data.modifiedCount) {
            toast.info('Category added successfully');
          }
          // to show the new list without the Category that we deleted
          doApi();
        } catch (err) {
          console.log(err.response);
          alert('there problem , try again later');
        }
      } else {
        toast.warning('This category exists !!!');
      }
    }
  };

  return (
    <div className="container">
      {/* <AuthClientComp /> */}
      {!loading && <h1 className="display-5">{store.name} Categories</h1>}
      <div className="containter col-md-6 mx-auto">
        <div className="input-group my-4">
          <input ref={catRef} type="text" className="form-control" placeholder="Add Category..." />
          <button onClick={addCategory} className="btn btn-outline-success" type="button">
            Add +
          </button>
        </div>
      </div>
      {!loading && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Del</th>
              </tr>
            </thead>
            <tbody>
              {store.categories.map((item, i) => {
                return (
                  <tr key={item}>
                    <td>{i + 1}</td>
                    <td>{item}</td>
                    <td>
                      <button
                        onClick={() => {
                          delCategory(item);
                        }}
                        className="btn btn-outline-danger"
                        title="Delete">
                        <BsEraser />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {loading ? (
        <LottieAnimation />
      ) : (
        store.categories.length === 0 && <h2 className="text-center display-2">No Categories</h2>
      )}
    </div>
  );
}

export default CategoriesAdminStore;
