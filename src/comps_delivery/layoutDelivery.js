import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderDelivery from './headerDelivery';

function LayoutDelivery(props) {
  return (
    <div>
      <React.Fragment>
        <HeaderDelivery />
        <Outlet />
      </React.Fragment>
    </div>
  );
}

export default LayoutDelivery;
