/**
 * Signin Firebase
 */
import Axios from "axios";

import React, { useEffect, useState, useContext, createContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Applogo } from "../Entryfile/imagepath.jsx";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { alphaNumericPattern, emailrgx } from "../constant";
import { useHistory } from "react-router-dom";
const schema = yup.object({
  email: yup
    .string()
    .matches(emailrgx, "Email is required")
    .required("Email is required")
    .trim(),
  password: yup.string().min(8).max(26).required("Password is required").trim(),
});

const Loginpage = (props) => {
  const [eye, seteye] = useState(true);
  const [emailerror, setEmailError] = useState("");
  const [nameerror, setNameError] = useState("");
  const [passworderror, setPasswordError] = useState("");
  const [formgroup, setFormGroup] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // const { message } = useParams();

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("data of my login page", data);

    if (data.password != "123456") {
      setError("password", {
        message: "password is mismatch",
      });
    } else {
      clearErrors("password");
      props.history.push("/app/main/dashboard");
    }
  };

  const roleBaseRedirect = (res) => {
    if (res.data.userRole[0].name == "Admin" || res.data.userRole[0].name == "Super Admin" ) {
      history.push("/app/main/dashboard");
    } else if (res.data.userRole[0].name == "Employee") {
      history.push("/app/main/employee-dashboard");
    } else if (res.data.userRole[0].name == "File Collector") {
      history.push("/app/main/collector-dashboard");
    } else if (res.data.userRole[0].name == "Accounts") {
      history.push("/app/main/accounts-dashboard");
    } else if (res.data.userRole[0].name == "Cashier") {
      history.push("/app/main/cashier-dashboard");
    }else if (res.data.userRole[0].name == "colonel") {
      history.push("/app/main/colonel-dashboard");
    }else if (res.data.userRole[0].name == "Partner") {
      history.push("/app/main/partner-dashboard");
    }else if (res.data.userRole[0].slug == "accountTransaction") {
      history.push("/app/main/account-dashboard");
    }
    else {
      history.push("/app/administrator/jobs-dashboard");
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const formData = { email, password };

    setLoading(true);

    if (!email) {
      setEmailError("Email is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }

    if (email && password) {
      Axios.post(process.env.REACT_APP_API_URL + "/api/user/login", formData)
        .then((response) => {
          //set token to local storage
          // set token to axios header
          // localStorage.setItem("user", JSON.stringify(res.data.user));
          let menus = []
          if(response.data.menus.length > 0){
            response.data.menus.map((item)=>{
              if(item?.Menus){
                menus.push(item.Menus)
              }
            })
          }
          localStorage.setItem('menu', JSON.stringify(menus))

          if (response.data.user.roles.status === true || response.data.user.roles.status === "active") {
            localStorage.setItem("jwt-token", response.data.token);
            // localStorage.setItem("role", response.data.user.roles.name);
            Axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.token;
            history.push("/app/main/dashboard");
            Axios.get(
              process.env.REACT_APP_API_URL +
                `/api/user/userRole/id/list?id=${response.data.user.role}`
            ).then((res) => {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...response.data.user,
                  role: res.data.userRole[0].name,
                })
              );
              roleBaseRedirect(res);
            });
          }
          // console.log(
          //   "ZZZZZZZZZZZZZZZZZZZZZZZZZZ",
          //   Axios.defaults.headers.common["Authorization"]
          // );
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            setFormError(error.response.data.message);
          } else {
            setFormError(error.message);
          }

          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const onEyeClick = () => {
    seteye(!eye);
  };

  useEffect(() => {
    if (email) {
      setEmailError("");
    }
    if (password) {
      setPasswordError("");
    }
  }, [email, password]);
  return (
    <>
      <Helmet>
        <title>Login - Sheranwala Developers</title>
        <meta name="description" content="Login page" />
      </Helmet>

      <div className="account-content">
        <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">
          Apply Job
        </Link>
        <div className="container">
          {/* Account Logo */}
          <div className="account-logo">
            <Link to="/app/main/dashboard">
              <img src={Applogo} alt="Dreamguy's Technologies" />
            </Link>
          </div>
          {/* /Account Logo */}
          <div className="account-box">
            <div className="account-wrapper">
              {formError && (
                <div className="alert alert-danger">{formError}</div>
              )}
              <h3 className="account-title">Login</h3>
              <p className="account-subtitle">Access to our dashboard</p>
              {/* <p className="account-subtitle">{message}</p> */}
              {/* Account Form */}

              <div>
                <form
                // onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-group">
                    <label>Email Address</label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <>
                          <input
                            className={`form-control  ${
                              errors?.email ? "error-input" : ""
                            }`}
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="false"
                          />

                          <small>{emailerror && emailerror}</small>
                        </>
                      )}
                    />
                    <small>{errors?.email?.message}</small>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label>Password</label>
                      </div>
                      <div className="col-auto">
                        <Link className="text-muted" to="/forgotpassword">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <div className="pass-group">
                          <input
                            type={eye ? "password" : "text"}
                            className={`form-control  ${
                              errors?.password ? "error-input" : ""
                            }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="false"
                          />
                          <span
                            onClick={onEyeClick}
                            className={`fa toggle-password" ${
                              eye ? "fa-eye-slash" : "fa-eye"
                            }`}
                          />
                          {/* <small>{passworderror && passworderror}</small> */}
                        </div>
                      )}
                    />
                    <small>{errors?.password?.message}</small>
                  </div>
                  <div className="form-group text-center">
                    <button
                      className="btn btn-primary account-btn"
                      type="submit"
                      onClick={submit}
                      disabled={loading}
                    >
                      Login
                    </button>
                  </div>
                </form>
                {/* <div className="account-footer">
                  <p>
                    Don't have an account yet?{" "}
                    <Link to="/register">Register</Link>
                  </p>
                </div> */}
              </div>
              {/* /Account Form */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
