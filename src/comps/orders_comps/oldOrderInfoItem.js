import React from "react";

function OldOrderInfoItem(props) {
  let item = props.item;
  let i = props.i;

  return (
    <div className="product order">
      <div className="row">
        <div className="col-md-2 product-name">
          <div style={{ fontWeight: "bold" }} className="mt-2 text-center mt-5">
            {i + 1}
          </div>
        </div>
        <div className="col-md-3">
          <img className="img-fluid mx-auto d-block image" src={item.img_url} />
        </div>
        <div className="col-md-7">
          <div className="info">
            <div className="row">
              <div className="col-md-5 product-name">
                <div className="product-name">
                  <div className="mt-2">{item.name}</div>
                  <div className="product-info">
                    <div>
                      Info :<span className="value"> {item.info}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 product-name">
                <div className="product-info">
                  <div>
                    Short Id :<span className="value"> {item.short_id}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3 price">
                <span>₪ {item.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OldOrderInfoItem;
