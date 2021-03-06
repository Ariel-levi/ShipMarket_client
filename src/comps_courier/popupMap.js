import React from 'react';
import { useNavigate } from 'react-router-dom';
// icons
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineDeliveryDining } from 'react-icons/md';

function PopupMap(props) {
  const item = props.popupInfo;
  const nav = useNavigate();

  function shortString(text, count) {
    return text.slice(0, count) + (text.length > count ? '...' : '');
  }

  return (
    <div className="light_box">
      <button
        onClick={() => {
          props.setPopupOpen(false);
        }}
        className="btn btn-danger position-absolute top-0 end-0 mt-5 me-5"
        style={{ zIndex: '999' }}>
        <AiOutlineClose />
      </button>
      <div className="col-lg-4 col-md-6 col-sm-12 p-2">
        <div className="product-card bg-white mb-4 overflow-hidden d-lg-flex flex-column rounded-lg position-relative border">
          <div className="product-image overflow-hidden">
            <img
              src={item.store.img_url || '/images/no_image.png'}
              alt={item.store.name}
              className="product-thumbnail rounded-lg"
            />
          </div>
          <div className="p-4">
            <h4 className="display-5 mb-3">{item.store.name}</h4>
            <ul className="list-group list-group-flush">
              {item.orders.map((order) => {
                return (
                  <li key={order._id} className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <MdOutlineDeliveryDining color="green" size="1.5em" className="me-2" />
                      {shortString(String(order.destination.label), 30)}
                      <button
                        onClick={() => {
                          nav('/courier/takeDelivery/' + order._id);
                        }}
                        className="btn btn-outline-primary ms-2">
                        ShowRoute
                      </button>
                    </div>
                    <div className="small">
                      {order.date_created.replace(/T/, ' ').substr(0, 16)}
                    </div>
                  </li>
                );
              })}
            </ul>
            <hr />
            <div className="small">Orders {item.orders.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupMap;
