import React from 'react';
import AuthCourierComp from '../misc_comps/authCourierComp';
import Map from './map';

function homeCourier(props) {
  return (
    <div className="container my-5">
      <AuthCourierComp />
      <Map />
    </div>
  );
}

export default homeCourier;
