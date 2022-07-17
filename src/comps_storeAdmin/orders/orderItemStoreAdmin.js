import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';

function OrderItemStoreAdmin(props) {
  const nav = useNavigate();
  const item = props.item;

  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>
        <span
          className={
            item.status === 'shipped'
              ? 'badge bg-info'
              : item.status === 'paid'
              ? 'badge bg-warning'
              : 'badge bg-success'
          }>
          {item.status}
        </span>
      </td>
      <td>{item.date_created.replace(/T/, ' ').substr(0, 16)}</td>
      <td>{item.destination.label}</td>
      <td>₪ {item.total_price}</td>
      <td>{item.products_ar.length}</td>
      <td>
        <button
          onClick={() => {
            nav('/storeAdmin/orderInfo/' + item._id);
          }}
          className="btn btn-outline-info"
          title="Info">
          <BsInfoCircle />
        </button>
      </td>
    </tr>
  );
}

export default OrderItemStoreAdmin;
