import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/apiService';
import './css/register.css';
import { motion } from 'framer-motion';
import { ImLocation } from 'react-icons/im';
import AddAddress from './orders_comps/addAddress';

function Register(props) {
  const [displayLightBox, setDisplayLightBox] = useState(false);
  const [address, setAddress] = useState('');

  let nav = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  useEffect(() => {
    setValue('address', address?.label);
  }, [address]);

  const onSubForm = (data) => {
    if (address) {
      data.address = JSON.stringify(address);
    }
    console.log(data);
    doApi(data);
  };

  const doApi = async (_dataBody) => {
    let url = API_URL + '/users/';
    try {
      let resp = await doApiMethod(url, 'POST', _dataBody);
      console.log(resp.data);
      if (resp.data.emailStatus === 'ok') {
        toast.success('You sign up 🎉');
        toast.info(resp.data.msg);
        nav('/login');
      }
    } catch (err) {
      console.log(err.response.data);
      if (err.response.data.code == 11000) {
        toast.error('Email already in system , try log in');
      } else {
        alert('There problem , try come back later');
      }
    }
  };

  let emailRef = register('email', {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  });
  let passwordRef = register('password', { required: true, minLength: 3 });
  let nameRef = register('name', { required: true, minLength: 2 });
  let addressRef = register('address', { required: true, minLength: 5 });
  let phoneRef = register('phone', {
    required: true,
    minLength: 10,
    maxLength: 10
  });

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="register-photo">
        {/* search address comp */}
        {displayLightBox && (
          <AddAddress
            setDisplayLightBox={setDisplayLightBox}
            address={address}
            setAddress={setAddress}
            addCurrentLocation={false}
          />
        )}
        <div className="form-container">
          <div
            className="image-holder"
            style={{ backgroundImage: `url("/images/slider.jpg")` }}></div>
          <form onSubmit={handleSubmit(onSubForm)}>
            <h2 className="text-center">
              <strong>Create</strong> an account.
            </h2>
            <div className="form-group mb-3">
              <input
                {...nameRef}
                className="form-control"
                type="name"
                name="name"
                placeholder="Name"
              />
              {errors.name ? (
                <small className="text-danger d-block">* Enter valid name, min 2 chars</small>
              ) : (
                ''
              )}
            </div>
            <div className="form-group mb-3">
              <input
                {...emailRef}
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
              />
              {errors.email ? <small className="text-danger d-block">* Email invalid</small> : ''}
            </div>
            <div className="form-group mb-3">
              <input
                {...passwordRef}
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
              />
              {errors.password ? (
                <small className="text-danger d-block">* Enter valid password, min 3 chars</small>
              ) : (
                ''
              )}
            </div>
            {/* address */}
            <div className="form-group mb-3">
              <button
                className="btn animaLinkSM mb-2"
                onClick={(e) => {
                  setDisplayLightBox(true);
                  e.preventDefault();
                }}>
                Get address <ImLocation className="mx-2" />
              </button>

              <input
                {...addressRef}
                readOnly
                defaultValue={address?.label}
                className="form-control"
                type="address"
                placeholder="Address"
              />
              {errors.address ? (
                <small className="text-danger d-block">* Address invalid</small>
              ) : (
                ''
              )}
            </div>
            <div className="form-group mb-3">
              <input
                {...phoneRef}
                className="form-control"
                type="phone"
                name="phone"
                placeholder="Phone"
              />
              {errors.phone ? (
                <small className="text-danger d-block">* Enter valid phone, 10 chars</small>
              ) : (
                ''
              )}
            </div>
            <div className="form-group">
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" />I agree to the license
                  terms.
                </label>
              </div>
            </div>
            <div className="form-group mb-3">
              <button className="btn btn-primary col-12" type="submit">
                Sign Up
              </button>
            </div>
            <Link className="already" to="/login">
              You already have an account? Login here.
            </Link>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
