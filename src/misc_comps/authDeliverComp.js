import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../services/apiService';

function AuthDeliverComp(props) {
  let nav = useNavigate();

  useEffect(() => {
    // check if there token in the browser
    if (localStorage['tok']) {
      doApi();
    } else {
      toast.error('You must be Deliver to be here! or you need to login again');
      nav('/');
    }
  }, []);

  const doApi = async () => {
    let url = API_URL + '/users/myInfo';
    try {
      let resp = await doApiGet(url);
      // console.log(resp.data);
      // check if the token
      if (resp.data.role !== 'deliver' && resp.data.role !== 'system_admin') {
        toast.error('You must be Deliver to be here! or you need to login again');
        nav('/logout');
      }
    } catch (err) {
      // if there not token at all
      console.log(err.response);
      alert('You must be Deliver to be here! or you need to login again');
      nav('/logout');
      // if token invalid for super_admin
    }
  };
  return <React.Fragment></React.Fragment>;
}

export default AuthDeliverComp;
