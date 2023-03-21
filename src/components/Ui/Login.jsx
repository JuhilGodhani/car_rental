import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/login.css";
import { Row, Col, FormGroup } from "reactstrap";
import { FormControlLabel, Checkbox, Link } from "@material-ui/core";
import { useUserAuth } from "../context/UserAuthContext";
import { SuccessToast, ErrorToast } from "../../helper/Toast";
import GoogleButton from "react-google-button";
import {
  ref,
  onValue,
  set,
  get,
  update,
  remove,
  child,
} from "firebase/database";
import { dbs } from "../userfirebase/userfirebase";
import { ToastContainer, toast } from "react-toastify";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { async } from "@firebase/util";

const data = {
  // username: "",
  email: "",
  password: "",
};

const Login = () => {
  // ===================================================================================
  const userdata = JSON.parse(localStorage.getItem("userLoginDatas"));
  const [userLogindata, setLogindata] = useState(data);
  const [rememberme, setRememberMe] = useState(false);
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleLogindata = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setLogindata({ ...userLogindata, [name]: value });
  };

  const handleCheck = (event) => {
    setRememberMe(event.target.checked);
  };
  const currentdate = new Date().toLocaleDateString();
  const currenttime = new Date().toLocaleTimeString();

  const getAllData = () => {
    return {
      id: currenttime,
      data: {
        // username: userLogindata.username,
        email: userLogindata.email,
        password: userLogindata.password,
        date: currentdate,
        time: currenttime,
      },
    };
  };

  const handlerLogin = async (e) => {
    localStorage.setItem("lgtype", "Logout");
    e.preventDefault();
    const { username, email, password } = userLogindata;
    // const currentdate = new Date().toLocaleDateString();
    // const currenttime = new Date().toLocaleTimeString();

    try {
      await logIn(userLogindata.email, userLogindata.password);

      navigate("/home");
      let userLogin = {
        // username: userLogindata.username,
        email: userLogindata.email,
        password: userLogindata.password,
      };
      localStorage.setItem("userLoginDatas", JSON.stringify(userLogin));
      // SuccessToast(result?.message);
      //===========================================================================================

      const dbref = ref(dbs);
      const record = getAllData();
      // console.log("record------", record);

      const address = "UserLoginData/" + record.id;
      // console.log("yourName----", userLogindata.username);
      // console.log("UserLoginData----", address);

      get(child(dbref, address)).then((snapshot) => {
        if (snapshot.exists()) {
          ErrorToast("Please enter all details...");
        } else {
          //   setContact(data);
          set(ref(dbs, address), record.data);
          //   SuccessToast("Thank you for your response 😄");
        }
      });

      //================================================================================
      // await fetch(
      //   "https://car-rent-website-7fa0c-default-rtdb.firebaseio.com/UserLoginData.json",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       username,
      //       email,
      //       password,
      //       currentdate,
      //       currenttime,
      //     }),
      //   }
      // );
      window.location.reload();
    } catch (error) {
      // setLogindata(data);
      // toast.error(error.message);
      ErrorToast(error?.message);
    }
    //===============================================================================================
    // window.location.reload();
    SuccessToast("Logged In Successfully");
  };
  // useEffect(() => {
  //   if (userdata.username !== " ") {
  //     // navigate("./contact");
  //   }
  // });
  //==================================================================================

  const handlegooglesignin = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      // setLogindata(data);
      // toast.error(error.message);
      ErrorToast(error?.message);
    }
  };

  return (
    <div className="form_container box1">
      <div className="form box">
        {/* <ToastContainer /> */}
        <h1 className="d-flex justify-content-center ">Login</h1>
        <ValidatorForm
          onSubmit={handlerLogin}
          onError={(errors) => {
            for (const err of errors) {
              console.log(err.props.errorMessages[0]);
            }
          }}
        >
          {/* <Row>
            <Col md={12}>
              <FormGroup>
                <TextValidator
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="username"
                  label="User name"
                  onChange={handleLogindata}
                  value={userLogindata.username}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  autoComplete="off"
                />
              </FormGroup>
            </Col>
          </Row> */}

          <Row>
            <Col md={12}>
              <FormGroup>
                <TextValidator
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  onChange={handleLogindata}
                  value={userLogindata.email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "This field is required",
                    "Email is not valid",
                  ]}
                  autoComplete="off"
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <FormGroup>
                <TextValidator
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  onChange={handleLogindata}
                  value={userLogindata.password}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  autoComplete="off"
                />
              </FormGroup>
            </Col>
          </Row>
          <FormControlLabel
            control={
              <Checkbox
                value={rememberme}
                onChange={(e) => handleCheck(e)}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Row className="mb-2">
            <Col md={3}>
              <button
                variant="contained"
                className="login_button mt-3"
                type="Submit"
              >
                Login
              </button>
            </Col>
          </Row>
          <hr />
          <Row
            className="mb-2"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <GoogleButton className="googlebtn" onClick={handlegooglesignin} />
          </Row>
          <Link
            onClick={() => navigate(`/register`)}
            className="signinlink"
            variant="body2"
          >
            Don't have an account? Sign Up
          </Link>
        </ValidatorForm>
      </div>
    </div>
  );
};

export default Login;
