import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, doApiMethod } from "../services/apiService";
import "./css/login.css";
import { BsShop } from "react-icons/bs";
import { motion } from "framer-motion/dist/framer-motion";

function Login(props) {
  let nav = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubForm = (data) => {
    doApi(data);
  };

  const doApi = async (_dataBody) => {
    let url = API_URL + "/users/login";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      // console.log(resp.data);
      if (resp.data.token) {
        localStorage.setItem("tok", resp.data.token);
        // send user to home
        nav("/");
        window.location.reload();
        // toast.info("Welcome ");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      } else {
        toast.error("There some error come back later...");
      }
    } catch (err) {
      toast.error(err.response.data.err);
    }
  };

  let emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  });

  let passwordRef = register("password", { required: true, minLength: 3 });

  return (
    <div
      className="login-dark"
      // style={{
      //   backgroundImage: `url("/images/login.jpg")`,
      // }}
    >
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        onSubmit={handleSubmit(onSubForm)}
      >
        <h2 className="text-center">Login Form</h2>
        <div className="illustration">
          <BsShop />
        </div>
        <div className="form-group">
          <input
            {...emailRef}
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
          />
          {errors.email ? (
            <small className="text-danger d-block">* Email invalid</small>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <input
            {...passwordRef}
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
          />
          {errors.password ? (
            <small className="text-danger d-block">
              * Enter valid password, min 3 chars
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block" type="submit">
            Log In
          </button>
          <Link className="already mt-3" to="/register">
            You don't have an account? Register here.
          </Link>
        </div>
      </motion.form>
    </div>
  );
}

export default Login;
