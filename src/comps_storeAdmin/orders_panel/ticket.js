import React from 'react';

function Ticket(props) {
  const item = props.item;
  const i = props.i;

  return (
    <div className="order_card col-md-6 mb-4">
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
      <section className="order_number p-3">
        <div className="container mt-4">
          <span>x {i + 1}</span>
          <div className="order_text">
            <span>{item.short_id}</span>
            <span>Order Number</span>
          </div>
        </div>
        {item.status === 'shipped' && (
          <button className="btn btn-outline-success mt-4">Order Takend</button>
        )}
      </section>
      <section className="card-cont px-2">
        <small>Total</small>
        <h3>₪ {item.total_price}</h3>
        <div className="even-date">
          <time>
            <span>{item.date_created.replace(/T/, ' ').substr(0, 16)}</span>
          </time>
        </div>
        <div className="even-info">
          <p>List of Products</p>
          {item.products_ar.map((prod) => {
            return (
              <div key={prod._id} className="d-flex flex-row">
                {prod.img_url && <img src={prod.img_url} className="prod_img me-2" />}
                <p>
                  {prod.name} <span className="h6">x{prod.qty}</span>
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Ticket;
