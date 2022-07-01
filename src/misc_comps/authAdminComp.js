import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../services/apiService';

function AuthAdminComp(props) {
  let nav = useNavigate();

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
      // check if the token is of super_admin
      if (resp.data.role != 'system_admin') {
        toast.error('Unathorized user');
        nav('/admin/logout');
      }
    } catch (err) {
      // if there not token at all
      console.log(err.response);
      alert('Please log in first');
      nav('/admin/logout');
      // if token invalid for super_admin
    }
  };
  return <React.Fragment></React.Fragment>;
}

export default AuthAdminComp;
