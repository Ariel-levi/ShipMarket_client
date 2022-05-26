import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function MyStoreItem(props) {
  let nav = useNavigate();
  let item = props.item;
  let statusColor = {
    color: "white",
    background: "#F1948A",
  };

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="payment-card rounded-lg shadow bg-white text-center h-100">
        <div className="payment-card__type px-4 py-5 d-flex justify-content-center align-items-center">
          <div
            style={item.status == "pending" ? statusColor : {}}
            className="status_tag text-uppercase text-center"
          >
            {item.status}
          </div>
          <img
            src={item.img_url || "/images/no_image.png"}
            alt={item.namr + " image"}
          />
        </div>
        <div className="payment-card__info p-4">
          <h4>{item.name}</h4>
          <p className="text-muted">address : {item.address}</p>
          <hr />
          <div className="d-flex justify-content-between">
            <button className="mx-2" style={{ background: "none" }}>
              Info <BsFillInfoCircleFill size="1.5em" color="#34495E" />
            </button>
            <div>
              <button
                onClick={() => {
                  nav("/storeAdmin/editStore/" + item._id);
                }}
                className="mx-2"
                style={{ background: "none" }}
              >
                <MdEdit size="1.5em" color="#3498DB" />
              </button>
              <button
                onClick={() => {
                  props.delStore(item._id);
                }}
                style={{ background: "none" }}
              >
                <MdDelete size="1.5em" color="#E74C3C" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyStoreItem;
