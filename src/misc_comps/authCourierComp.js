import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../services/apiService';

function AuthCourierComp(props) {
  let nav = useNavigate();

  useEffect(() => {
    // check if there token in the browser
    if (localStorage['tok']) {
      doApi();
    } else {
      toast.error('Please log in');
      nav('/login');
    }
  }, []);

  const doApi = async () => {
    let url = API_URL + '/users/myInfo';
    try {
      let resp = await doApiGet(url);
      // console.log(resp.data);
      // check if the token
      if (resp.data.role !== 'courier' && resp.data.role !== 'system_admin') {
        toast.error('Unathorized user');
        nav('/logout');
      }
    } catch (err) {
      // if there not token at all
      console.log(err.response);
      toast.error('Something went wrong. Please log in and try again.');
      nav('/logout');
      // if token invalid for super_admin
    }
  };
  return <React.Fragment></React.Fragment>;
}

export default AuthCourierComp;
