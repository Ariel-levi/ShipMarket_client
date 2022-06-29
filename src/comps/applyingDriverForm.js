import React, { useEffect, useRef } from 'react';
import './css/register.css';
import { API_URL, doApiMethod } from './../services/apiService';
import { toast } from 'react-toastify';
import AuthClientComp from './general_comps/authClientComp';
import './css/page404.css';
import Lottie from 'lottie-web';

function ApplyingDriverForm(props) {
  let animaRef = useRef(); // for lottie-web animation

  useEffect(() => {
    Lottie.loadAnimation({
      container: animaRef.current,
      loop: true,
      autoplay: true,
      path: 'https://assets8.lottiefiles.com/packages/lf20_6sxyjyjj.json'
    });
  }, []);

  const onClickApply = async () => {
    let url = API_URL + '/users/applyingForCourier';
    try {
      let resp = await doApiMethod(url, 'PATCH', {});
      console.log(resp);
      if (resp.data.modifiedCount === 1) {
        toast.success('your applied successfully');
      } else {
        toast.error('you already applied');
      }
    } catch (error) {
      console.log(error);
      toast.error('something went wrong');
    }
  };
  return (
    <React.Fragment>
      <AuthClientComp />
      <div style={{ minHeight: '70vh' }} className="container">
        <div className="mt-4 animation_courier">
          <div ref={animaRef}></div>
        </div>
        <div className="text-center">
          <h3 className="mb-3 display-5">Become a Shipmarket driver partner</h3>
          <h6>Ready to become a Shipmarket driver and get started? apply in a few clicks.</h6>
          <botton className="btn btn-outline-info mt-2" onClick={onClickApply}>
            Apply
          </botton>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ApplyingDriverForm;
