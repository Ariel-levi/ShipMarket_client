import React, { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../services/apiService";
import AuthClientComp from "./general_comps/authClientComp";
import LottieAnimation from "./general_comps/lottieAnimation";
import { motion } from "framer-motion/dist/framer-motion";
import { BsStar } from "react-icons/bs";
import Product from "./product";

function FavsProducts(props) {
  let [ar, setAr] = useState([]);

  useEffect(() => {
    doApiListFav();
  }, []);

  const doApiListFav = async () => {
    let url = API_URL + "/favs/productsInfo";
    let resp = await doApiGet(url);
    console.log(resp.data);
    setAr(resp.data);
  };

  return (
    <div className="container-fluid" style={{ minHeight: "85vh" }}>
      <div className="container">
        <AuthClientComp />
        <motion.div
          initial={{ y: "-100vw" }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-center my-5"
        >
          <h3 className="mt-4">
            Your Favorites Products <BsStar />
          </h3>
          <h6>Click on star to remove them from the list</h6>
        </motion.div>

        {ar.length === 0 ? <LottieAnimation /> : ""}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {ar.map((item) => {
            return <Product key={item._id} item={item} />;
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default FavsProducts;
