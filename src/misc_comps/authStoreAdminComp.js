import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../services/apiService';
import { STORE_SHORT_IDS } from '../services/localService';

function AuthStoreAdminComp(props) {
  const nav = useNavigate();

  useEffect(() => {
    // check if there token in the browser
    if (localStorage['tok']) {
      doApi();
    } else {
      toast.error('Please log in first');
      nav('/login');
    }
  }, []);

  const doApi = async () => {
    let url = API_URL + '/users/myInfo';
    try {
      let resp = await doApiGet(url);
      // console.log(resp.data);
      // check if the token is of store_admin
      if (!resp.data) {
        toast.error('Please login first');
        nav('/login');
      }
      //verify that users own this store
      else if (localStorage[STORE_SHORT_IDS]) {
        if (!JSON.parse(localStorage[STORE_SHORT_IDS]).includes(props.store_short_id)) {
          toast.error('You are not allowed to access this store');
          nav('/');
        }
      }
    } catch (err) {
      // if there not token at all
      console.log(err.response);
      alert('something went wrong. Please log in and try again');
      nav('/admin/logout');
      // if token invalid for super_admin
    }
  };
  return <React.Fragment></React.Fragment>;
}

export default AuthStoreAdminComp;
