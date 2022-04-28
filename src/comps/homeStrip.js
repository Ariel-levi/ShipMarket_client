import React from "react";
import "./css/homeStrip.css";
import { motion } from "framer-motion/dist/framer-motion";

function HomeStrip(props) {
  let image = props.image;
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="strip_home container-fluid d-flex align-items-center"
    >
      <motion.div
        className="container text_bg text-center"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <h2 className="h1">Welcome to Wolt !</h2>
        <h4 className="h4">The Best Delivery Store</h4>
      </motion.div>
    </div>
  );
}

export default HomeStrip;
