import Footer from "../blocks/frontOffice/Footer";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {LoginAction} from "../redux/actions/AuthenticationActions";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";

const Login = () => {

    const {register, handleSubmit,formState:{errors}}=useForm();
    const dispatch = useDispatch();
    const AuthState = useSelector(state => state.Auth);
    const navigate=useNavigate();
    const submit = async(data)=>{
        dispatch(LoginAction(data))
    }


    useEffect(()=>{

        AuthState.isConnected && localStorage.setItem('authTokens',JSON.stringify(AuthState.tokens))
        AuthState.isConnected && localStorage.setItem('user',JSON.stringify(AuthState.user))
        localStorage.getItem('authTokens') && navigate('/home');
    },[AuthState.isConnected])

  return(

      <div className="loginPage">

          <div className="container mt-5">
              <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-xl-10">
                      <div className="card rounded-3 text-black">
                          <div className="row g-0">

                              <div className="card-body p-md-5 mx-md-4">


                                  <div className="LogoTitle">
                                      <div className='site-logo'>
                                          <img src="assets/images/logo.png" alt="logo" className="imgLogin"/>
                                      </div>

                                      <div className="homepage-titles">
                                          <h4 className="mt-1 mb-5 pb-1">Login to your account </h4>
                                      </div>
                                  </div>

                                  <form onSubmit={handleSubmit(submit)}>

                                      <div className="formUnit d-flex justify-content-between">
                                          <div className="form-outline col-5 mb-4">
                                              <label className="form-label" htmlFor="form2Example11">Username</label>
                                              <input type="text" id="form2Example11" className="form-control"
                                                     placeholder="User name" {...register("username", {required: true})}/>
                                              {(errors.username?.type) &&
                                                  <div className="alert alert-danger" role="alert">
                                                      username is required
                                                  </div>}
                                          </div>

                                          <div className="form-outline col-5 mb-4">
                                              <label className="form-label" htmlFor="form2Example11">Password</label>
                                              <input type="password" id="form2Example11" className="form-control"
                                                     placeholder="******" {...register("password", {
                                                  required: true,
                                                  minLength: 8
                                              })}/>
                                              {errors.password?.type === "required" &&
                                                  <div className="alert alert-danger" role="alert">
                                                      password is required
                                                  </div>}
                                              {errors.password?.type === "minLength" &&
                                                  <div className="alert alert-danger" role="alert">
                                                      the password must be longer than 8 characters
                                                  </div>}
                                          </div>
                                      </div>


                                      <div className="d-flex justify-content-around pt-1 mb-5 pb-1">
                                          <button
                                              className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                              type="submit">Login
                                          </button>
                                      </div>


                                  </form>

                                  <div className="d-flex align-items-center justify-content-center pb-4">
                                      <p className="mb-0 me-2">Don't have an account?</p>
                                      <Link to='/Signup' className="btn btn-outline-success">Create
                                          new</Link>
                                  </div>

                              </div>

                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <Footer/>
      </div>
  )
}

export default Login;