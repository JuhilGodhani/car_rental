import React, { useEffect, useState } from "react";
import { Link } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { SuccessToast, ErrorToast } from "../../helper/Toast";
import {
  ref,
  onValue,
  set,
  get,
  update,
  remove,
  child,
} from "firebase/database";
import { v4 } from "uuid";
import { storage } from "../userfirebase/userfirebase";
import { dbs } from "../userfirebase/userfirebase";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "../userfirebase/userfirebase";
import { Select, MenuItem } from "@material-ui/core";
//=======================================================================================
import "../../style/register.css";
import { Row, Col } from "reactstrap";
const data = {
  gender: "",
  firstname: "",
  lastname: "",
  phonenumber: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = (props) => {
  const [userRegidata, setRegidata] = useState(data);
  const [Bookingid, setBookingid] = useState("");
  const navigate = useNavigate();

  // const { signUp } = useUserAuth();

  const handleRegidata = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setRegidata({ ...userRegidata, [name]: value });
  };

  const currentdate = new Date().toLocaleDateString();
  const currenttime = new Date().toLocaleTimeString();

  const getAllData = () => {
    return {
      id: Bookingid,
      data: {
        firstname: userRegidata.firstname,
        lastname: userRegidata.lastname,
        email: userRegidata.email,
        userimg:
          "https://firebasestorage.googleapis.com/v0/b/car-rent-website-7fa0c.appspot.com/o/images%2F240_F_150404044_dXI2utvn6Y6PivTbWk9lbIDR0UhM4A5Y-removebg-preview.png2367790c-2791-48e7-bac5-283f1af18b5d?alt=media&token=b035e2a9-204b-4556-a05a-1ed3565e1a21",
        phonenumber: userRegidata.phonenumber,
        password: userRegidata.password,
        gender: userRegidata.gender,
        confirmPassword: userRegidata.confirmPassword,
        date: currentdate,
        time: currenttime,
      },
    };
  };

  // connect with firebase
  const handleSignUp = async (event) => {
    event.preventDefault();
    const {
      gender,
      firstname,
      lastname,
      phonenumber,
      email,
      password,
      confirmPassword,
    } = userRegidata;
    const currentdate = new Date().toLocaleDateString();
    const currenttime = new Date().toLocaleTimeString();

    // const res = await fetch(
    //   "https://car-rent-website-7fa0c-default-rtdb.firebaseio.com/UserRegisterData.json",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       gender,
    //       firstname,
    //       lastname,
    //       phonenumber,
    //       email,
    //       password,
    //       confirmPassword,
    //       currentdate,
    //       currenttime,
    //     }),
    //   }
    // );
    //=============================
    // if (res) {
    //=========================
    // setRegidata(data);

    //==========================================================================

    //================================================================================================

    const registerWithEmailAndPassword = async (email, password) => {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        const dbref = ref(dbs);
        const record = getAllData();

        const address = "UserRegisterData/" + record.id;

        get(child(dbref, address)).then((snapshot) => {
          if (snapshot.exists()) {
            ErrorToast("Please enter all details...");
          } else {
            //   setContact(data);
            set(ref(dbs, address), record.data);
            //   SuccessToast("Thank you for your response 😄");
            SuccessToast("You Registered Successfully");
          }
        });

        await addDoc(collection(db, "users"), {
          uid: user.uid,
          authProvider: "local",
          email,
          password,
        });
        //========================================

        //======================================
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            // toast.error(error.message);
            ErrorToast(error?.message);
            break;
          case "auth/invalid-email":
            ErrorToast(error?.message);
            break;
          case "auth/week-password":
            ErrorToast(error?.message);
            break;
        }
      }
    };
    registerWithEmailAndPassword(
      // userRegidata.username,
      userRegidata.email,
      userRegidata.password
    );
    // SuccessToast("your form submited Successfully");
    // toast.success("your form submited Successfully");
    // alert("your form submited Successfully 😄");
    navigate("/login");

    // }
    //==================================================================================================

    //===================================================================

    // let userRedataofls = {
    //   username: userRegidata.username,
    //   email: userRegidata.email,
    //   password: userRegidata.password,
    // };
    // localStorage.setItem("userRegisterData", JSON.stringify(userRedataofls));
    // navigate('/login')
  };

  //==================================================================

  useEffect(() => {
    const dbRef = ref(dbs, "UserRegisterData");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      setBookingid(records.length + 1);
    });
    // setValue(localStorage.getItem("email"));
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== userRegidata.password) {
        return false;
      }
      return true;
    });
    return () => {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    };
  }, [userRegidata.password]);

  const gender = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
    {
      value: "other",
      label: "Other",
    },
  ];
  //=======================================================================================

  return (
    <div className="form_container box1">
      <div className="form box">
        {/* {error && <ToastContainer variant="danger">{error}</ToastContainer>} */}
        <h1 className="d-flex justify-content-center ">Registration</h1>
        <ValidatorForm onSubmit={handleSignUp}>
          <Row>
            <Col md={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="First name"
                onChange={handleRegidata}
                name="firstname"
                value={userRegidata.firstname}
                validators={["required"]}
                errorMessages={["This field is required"]}
                autoComplete="off"
              />
            </Col>
            <Col md={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Last name"
                onChange={handleRegidata}
                name="lastname"
                value={userRegidata.lastname}
                validators={["required"]}
                errorMessages={["This field is required"]}
                autoComplete="off"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Phone number"
                onChange={handleRegidata}
                type="number"
                name="phonenumber"
                value={userRegidata.phonenumber}
                validators={["required"]}
                errorMessages={["This field is required"]}
                autoComplete="off"
              />
            </Col>
            <Col md={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userRegidata.gender}
                label="Gender"
                name="gender"
                onChange={handleRegidata}
                validators={["required"]}
                errorMessages={["This field is required"]}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextValidator>
            </Col>
          </Row>
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            onChange={handleRegidata}
            name="email"
            value={userRegidata.email}
            validators={["required", "isEmail"]}
            errorMessages={["This field is required", "email is not valid"]}
            autoComplete="off"
          />
          <br />
          <TextValidator
            variant="outlined"
            fullWidth
            label="Password"
            onChange={handleRegidata}
            name="password"
            type="password"
            value={userRegidata.password}
            validators={["required"]}
            errorMessages={["This field is required"]}
            autoComplete="off"
          />
          <br />
          <TextValidator
            variant="outlined"
            label="Confirm password"
            fullWidth
            onChange={handleRegidata}
            name="confirmPassword"
            type="password"
            validators={["isPasswordMatch", "required"]}
            errorMessages={["Password mismatch", "This field is required"]}
            value={userRegidata.confirmPassword}
            autoComplete="off"
          />
          <Row className="mb-2">
            <Col md={3}>
              <button
                type="submit"
                variant="contained"
                className="button"
                // onClick={register}
              >
                Register
              </button>
            </Col>
          </Row>
          <Link
            onClick={() => navigate(`/login`)}
            className="signinlink"
            variant="body2"
          >
            Already have an account? Login
          </Link>
        </ValidatorForm>
      </div>
    </div>
  );
};

export default Register;
