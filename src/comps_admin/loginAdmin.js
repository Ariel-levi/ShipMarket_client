import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/apiService';
import './css/adminLogin.css';
import { BsFillShieldLockFill } from 'react-icons/bs';

function LoginAdmin(props) {
  let nav = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubForm = (data) => {
    // data = the inputs in the form with ref in 1 object
    doApi(data);
  };

  useEffect(() => {
    if (localStorage['tok']) {
      nav('/admin/home');
    }
  }, []);

  const doApi = async (_dataBody) => {
    let url = API_URL + '/users/login';
    try {
      let resp = await doApiMethod(url, 'POST', _dataBody);
      // console.log(resp.data);
      if (resp.data.token) {
        localStorage.setItem('tok', resp.data.token);
        // send user to home admin
        nav('/admin/home');
        toast.info('Welcome back to admin section');
      } else {
        toast.error('Something went wrong. Please try again');
      }
    } catch (err) {
      toast.error(err.response.data.err);
      // err.response.data -> collect error with axios
      console.log(err.response.data);
    }
  };

  let emailRef = register('email', {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  });

  let passwordRef = register('password', { required: true, minLength: 3 });

  return (
    <div className="login-dark" style={{ backgroundImage: `url("/images/adminBG.jpg")` }}>
      <form onSubmit={handleSubmit(onSubForm)}>
        <h2 className="text-center">Admin Login</h2>
        <div className="illustration">
          <BsFillShieldLockFill />
        </div>
        <div className="form-group">
          <input
            {...emailRef}
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
          />
          {errors.email ? <small className="text-danger d-block">* Email invalid</small> : ''}
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
            <small className="text-danger d-block">* Enter valid password, min 3 chars</small>
          ) : (
            ''
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginAdmin;
