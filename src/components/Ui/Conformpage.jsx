import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import "../../style/conformpage.css";
import "../../style/review.css";
import { CgProfile } from "react-icons/cg";
import moment from "moment";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { dbs } from "../userfirebase/userfirebase";
import emailjs from "emailjs-com";
import {
  ref,
  onValue,
  set,
  get,
  update,
  remove,
  child,
} from "firebase/database";
import { BsCurrencyRupee } from "react-icons/bs";
import { SuccessToast, ErrorToast } from "../../helper/Toast";
import swal from "sweetalert";
import { Pending } from "@mui/icons-material";

const colors = {
  orange: "#FFBA5A",
  grey: "#b5b5b566",
};
const data = {
  reviewtext: "",
};

const Conformpage = () => {
  const [Cardata, setCardata] = useState([]);
  const [userBookingdata, setuserBookingdata] = useState([]);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const currentdate = new Date().toLocaleDateString();
  const currenttime = new Date().toLocaleTimeString();
  const caridname = JSON.parse(localStorage.getItem("cardetails"));

  //====================================       reviwe       ===================================
  const [Cardetails, setCardetails] = useState({});
  const [currentValue, setCurrentValue] = useState(0);
  const [Reviewname, setReviewname] = useState([]);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [Reviewtext, setReviewtext] = useState(data);
  const stars = Array(5).fill(0);

  const handlereviewtext = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setReviewtext({ ...Reviewtext, [name]: value });
  };

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  // const currentdate = new Date().toLocaleDateString();
  // const currenttime = new Date().toLocaleTimeString();

  const getAllData1 = () => {
    return {
      id: currenttime,
      data: {
        reviewname: Reviewname[0]?.data.firstname,
        reviewlastname: Reviewname[0]?.data.lastname,
        reviewtext: Reviewtext?.reviewtext,
        reviewstar: currentValue,
        date: currentdate,
        time: currenttime,
        // id: location,
        carname: Cardetails?.carname,
        carkey: Cardetails?.key,
      },
    };
  };

  const submitreview = async (event) => {
    event.preventDefault();

    const dbref = ref(dbs);

    const record = getAllData1();
    const address = "reviewdata/" + record.id;
    get(child(dbref, address)).then((snapshot) => {
      if (snapshot.exists()) {
      } else {
        set(ref(dbs, address), record.data);
        // window.location.href = "/home";
        navigate("/home");
        // SuccessToast("Review Submited!");
        setReviewtext(data);
        setCurrentValue(0);
      }
    });
    // console.log("reting", currentValue);
  };
  //====================================       reviwe       ===================================

  useEffect(() => {
    const cardetails = JSON.parse(localStorage.getItem("cardetails"));
    setCardetails(cardetails);
    const username = JSON.parse(localStorage.getItem("userLoginDatas"));
    const dbRef1 = ref(dbs, "UserRegisterData");
    onValue(dbRef1, async (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });

      const reviewusername = await records.filter((row) => {
        return row.data.email === username?.email;
      });
      console.log("ijfdklfmk", reviewusername[0]);
      setReviewname(reviewusername);
    });
    ////////////////////////////////////////////////////////////////////////////////////////

    const userBookingdata = JSON.parse(localStorage.getItem("userBookingdata"));
    setuserBookingdata(userBookingdata);
    const dbRef = ref(dbs, "cardata");
    onValue(dbRef, (snapshot) => {
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
    });
  }, []);

  const getAllData = () => {
    return {
      id: currenttime,
      data: {
        // carid: Cardata?.id,
        carname: Cardata?.data?.carname,
        carmodel: Cardata?.data?.carmodel,
        cartype: Cardata?.data?.cartype,
        carimg: caridname?.carimg,
        carprice: userBookingdata?.totalprice,
        orderno: userBookingdata?.orderno,
        firstname: userBookingdata?.firstname,
        lastname: userBookingdata?.lastname,
        email: userBookingdata?.email,
        phonenumber: userBookingdata?.phonenumber,
        deliverylocation: userBookingdata?.deliverylocation,
        pickuplocation: userBookingdata?.pickuplocation,
        deliverydate: userBookingdata?.deliverydate,
        returndate: userBookingdata?.returndate,
        // journeytime: userBookingdata?.journeytime,
        msg: userBookingdata?.msg,
        // radioValue: userBookingdata?.radioValue,
        checkboxclick: userBookingdata?.checkboxclick,
        status: "Pending",
        date: currentdate,
        time: currenttime,
      },
    };
  };

  const confirm = () => {
    const from_name = "Harsh";
    const from_email = userBookingdata?.email;
    const message = `Thank you for booking car from our website your order id is ${userBookingdata?.orderno} `;
    const name = `${userBookingdata?.firstname}  ${userBookingdata?.lastname}`;
    const email = userBookingdata?.email;
    const carname = Cardata?.data?.carname;
    const model = Cardata?.data?.carmodel;
    const cartype = Cardata?.data?.cartype;
    const total = userBookingdata?.totalprice;
    const number = userBookingdata?.phonenumber;
    const deliverylocation = userBookingdata?.deliverylocation;
    const pickuplocation = userBookingdata?.pickuplocation;
    const startdate = userBookingdata?.deliverydate;
    const returndate = userBookingdata?.returndate;
    const id = userBookingdata?.orderno;
    const image = caridname?.carimg;
    // =============================================================================================
    const dbref = ref(dbs);
    const record = getAllData();
    // console.log("record------", record);
    const address = "BookingData/" + record.id;
    // console.log("yourName----", userContact.yourName);
    get(child(dbref, address)).then((snapshot) => {
      if (snapshot.exists()) {
        ErrorToast("Please enter all details...");
      } else {
        // setContact(data);
        set(ref(dbs, address), record.data);
        // SuccessToast("Thank you for your response 😄");
        // setBookingdata(data);
        // setCheckboxclick("Unchecked");
        // SuccessToast("Booking Done Successfully 👍");
        // setopenCheckbox(false);
        // setEmailError("");

        emailjs
          .send(
            "service_xu450yj",
            "template_wqq9dl8",
            {
              from_name: from_name,
              from_email: from_email,
              message: message,
              name: name,
              email: email,
              carname: carname,
              cartype: cartype,
              model: model,
              total: total,
              number: number,
              deliverylocation: deliverylocation,
              pickuplocation: pickuplocation,
              startdate: startdate,
              returndate: returndate,
              id: id,
              image: image,
            },
            "gZ6n27u3Qe_ideSrm"
          )
          .then(
            (result) => {
              console.log("result.text :>> ", result.text);
            },
            (error) => {
              console.log("error.text :>> ", error.text);
            }
          );

        swal({
          title: "Success!",
          text: "Booking Done Successfully!",
          icon: "success",
          button: "Ok",
        }).then(() => {
          setModal(true);
          console.log("click :>> ");
          // window.location.href = "/home";
        });

        //===========================================================
        localStorage.setItem(
          "userBookingdata",
          JSON.stringify({
            orderno: "",
            firstname: "",
            lastname: "",
            email: "",
            phonenumber: "",
            deliverylocation: "",
            pickuplocation: "",
            deliverydate: "",
            returndate: "",
            msg: "",
            checkboxclick: "",
          })
        );
      }
    });
  };

  return (
    <>
      <div id="conformpage">
        <div className="maindiv">
          <div className="profile_outsidebox">
            <div className="profile_box">
              <div className="profile_nav">
                <h2>Booking Details</h2>
              </div>
              <div className="prodetails">
                <Row className="samepad">
                  <Col lg="4" className="textque">
                    Your Order No.
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans">
                    {userBookingdata?.orderno}
                  </Col>
                </Row>
                <Row className="samepad">
                  <Col lg="4" className="textque">
                    Name
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans">
                    {userBookingdata?.firstname} {userBookingdata?.lastname}
                  </Col>
                </Row>

                <Row className="samepademail">
                  <Col lg="4" className="textque">
                    Email
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans">
                    {userBookingdata?.email}
                  </Col>
                </Row>

                <Row className="samepad">
                  <Col lg="4" className="textque">
                    Car Name
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans">
                    {Cardata?.data?.carname}
                  </Col>
                </Row>
                <Row className="samepad">
                  <Col lg="4" className="textque">
                    Model
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans">
                    {Cardata?.data?.carmodel}
                  </Col>
                </Row>
                <Row className="samepad">
                  <Col lg="4" className="textque">
                    Car Type
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans">
                    {Cardata?.data?.cartype}
                  </Col>
                </Row>

                <Row className="samepad">
                  <Col lg="4" className="textque">
                    Number
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans">
                    {userBookingdata?.phonenumber}
                  </Col>
                </Row>
                <Row className="samepad">
                  <Col lg="4" className="textque">
                    Starting Location
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans">
                    {userBookingdata?.deliverylocation}
                  </Col>
                </Row>
                <Row className="samepad">
                  <Col lg="4" className="textque">
                    Ending Location
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans">
                    {userBookingdata?.pickuplocation}
                  </Col>
                </Row>
                <Row className="samepad">
                  <Col lg="4" className="textque">
                    Departure Date
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans">
                    {userBookingdata?.deliverydate}
                  </Col>
                </Row>
                <Row className="samepad">
                  <Col lg="4" className="textque">
                    Return Date
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans">
                    {userBookingdata?.returndate}
                  </Col>
                </Row>
                {/* <Row className="samepad">
                  <Col lg="4" className="textque">
                    Delivery Time
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans">
                    {moment(userBookingdata?.journeytime, "hh:mm A").format(
                      "LT"
                    )}
                  </Col>
                </Row> */}
                {/* <Row className="samepad">
                  <Col lg="4" className="textque">
                    Payment method
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans">
                    {userBookingdata?.radioValue}
                  </Col>
                </Row> */}
                <Row className="samepad">
                  <Col lg="4" className="textque">
                    Checkbox
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans">
                    {userBookingdata?.checkboxclick}
                  </Col>
                </Row>
                <Row className="samepad">
                  <Col lg="4" className="textque">
                    Other Details
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans otherdetails">
                    {userBookingdata?.msg}
                  </Col>
                </Row>
              </div>
              <hr />
              <div className="paymentdetails">
                <Row className="samepad">
                  <Col lg="4" className="textque">
                    Total Payment
                  </Col>
                  <Col lg="1">:</Col>
                  <Col lg="7" className="textans">
                    <BsCurrencyRupee />
                    {userBookingdata.totalprice}.00
                  </Col>
                </Row>
              </div>
              <Row className="bookinconfirm">
                <div className="d-flex gap-1">
                  <Col
                    className="textcenter cancel"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Col>
                  <Col className="textcenter confirm" onClick={confirm}>
                    Confirm
                  </Col>
                </div>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <Modal
        centered
        size="lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
        style={{ width: "40%" }}
      >
        <ModalHeader toggle={() => setModal(!modal)} className="pe-5 mt-1">
          <h1 className="titles">Rate This Car</h1>
        </ModalHeader>
        <ModalBody className="modalbody">
          <div
            className="container"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {/* <h2 className="ratingtxt"> Car Ratings </h2> */}
            <div className="stars">
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                    color={
                      (hoverValue || currentValue) > index
                        ? colors.orange
                        : colors.grey
                    }
                    style={{
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
            <textarea
              placeholder="What's your experience?"
              name="reviewtext"
              className="textareaa"
              value={Reviewtext?.reviewtext}
              onChange={handlereviewtext}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="subbtn" onClick={submitreview}>
                Submit
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Conformpage;
