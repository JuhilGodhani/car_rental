import React from "react";
import { useState, useEffect } from "react";
import "../../style/booking-form.css";
import { Form, FormGroup, Input, ModalFooter } from "reactstrap";
import "../../style/payment-method.css";
import masterCard from "../../assests/all-images/master-card.jpg";
import paypal from "../../assests/all-images/paypal.jpg";
import { Container, Row, Col } from "reactstrap";
import { FormControlLabel, Checkbox, Link, TextField } from "@material-ui/core";
import validator from "validator";
import { async } from "@firebase/util";
import { ErrorToast, SuccessToast } from "../../helper/Toast";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import FormHelperText from "@mui/material/FormHelperText";
// import { Field} from '@material-ui/core'

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
import { useNavigate } from "react-router";
import Review from "../review/Review";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { v4 as uuidv4 } from "uuid";
import shortid from "shortid";
import { BsCurrencyRupee } from "react-icons/bs";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "black",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const BookingForm = () => {
  const JourneyDetails = JSON.parse(localStorage.getItem("Journey-Details"));
  console.log("JourneyDetails :>> ", JourneyDetails);

  const data = {
    firstname: JourneyDetails?.firstname || "",
    lastname: JourneyDetails?.lastname || "",
    phonenumber: JourneyDetails?.phonenumber || "",
    deliverylocation: JourneyDetails?.deliverylocation || "",
    pickuplocation: JourneyDetails?.pickuplocation || "",
    deliverydate: JourneyDetails?.deliverylocation || "",
    journeytime: JourneyDetails?.journeytime || "",
    returndate: JourneyDetails?.returndate || "",
    msg: JourneyDetails?.msg || "",
  };
  const [userBookingdata, setBookingdata] = useState(data);
  // console.log("userBookingData :>> ", userBookingdata);
  const [emailError, setEmailError] = useState(data);
  // const [radioValue, setRadioValue] = useState("Bank Transfer");
  const [opencheckbox, setopenCheckbox] = useState(false);
  const [checkboxclick, setCheckboxclick] = useState("Unchecked");
  const [modal, setModal] = useState(false);
  const [Cardata, setCardata] = useState([]);
  const [error, setError] = useState({});
  const [UserEmail, setUserEmail] = useState("");
  const [Random, setRandom] = useState(null);

  const [success, setSuccess] = useState(false);
  const [openpyment, setopenpyment] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const postBookingData = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setBookingdata({ ...userBookingdata, [name]: value });

    // console.log("userBookingdata", userBookingdata);
  };
  // console.log("userBookingdata", userBookingdata);
  const validate = (values) => {
    const err = {};
    console.log("csdfV", values);
    if (!values.firstname) {
      err.firstname = "Firstname required!";
    }
    if (!values.lastname) {
      err.lastname = "Lastname required!";
    }
    // if (!values.email) {
    //   err.email = "Email address required!";
    // }
    if (!values.phonenumber) {
      err.phonenumber = "Phone number required!";
    }
    if (!values.deliverylocation) {
      err.deliverylocation = "Delivery location required!";
    }
    // if (values.deliverylocation === JourneyDetails?.deliverylocation) {
    //   err.deliverylocation = "";
    //   // return true;
    // }
    if (!values.pickuplocation) {
      err.pickuplocation = "Pickup location required!";
    }

    if (!values.deliverydate) {
      err.deliverydate = "Date required!";
    }
    if (!values.returndate) {
      err.returndate = "Date required!";
    }

    // if (!values.journeytime) {
    //   err.journeytime = "Time required!";
    // }

    if (!values.msg) {
      err.msg = "Details required!";
    }

    setError(err);
    console.log("err", err);
    if (Object.keys(err).length === 0) {
      return false;
    } else {
      return true;
    }
  };
  // const validate1 = (values) => {
  //   const err = {};
  //   if (values.deliverydate) {
  //     err.deliverydate = "";
  //   }
  //   if (values.deliverylocation) {
  //     err.deliverylocation = "";
  //   }
  //   if (values.pickuplocation) {
  //     err.pickuplocation = "";
  //   }
  //   if (values.journeytime) {
  //     err.journeytime = "";
  //   }
  //   setError(err);
  //   console.log("errerttsdfg", values);
  //   if (Object.keys(err).length === 0) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  const currentdate = new Date().toLocaleDateString();
  const currenttime = new Date().toLocaleTimeString();
  const loginLSData = JSON.parse(localStorage.getItem("userLoginDatas"));
  const caridname = JSON.parse(localStorage.getItem("cardetails"));

  useEffect(() => {
    const dbRef = ref(dbs, "UserLoginData");
    onValue(dbRef, async (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      const logindataFilter = await records.filter((row) => {
        // console.log("1111");
        return row.data.email === loginLSData?.email;
      });
      // console.log("susi", logindataFilter[0]?.data.email);
      setUserEmail(logindataFilter[0]?.data);
    });
    //========================================================

    // setBookingdata(userBookingdata1);
    // console.log("dsfg", userBookingdata1);

    const dbRef1 = ref(dbs, "cardata");
    onValue(dbRef1, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      let data = records.filter((row) => {
        if (row.key === caridname?.key) {
          return row;
        }
      });
      setCardata(data[0]);
      console.log("Cardata :>> ", data[0]);
      //   console.log("Cardata45 :>> ", data);
      //   console.log("caraname", location.state.props.item.key);
      // singleCaritem1();
    });
  }, []);

  const navigate = useNavigate();

  // const getAllData = () => {
  //   return {
  //     id: currenttime,
  //     data: {
  //       firstname: userBookingdata.firstname,
  //       lastname: userBookingdata.lastname,
  //       email: UserEmail.email,
  //       phonenumber: userBookingdata.phonenumber,
  //       deliverylocation: userBookingdata.deliverylocation,
  //       pickuplocation: userBookingdata.pickuplocation,
  //       deliverydate: userBookingdata.deliverydate,
  //       journeytime: userBookingdata.journeytime,
  //       msg: userBookingdata.msg,
  //       radioValue: radioValue,
  //       checkboxclick: checkboxclick,
  //       date: currentdate,
  //       time: currenttime,
  //     },
  //   };
  // };

  // const submitHandler = async (event) => {
  //   setopenCheckbox(true);
  //   event.preventDefault();
  //   if (validate(userBookingdata)) {
  //     if (checkboxclick === "Unchecked") {
  //       ErrorToast("Accept privacy policy!!!");
  //       return;
  //     }
  //     return;
  //   }
  //   console.log("first");
  //   // if (!validator.isEmail(email)) {
  //   //   ErrorToast("Please enter Valid email.....");
  //   //   return;
  //   // }
  //   const {
  //     firstname,
  //     lastname,
  //     email,
  //     phonenumber,
  //     deliverylocation,
  //     pickuplocation,
  //     deliverydate,
  //     journeytime,
  //     msg,
  //   } = userBookingdata;
  //   const currentdate = new Date().toLocaleDateString();
  //   const currenttime = new Date().toLocaleTimeString();

  //   const dbref = ref(dbs);
  //   const record = getAllData();
  //   // console.log("record------", record);
  //   const address = "BookingData/" + record.id;
  //   // console.log("yourName----", userContact.yourName);
  //   get(child(dbref, address)).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       ErrorToast("Please enter all details...");
  //     } else {
  //       // setContact(data);
  //       set(ref(dbs, address), record.data);
  //       // SuccessToast("Thank you for your response 😄");
  //       setBookingdata(data);
  //       setCheckboxclick("Unchecked");
  //       SuccessToast("Booking Done Successfully 👍");
  //       setopenCheckbox(false);
  //       setEmailError("");
  //     }
  //   });

  //   //==============================================================

  //   // if (
  //   //   firstname &&
  //   //   lastname &&
  //   //   phonenumber &&
  //   //   validator.isEmail(email) &&
  //   //   deliverylocation &&
  //   //   pickuplocation &&
  //   //   date &&
  //   //   time &&
  //   //   msg &&
  //   //   checkboxclick
  //   // ) {
  //   //   const res = await fetch(
  //   //     "https://car-rent-website-7fa0c-default-rtdb.firebaseio.com/BookingData.json",
  //   //     {
  //   //       method: "POST",
  //   //       headers: {
  //   //         "Content-Type": "application/json",
  //   //       },
  //   //       body: JSON.stringify({
  //   //         firstname,
  //   //         lastname,
  //   //         email,
  //   //         phonenumber,
  //   //         deliverylocation,
  //   //         pickuplocation,
  //   //         date,
  //   //         time,
  //   //         msg,
  //   //         currentdate,
  //   //         currenttime,
  //   //         radioValue,
  //   //         checkboxclick,
  //   //       }),
  //   //     }
  //   //   );
  //   //   if (res) {
  //   // setBookingdata(data);
  //   // setCheckboxclick("Unchecked");
  //   // SuccessToast("Booking Done Successfully 👍");
  //   // setopenCheckbox(false);
  //   // setEmailError("");
  //   //   } else {
  //   //   }
  //   // } else {
  //   //   ErrorToast("Please fill all field !!");
  //   // }

  //   //==============================================================
  //   // console.log("click");
  // };

  const submitHandler1 = async (event) => {
    // setopenCheckbox(true);
    const phoneNumberInput = document.getElementById("phone-number");
    phoneNumberInput.addEventListener("input", () => {
      const phoneNumber = phoneNumberInput.value;
      if (phoneNumber.length < 10) {
        phoneNumberInput.setCustomValidity("Please enter a valid phone number with at least 10 digits.");
      } else {
        phoneNumberInput.setCustomValidity("");
      }
    });
    event.preventDefault();
    if (validate(userBookingdata)) {
      return;
    }
    // if (vali(JourneyDetails)) {
    //   return;
    // }

    // if (userBookingdata.deliverylocation === JourneyDetails?.deliverylocation) {
    //   // err.deliverylocation = "";
    //   return true;
    // }

    if (checkboxclick === "Unchecked") {
      ErrorToast("Accept privacy policy!!!");
      return;
    }

    // setRandom(random)
    const shortId = shortid.generate();
    const random = Math.floor(Math.random() * 100000) + 1;
    // setRandom(random);
    localStorage.setItem("randomnumber", random);
    console.log("shortId :>> ", shortId);
    console.log("random :>> ", random);
    const randomId = uuidv4();
    console.log("randomID :>> ", randomId);

    const Random = localStorage.getItem("randomnumber");
    setRandom(Random);

    localStorage.setItem(
      "userBookingdata",
      JSON.stringify({
        firstname: userBookingdata?.firstname,
        lastname: userBookingdata?.lastname,
        email: UserEmail?.email,
        phonenumber: userBookingdata?.phonenumber,
        deliverylocation:
          userBookingdata?.deliverylocation || JourneyDetails?.deliverylocation,
        pickuplocation:
          userBookingdata?.pickuplocation || JourneyDetails?.pickuplocation,
        deliverydate:
          userBookingdata?.deliverydate || JourneyDetails?.deliverydate,
        returndate: userBookingdata?.returndate || JourneyDetails?.returndate,
        // journeytime:
        //   userBookingdata?.journeytime || JourneyDetails?.journeytime,
        msg: userBookingdata?.msg,
        // radioValue: radioValue,
        checkboxclick: checkboxclick,
        totalprice: calculate,
        orderno: "#B" + Random,
      })
    );
    setopenpyment(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    // Swal.fire({
    //   title: "Payment Done!",
    //   text: `you order no is #B${random}`,
    //   icon: "success",
    //   button: "Ok",
    // }).then(() => {
    //   navigate("/conformpage");
    // });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log(" payment successful ");
          setSuccess(true);
        }
      } catch (err) {
        console.log("error :>> ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  // const paymentsuccessful = () => {
  //   Swal.fire({
  //     title: "Payment Done!",
  //     text: `you order no is #B${random}`,
  //     icon: "success",
  //     button: "Ok",
  //   }).then(() => {
  //     navigate("/conformpage");
  //   });
  // };

  const date1 = new Date(userBookingdata?.deliverydate); // First date
  const date2 = new Date(userBookingdata?.returndate);
  const diffTime = Math.abs(date2 - date1); // Difference in milliseconds
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days
  // const price = Cardata?.data?.price;
  console.log("typeof(diffDays) :>> ", typeof diffDays);
  const calculate = diffDays * Cardata?.data?.price;
  // const totalprice = calculate.filter((num) => {
  //   if (num !== NaN) {
  //     return num;
  //   }
  // });
  // const nan = "NaN";
  // ================ date velidetion ========================//
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextDayISO = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    // console.log("calculate :>> ", totalprice);
    // const Random = localStorage.getItem("randomnumber");
    // setRandom(Random);
    const userBookingdata1 = JSON.parse(
      localStorage.getItem("userBookingdata")
    );
    setBookingdata({
      firstname: userBookingdata1?.firstname,
      lastname: userBookingdata1?.lastname,
      phonenumber: userBookingdata1?.phonenumber,
      deliverylocation:
        JourneyDetails?.deliverylocation || userBookingdata1?.deliverylocation,
      pickuplocation:
        JourneyDetails?.pickuplocation || userBookingdata1?.pickuplocation,
      deliverydate:
        JourneyDetails?.deliverydate || userBookingdata1?.deliverydate,
      returndate: JourneyDetails?.returndate || userBookingdata1?.returndate,
      msg: userBookingdata1?.msg,
    });
  }, []);

  // console.log("first", userBookingdata);
  return (
    <>
      {!success ? (
        <>
          <Form method="POST" onSubmit={submitHandler1}>
            <Row>
              <Col lg="7" className="mt-5">
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="text"
                        placeholder="First Name"
                        name="firstname"
                        onChange={postBookingData}
                        value={userBookingdata?.firstname}
                      // required
                      ></Input>
                      {error?.firstname && (
                        <span className="text-danger pe-2">
                          {error["firstname"]}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="text"
                        name="lastname"
                        onChange={postBookingData}
                        value={userBookingdata?.lastname}
                        placeholder="Last Name"
                      // required
                      />
                      {error?.lastname && (
                        <span className="text-danger pe-2">
                          {error["lastname"]}
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col lg="6">
                    <div className="emailbox">{UserEmail?.email}</div>
                    {/* <FormGroup>
                <Input
                  type="email"
                  name="email"
                  onChange={postBookingData}
                  value={UserEmail.email}
                  placeholder="Email"
                  // required
                />
                {error?.email && (
                  <span className="text-danger pe-2">{error["email"]}</span>
                )}
              </FormGroup> */}
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="text"
                        name="phonenumber"
                        id="phone-number"
                        maxLength="10"
                        pattern="\d{10}"
                        
                        onChange={postBookingData}
                        value={userBookingdata?.phonenumber}
                        placeholder="Phone Number"
                      // required
                      />
                      {error?.phonenumber && (
                        <span className="text-danger pe-2">
                          {error["phonenumber"]}
                        </span>
                      )}
                    </FormGroup>
                    {/* <input type="text" maxlength="10" pattern="\d{10}" title="Please enter exactly 10 digits" /> */}

                  </Col>
                     

                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="text"
                        name="deliverylocation"
                        onChange={postBookingData}
                        value={
                          userBookingdata?.deliverylocation ||
                          JourneyDetails?.deliverylocation
                        }
                        placeholder="Starting Location"
                      // required
                      />
                      {error?.deliverylocation && (
                        <span className="text-danger pe-2">
                          {error["deliverylocation"]}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="text"
                        name="pickuplocation"
                        onChange={postBookingData}
                        value={
                          userBookingdata?.pickuplocation ||
                          JourneyDetails?.pickuplocation
                        }
                        placeholder="Ending Location"
                      // required
                      />
                      {error?.pickuplocation && (
                        <span className="text-danger pe-2">
                          {error["pickuplocation"]}
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col lg="6">
                    <FormGroup>
                      <Input
                        id="date-1"
                        type="date"
                        name="deliverydate"
                        min={new Date().toISOString().split("T")[0]}
                        onChange={postBookingData}
                        value={
                          userBookingdata?.deliverydate ||
                          JourneyDetails?.deliverydate
                        }
                        // value="2012-03-23"
                        placeholder="journey date"
                        // required
                        className="t2"
                      />
                      {error?.deliverydate && (
                        <span className="text-danger pe-2">
                          {error["deliverydate"]}
                        </span>
                      )}
                      <FormHelperText className="formhelpertxt">
                        Departure Date
                      </FormHelperText>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      {/* <Input
                    type="time"
                    name="journeytime"
                    onChange={postBookingData}
                    value={
                      userBookingdata?.journeytime ||
                      JourneyDetails?.journeytime
                    }
                    placeholder="journey time"
                    // required
                    className="time_picker"
                  />
                  {error?.journeytime && (
                    <span className="text-danger pe-2">
                      {error["journeytime"]}
                    </span>
                  )} */}
                      <Input
                        min={nextDayISO}
                        id="date-1"
                        type="date"
                        name="returndate"
                        onChange={postBookingData}
                        value={
                          userBookingdata?.returndate ||
                          JourneyDetails?.returndate
                        }
                        placeholder="journey date"
                        className="t2"
                      />
                      {error?.deliverydate && (
                        <span className="text-danger pe-2">
                          {error["returndate"]}
                        </span>
                      )}
                      <FormHelperText className="formhelpertxt">
                        Return Date
                      </FormHelperText>
                    </FormGroup>
                  </Col>

                  <Col lg="12">
                    <FormGroup>
                      <Input
                        rows={5}
                        type="textarea"
                        className="textarea"
                        name="msg"
                        onChange={postBookingData}
                        value={
                          userBookingdata?.msg.length > 50
                            ? userBookingdata?.msg.substring(0, 50)
                            : userBookingdata?.msg
                        }
                        // required
                        placeholder="Other Details"
                      ></Input>
                      {error?.msg && (
                        <span className="text-danger pe-2">{error["msg"]}</span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              {/* <Col lg="5">
            <div className="payment_info mt-5">
              <h5 className="mb-4 fw-bold">payment Information</h5>
              <div className="payment">
                <label htmlFor="" className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={radioValue === "Bank Transfer"}
                    onClick={() => setRadioValue("Bank Transfer")}
                  />
                  Direct Bank Transfer
                </label>
              </div>

              <div className="payment mt-3">
              <label htmlFor="" className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  checked={radioValue === "Cheque"}
                  onClick={() => setRadioValue("Cheque")}
                />
                Cheque Payment
              </label>
            </div>

              <div className="payment mt-3 d-flex align-items-center justify-content-between">
                <label htmlFor="" className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={radioValue === "Master Card"}
                    onClick={() => setRadioValue("Master Card")}
                  />
                  Master Card
                </label>
                <img src={masterCard} alt="" />
              </div>

              <div className="payment mt-3 d-flex align-items-center justify-content-between">
                <label htmlFor="" className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={radioValue === "PayPal"}
                    onClick={() => setRadioValue("PayPal")}
                  />
                  PayPal
                </label>
                <img src={paypal} alt="" />
              </div>
              <div className="privet">
                {opencheckbox && (
                  <div>
                    <label className="policy">
                      <input
                        className="checkbox"
                        type="Checkbox"
                        checked={checkboxclick === "Checked"}
                        onClick={() => {
                          if (checkboxclick === "Checked") {
                            setCheckboxclick("Unchecked");
                          } else {
                            setCheckboxclick("Checked");
                          }
                        }}
                      />
                      At Rent Car Service we are committed to protecting your
                      privacy and ensuring the security of your personal
                      information. This Privacy Policy outlines the types of
                      personal information we collect, how we use it, and how we
                      keep it safe.
                    </label>
                    <botton
                      className="readmore"
                      onClick={() => {
                        setModal(true);
                      }}
                    >
                      Read More..
                    </botton>
                  </div>
                )}
              </div>
              <div className="payment text-end mt-2">
                <button type="submit">Reserve Now</button>
              </div>
            </div>
          </Col> */}
              {/* payment details */}

              <Col lg="5">
                <div className="privet">
                  {/* {opencheckbox && ( */}
                  <div>
                    <label className="policy">
                      <input
                        className="checkbox mt-5"
                        type="Checkbox"
                        checked={checkboxclick === "Checked"}
                        onClick={() => {
                          if (checkboxclick === "Checked") {
                            setCheckboxclick("Unchecked");
                          } else {
                            setCheckboxclick("Checked");
                          }
                        }}
                      />
                      At Rent Car Service we are committed to protecting your
                      privacy and ensuring the security of your personal
                      information. This Privacy Policy outlines the types of
                      personal information we collect, how we use it, and how we
                      keep it safe.
                    </label>
                    <botton
                      className="readmore"
                      onClick={() => {
                        setModal(true);
                      }}
                    >
                      Read More..
                    </botton>
                  </div>
                  {/* )} */}
                </div>
                <br />

                <div>
                  <div className="payment_info mt-5">
                    {/* payapl payment method  */}
                    {openpyment === true ? (
                      <>
                        <h5 className="mb-4 fw-bold">payment Information</h5>
                        {/* <CardElement options={CARD_OPTIONS}></CardElement>
                  <br /> */}
                        <div className="payment text-end mt-2">
                          <PayPalScriptProvider
                            options={{
                              "client-id":
                                "AcTK9-TxMAQd1vQwGWeMz8gzFqtZhmv1vPNBPtKG9eo8WwyUsPcZnI2M8ICFjfhVjJpTGbPqAZ9sU2AE",
                            }}
                          >
                            <PayPalButtons
                              fundingSource="paypal"
                              createOrder={(data, actions, err) => {
                                return actions.order.create({
                                  intent: "CAPTURE",
                                  purchase_units: [
                                    {
                                      description: "Cool looking table",
                                      amount: {
                                        currency_code: "USD",
                                        value: "0.1",
                                      },
                                    },
                                  ],
                                });
                              }}
                              onApprove={async (data, actions) => {
                                const order = await actions.order.capture();

                                console.log(" onapprove called:>> ");
                                Swal.fire({
                                  title: "Payment Done!",
                                  text: `you order no is #B${Random}`,
                                  icon: "success",
                                  button: "Ok",
                                }).then(() => {
                                  navigate("/conformpage");
                                });
                                // navigate("/conformpage");
                                console.log(order);
                              }}
                            />
                          </PayPalScriptProvider>
                        </div>
                      </>
                    ) : (
                      <div className="payment text-end mt-2">
                        <button type="submit" className="mt-3">
                          Pay Now <BsCurrencyRupee />
                          {calculate}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Col>

              {/* payment close */}
            </Row>
            <Modal
              centered
              size="lg"
              isOpen={modal}
              toggle={() => setModal(!modal)}
            // style={{ width: "30%" }}
            >
              <ModalHeader
                toggle={() => setModal(!modal)}
                className="pe-5 mt-1"
              >
                <h1 className="titles">Our Privacy Policy*</h1>
              </ModalHeader>
              <ModalBody className="modalbody">
                <div>
                  <p className="policytxt">
                    At Rent Car Service we are committed to protecting your
                    privacy and ensuring the security of your personal
                    information. This Privacy Policy outlines the types of
                    personal information we collect, how we use it, and how we
                    keep it safe.
                  </p>
                  <h1 className="titles">Information We Collect</h1>
                  <p className="policytxt">
                    We may collect personal information when you make a
                    reservation, rent a vehicle, or sign up for our loyalty
                    program. This may include your name, email address, phone
                    number, mailing address, driver's license information,
                    credit card information, and any other relevant information
                    necessary to provide you with our services.
                  </p>
                  <h1 className="titles">How We Use Your Information</h1>
                  <p className="policytxt">
                    We use the personal information you provide to us to process
                    your reservations and rental requests, to communicate with
                    you about our services, and to improve our services. We may
                    also use your information for marketing purposes, such as
                    sending you promotions and offers. <br />
                    We may share your personal information with our third-party
                    partners, such as insurance providers and payment
                    processors, to provide you with the best possible service.
                    However, we will only share the minimum amount of
                    information necessary and will require our partners to
                    maintain the same level of privacy and security standards
                    that we do. We may also share your information with law
                    enforcement or government agencies as required by law or to
                    protect our legal rights.
                  </p>
                  <h1 className="titles">Security Measures</h1>
                  <p className="policytxt">
                    We take the security of your personal information seriously
                    and have implemented reasonable measures to protect it.
                    These measures include using secure servers and encryption
                    technology to protect your personal information during
                    transmission and storage.
                  </p>
                  <h1 className="titles">Your Choices</h1>
                  <p className="policytxt">
                    You may choose not to provide us with certain personal
                    information, but this may prevent us from providing you with
                    our services. You may also opt-out of receiving marketing
                    communications from us at any time by following the
                    instructions in the communication.
                  </p>
                  <h1 className="titles">Children's Privacy</h1>
                  <p className="policytxt">
                    Our services are not intended for children under the age of
                    18. We do not knowingly collect personal information from
                    children under the age of 18.
                  </p>
                  <h1 className="titles">Updates to This Privacy Policy</h1>
                  <p className="policytxt">
                    We may update this Privacy Policy from time to time. If we
                    make any material changes, we will notify you by email or by
                    posting a notice on our website.
                  </p>
                  <h1 className="titles">Contact Us</h1>
                  <p className="policytxt">
                    If you have any questions or concerns about our Privacy
                    Policy or how we handle your personal information, please
                    contact us at [contact information].
                  </p>
                  <h1 className="titles">Effective Date</h1>
                  <p className="policytxt">
                    This Privacy Policy is effective as of 14/02/2023.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="justify-content-center">
                <botton className="acceptbtn" onClick={() => setModal(false)}>
                  Accept
                </botton>
              </ModalFooter>
            </Modal>
          </Form>
          <hr />
          <Review />
        </>
      ) : (
        <div>
          <h2>your payment done successfully</h2>

          <div className="payment text-end mt-2">
            <button
              onClick={() => {
                Swal.fire({
                  title: "Payment Done!",
                  text: `you order no is #B${Random}`,
                  icon: "success",
                  button: "Ok",
                }).then(() => {
                  navigate("/conformpage");
                });
                // navigate("/conformpage");
              }}
            >
              Details
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingForm;
