import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL, doApiGet } from "../services/apiService";
import { MdOutlineLocationCity } from "react-icons/md";
import { BsInfoCircleFill, BsChevronRight } from "react-icons/bs";
import { HiTemplate } from "react-icons/hi";
import "./css/storeInfo.css";
import Product from "./product";

function StoreInfo(props) {
  const [shop, setShop] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);
  let params = useParams();
  let nav = useNavigate();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/stores/single/" + params.id;
    let resp = await doApiGet(url);
    setShop(resp.data);
    // console.table(resp.data);

    let urlProducts = API_URL + "/products/storeProducts/" + params.id;
    let resp2 = await doApiGet(urlProducts);
    setStoreProducts(resp2.data);
    // console.table(resp2.data);
  };
  return (
    <React.Fragment>
      <div
        style={{
          backgroundImage: `url(${shop.img_url || "/images/no_image.png"})`,
        }}
        className="strip container-fluid d-flex align-items-center"
      >
        <div className="container stripText_bg text-center">
          <h2 className="shop_name">{shop.name}</h2>
        </div>
      </div>
      <div className="container store_info text-center">
        <button
          style={{ background: "none" }}
          className="position-absolute top-0 end-0 m-5 animaLinkSM "
          onClick={() => {
            nav(-1);
          }}
        >
          Back <BsChevronRight className="mx-2" />
        </button>
        <img
          src={shop.img_url || "/images/no_image.png"}
          alt={shop.name}
          width="100"
          height="90"
          className="logo"
        />
        <h1 className="mt-2">{shop.name}</h1>
        <div className="row">
          <div className="col-6">
            <p className="animaLink">
              Info <BsInfoCircleFill className="mx-2" />
            </p>
            <p className="text_info">{shop.info}</p>
          </div>
          <div className="col-6">
            <p className="animaLink">
              Address <MdOutlineLocationCity className="mx-2" />
            </p>
            <p className="text_info">{shop.address}</p>
          </div>
        </div>
      </div>
      <div className="container text-center">
        <p className="animaLink">
          Products <HiTemplate className="mx-2" />
        </p>
        {storeProducts == 0 ? (
          <div>
            <small>No Products</small>
          </div>
        ) : (
          ""
        )}
      </div>
      {storeProducts.map((item) => {
        return <Product key={item._id} item={item} />;
      })}
    </React.Fragment>
  );
}

export default StoreInfo;
