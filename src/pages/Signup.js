import Footer from "../blocks/frontOffice/Footer";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch,useSelector} from "react-redux";
import {useState} from "react";
import {AdminRegistrationAction} from "../redux/actions/AuthenticationActions";
import {useNavigate} from "react-router";
import RegistrationSuccessModal from "../blocks/frontOffice/modals/RegistrationSuccessModal";

const Signup = () => {

    const {register, handleSubmit, formState:{errors}}= useForm();
    const [matchPwd,setPwd] = useState(true);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const AuthState = useSelector(state=>state.Auth);
    const roles =["ROLE_ADMIN"];
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(()=>{
        localStorage.getItem('authTokens') && navigate('/home');
    },[AuthState.isConnected])

    const submit = async (data)=>{
        var formData = new FormData();
        formData.append("firstname",data.firstname)
        formData.append("lastname",data.lastname);
        formData.append("username",data.username);
        formData.append("email",data.email);
        formData.append("password",data.password);
        formData.append("confirmPwd",data.confirmPwd);
        formData.append("phone",data.phone);
        formData.append("gender",data.gender);
        formData.append("city",data.city);
        formData.append("zipcode",data.zipcode);
        formData.append("fulladress",data.fulladress);
        formData.append("cin",data.cin);
        formData.append("birthdate",data.birthdate);
        roles.forEach((role, index) => {
            formData.append(`roles[${index}]`, role);
        });

        setPwd(data.password===data.confirmPwd);

        console.log(Object.fromEntries(formData))

        try {


            await dispatch(AdminRegistrationAction(formData));
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Registration failed:', error);
        }

        /*dispatch(AdminRegistrationAction(formData))
            .then(()=>{
            setShowSuccessModal(true);
        })
            .catch((error) => {
            // Handle registration error.
            console.error('Registration failed:', error);
        });*/
    }

    /*useEffect(() => {
        if (showSuccessModal) {
            navigate('/login');
        }
    }, [showSuccessModal, navigate]);*/

    const closeModal = () => {
        setShowSuccessModal(false);
    };

  return(
      <div className="signupPage">
          <div className="container mt-5">
              <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-xl-10">
                      <div className="card rounded-3 text-black">
                          <div className="row g-0">

                              <div className="card-body p-md-5 mx-md-4">


                                  <div className="LogoTitle d-flex">
                                      <div className='site-logo'>
                                          <img src="assets/images/logo.png" alt="logo" className="imgLogin"/>
                                      </div>

                                      <div className="homepage-titles creatAccountTitle">
                                          <h4 className="mt-1 mb-5 pb-1">Create an account </h4>
                                      </div>
                                  </div>

                                  {/*modal handeling*/}
                                  <RegistrationSuccessModal
                                      show={showSuccessModal}
                                      onClose={closeModal}
                                  />

                                  <form onSubmit={handleSubmit(submit)}>
                                      <p>Please fill in this form</p>

                                        {/*this shows errors from the backend */}
                                      {AuthState?.error && <div className="alert alert-warning" role="alert">
                                          {AuthState.error.data}
                                      </div>}



                                      <div className="formUnit d-flex justify-content-between">
                                          <div className="form-outline col-5 mb-4">
                                              <label className="form-label" htmlFor="form2Example11">First name :</label>
                                              <input type="text" id="form2Example11" className="form-control"
                                                     placeholder="First name" {...register("firstname", {required: true})}/>
                                              {(errors.firstname?.type) &&
                                                  <div className="alert alert-danger" role="alert">
                                                      first name is required
                                                  </div>}
                                          </div>

                                          <div className="form-outline col-5 mb-4">
                                              <label className="form-label" htmlFor="form2Example11">Last name :</label>
                                              <input type="text" id="form2Example11" className="form-control"
                                                     placeholder="Last name" {...register("lastname", {required: true})}/>
                                              {(errors.lastname?.type) &&
                                                  <div className="alert alert-danger" role="alert">
                                                      last name is required
                                                  </div>}
                                          </div>
                                      </div>


                                      <div className="formUnit d-flex justify-content-between">
                                          <div className="form-outline col-5 mb-4">
                                              <label className="form-label" htmlFor="form2Example11">Username (how your
                                                  account will show) :</label>
                                              <input type="text" id="form2Example11" className="form-control"
                                                     placeholder="User name" {...register("username", {required: true})}/>
                                              {(errors.username?.type) &&
                                                  <div className="alert alert-danger" role="alert">
                                                      username is required
                                                  </div>}
                                          </div>

                                          <div className="form-outline col-5 mb-4">
                                              <label className="form-label" htmlFor="form2Example11">Email :</label>
                                              <input type="text" id="form2Example11" className="form-control"
                                                     placeholder="Email" {...register("email", {
                                                  required: true,
                                                  pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                                              })}/>
                                              {errors.email?.type === "required" &&
                                                  <div className="alert alert-danger" role="alert">
                                                      email is required
                                                  </div>}
                                              {errors.email?.type === "pattern" &&
                                                  <div className="alert alert-danger" role="alert">
                                                      email format is invalid
                                                  </div>}
                                          </div>
                                      </div>


                                      <div className="formUnit d-flex justify-content-between">
                                          <div className="form-outline col-5 mb-4">
                                              <label className="form-label" htmlFor="form2Example11">Password :</label>
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

                                          <div className="form-outline col-5 mb-4">
                                              <label className="form-label" htmlFor="form2Example11">Confirm
                                                  password :</label>
                                              <input type="password" id="form2Example11" className="form-control"
                                                     placeholder="******" {...register("confirmPwd", {required: true,})}/>
                                              {!matchPwd && <div className="alert alert-danger" role="alert">
                                                  the two passwords must match !
                                              </div>}
                                          </div>
                                      </div>



                                      <div className="formUnit d-flex justify-content-between">
                                          <div className="form-outline col-5 mb-4">
                                              <label className="form-label" htmlFor="form2Example11">Phone number</label>
                                              <input  type="number" id="form2Example11" className="form-control"
                                                      placeholder="12345678" {...register("phone", { required: true, minLength: 8, maxLength:8 })}/>
                                              {errors.phone?.type === "required" && <div className="alert alert-danger" role="alert">
                                                  phone number is required
                                              </div>}
                                              {errors.phone?.type === "minLength" && <div className="alert alert-danger" role="alert">
                                                  the phone number must have 8 digits
                                              </div>}
                                              {errors.phone?.type === "maxLength" && <div className="alert alert-danger" role="alert">
                                                  the phone number must have 8 digits
                                              </div>}
                                          </div>

                                          <div className="form-outline col-5 mb-4">
                                              <label className="form-label" htmlFor="form2Example11">Gender :</label>
                                              <select className="form-select" {...register("gender")}>
                                                  <option value="Male">Male</option>
                                                  <option value="Female">Female</option>
                                              </select>

                                          </div>
                                      </div>


                                      <div className="formUnit d-flex justify-content-between">
                                          <div className="form-outline col-5 mb-4">
                                              <label className="form-label" htmlFor="form2Example11">City :</label>
                                              <input type="text" id="form2Example11" className="form-control"
                                                     placeholder="city" {...register("city", {required: true})}/>
                                              {(errors.city?.type) &&
                                                  <div className="alert alert-danger" role="alert">
                                                      city is required
                                                  </div>}
                                          </div>

                                          <div className="form-outline col-5 mb-4">
                                              <label className="form-label" htmlFor="form2Example11">ZipCode :</label>
                                              <input type="number" id="form2Example11" className="form-control"
                                                     placeholder="zipcode" {...register("zipcode", {required: true})}/>
                                              {(errors.zipcode?.type) &&
                                                  <div className="alert alert-danger" role="alert">
                                                      ZipCode is required
                                                  </div>}
                                          </div>
                                      </div>



                                      <div className="formUnit d-flex justify-content-between">

                                          <div className="form-outline col-5 mb-4">
                                              <label className="form-label" htmlFor="form2Example11">Full address :</label>
                                              <input type="text" id="form2Example11" className="form-control"
                                                     placeholder="full address" {...register("fulladress", {required: true})}/>
                                              {(errors.fulladress?.type) &&
                                                  <div className="alert alert-danger" role="alert">
                                                      Full address is required
                                                  </div>}
                                          </div>

                                          <div className="form-outline col-5 mb-4">
                                              <label className="form-label" htmlFor="form2Example11">CIN :</label>
                                              <input type="number" id="form2Example11" className="form-control"
                                                     placeholder="12345678" {...register("cin", {required: true})}/>
                                              {errors.cin?.type === "required" && <div className="alert alert-danger" role="alert">
                                                  CIN is required
                                              </div>}
                                              {errors.cin?.type === "minLength" && <div className="alert alert-danger" role="alert">
                                                  the CIN number must have 8 digits
                                              </div>}
                                              {errors.cin?.type === "maxLength" && <div className="alert alert-danger" role="alert">
                                                  the CIN number must have 8 digits
                                              </div>}
                                          </div>

                                      </div>


                                      <div className="formUnit d-flex justify-content-center mb-5">

                                          <div className="form-outline col-5 mt-5">
                                              <label className="form-label" htmlFor="form3Example90">Birth date</label>
                                              <input type="date" id="form3Example90"
                                                     className="form-control form-control-lg" {...register("birthdate", {required: true})} />
                                              {errors.birthdate?.type &&
                                                  <div className="alert alert-danger" role="alert">
                                                      birth date is required
                                                  </div>}
                                          </div>

                                      </div>


                                      <div className="d-flex justify-content-around pt-1 mb-5 pb-1">
                                          <button
                                              className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                              type="submit">Create account
                                          </button>

                                      </div>

                                      <div className="d-flex align-items-center justify-content-center pb-4">
                                          <div>
                                              <Link to="/login" className="btn btn-outline-success">You have an account?
                                                  Log in here</Link>
                                          </div>

                                      </div>
                                  </form>
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

export default Signup;