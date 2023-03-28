import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { dbs } from "../userfirebase/userfirebase";
import { storage } from "../userfirebase/userfirebase";
import { v4 } from "uuid";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import {
  ref as REF,
  onValue,
  set,
  get,
  update,
  remove,
  child,
} from "firebase/database";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  ModalFooter,
} from "reactstrap";
import { SuccessToast, ErrorToast } from "../../helper/Toast";

import "../../style/subprofile.css";
import { TbLoader2 } from "react-icons/tb";
import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";

const Subprofile = () => {
  const [logindata, setLogindata] = useState("");
  const [Loginkey, setLoginkey] = useState("");
  const [modal, setModal] = useState(false);
  const [Edituserpropic, setEdituserpropic] = useState(logindata);
  const [imageUpload, setImageUpload] = useState(null);
  const [spinloder, setspinloder] = useState(false);
  const [Progress, setProgress] = useState(null);

  const loginLSData = JSON.parse(localStorage.getItem("userLoginDatas"));

  const editimg = () => {
    setModal(true);
  };

  const picsubmit = async (e) => {
    e.preventDefault();

    if (imageUpload == null) return;
    setspinloder(true);
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // setImageUrls((prev) => [...prev, url]);
        // setUrl(url);
        // console.log("url :>> ", url);

        let body = {
          id: Loginkey,
          data: {
            firstname: logindata?.firstname,
            lastname: logindata?.lastname,
            email: logindata?.email,
            userimg: url,
            phonenumber: logindata?.phonenumber,
            password: logindata?.password,
            gender: logindata?.gender,
            confirmPassword: logindata?.confirmPassword,
            date: logindata?.date,
            time: logindata?.time,
          },
        };
        const dbref = REF(dbs);
        const record = body;
        // const record = getAllData();
        const address = "UserRegisterData/" + record.id;

        get(child(dbref, address)).then((snapshot) => {
          if (snapshot.exists()) {
            update(REF(dbs, address), record.data);
            SuccessToast("Updated Successfully");
            setModal(false);
            setspinloder(false);
          } else {
            ErrorToast("Please enter all details...");
          }
        });
      });
    });
  };
  // const handleChange = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.value;
  //   setEdituserpropic({ ...Edituserpropic, [name]: value });
  //   console.log("Edituserpropic :>> ", Edituserpropic);
  // };

  useEffect(() => {
    const dbRef = REF(dbs, "UserRegisterData");
    const dbRef1 = REF(dbs, "UserLoginData");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      console.log("records", records);
      onValue(dbRef1, async (snapshot) => {
        let records1 = [];
        snapshot.forEach((childSnapShot) => {
          let keyName = childSnapShot.key;
          let data = childSnapShot.val();
          records1.push({ key: keyName, data: data });
        });
        const logindataFilter = await records.filter((row) => {
          console.log("1111");
          return row.data.email === loginLSData?.email;
        });
        setLogindata(logindataFilter[0]?.data);
        setLoginkey(logindataFilter[0]?.key);
        console.log("snfsv", logindataFilter[0]?.data.userimg);
      });

      // const registerdata = records.filter((row) => {
      //   if (logindata === row.data.email) {
      //     console.log("proname", row.data.email);
      //   }
      // });
      // console.log("juikl", registerdata);
    });
  }, []);
  return (
    <div>
      <div className="profile">
        <div className="profile_box">
          <Row className="d-flex justify-content-center">
            <div className="proimg_div">
              {/* <CgProfile className="probg" /> */}
              {logindata.userimg ===
              "https://firebasestorage.googleapis.com/v0/b/car-rent-website-7fa0c.appspot.com/o/images%2F240_F_150404044_dXI2utvn6Y6PivTbWk9lbIDR0UhM4A5Y-removebg-preview.png2367790c-2791-48e7-bac5-283f1af18b5d?alt=media&token=b035e2a9-204b-4556-a05a-1ed3565e1a21" ? (
                <img src={logindata.userimg} className="probg" />
              ) : (
                <img src={logindata.userimg} className="updatedproimg" />
              )}
            </div>
          </Row>
          <div className="editprof" onClick={editimg}>
            <MdModeEditOutline className="sub_editprof" />
          </div>
          {/* <Row> */}
          <div>
            <h1 className="profilename">
              <span className="username">{logindata.firstname}</span>'s Profile
            </h1>
            {/* <h3 className="profiledetails ">
        User Name :-
        <span className="username">{userdata.username}</span>
      </h3>
      <h3 className="profiledetails">
        Email :-
        <span className="useremail">{userdata.email}</span>
      </h3> */}
            <div className="prodetails">
              <h3 className="profiledetails">
                <Row className="samemarleft">
                  <Col lg="3">Name</Col>
                  <Col lg="1">:</Col>
                  <Col>
                    <span className="username">
                      {logindata.firstname} {logindata.lastname}
                    </span>
                  </Col>
                </Row>
              </h3>
              <h3 className="profiledetails">
                <Row className="samemarleft">
                  <Col lg="3">Email</Col>
                  <Col lg="1">:</Col>
                  <Col>
                    <span className="useremail">{logindata.email}</span>
                  </Col>
                </Row>
              </h3>
              <h3 className="profiledetails">
                <Row className="samemarleft">
                  <Col lg="3">Number</Col>
                  <Col lg="1">:</Col>
                  <Col>
                    <span className="username">{logindata.phonenumber}</span>
                  </Col>
                </Row>
              </h3>
              <h3 className="profiledetails">
                <Row className="samemarleft">
                  <Col lg="3">Gender</Col>
                  <Col lg="1">:</Col>
                  <Col>
                    <span className="username">{logindata.gender}</span>
                  </Col>
                </Row>
              </h3>
            </div>
          </div>
          {/* </Row> */}
        </div>
      </div>
      <Modal
        centered
        size="lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
        style={{ width: "30%" }}
      >
        <ModalHeader
          toggle={() => setModal(!modal)}
          className="pe-5 mt-1 modelheading"
        >
          <h3>Edit Profile Picture</h3>
        </ModalHeader>
        <ModalBody className="modelbodyspace">
          {logindata.userimg === "" ? (
            <>
              <Row>
                <div className="choosefile">
                  <input
                    type="file"
                    id="imageInput"
                    onChange={(event) => {
                      setImageUpload(event.target.files[0]);
                    }}
                  />
                </div>
              </Row>
              <Row>
                {/* {errors?.imageInput && (
                  <span className="text-danger pe-2">
                    {errors["imageInput"]}
                  </span>
                )} */}
              </Row>
            </>
          ) : (
            <>
              <div className="imgcar">
                <img src={logindata.userimg} className="proimgcss" />
                <div
                  className="img_closebtn"
                  onClick={() => {
                    setLogindata({ ...logindata, userimg: "" });
                  }}
                >
                  <AiFillCloseCircle />
                </div>
              </div>
            </>
          )}
          <Row style={{ marginTop: 10 }}>
            <Col className="cancelbtn_pos">
              <button
                className="addbtn"
                onClick={() => {
                  setModal(false);
                }}
              >
                Cancel
              </button>
            </Col>
            <Col>
              <button
                className="addbtn"
                style={{
                  gap: "5px",
                }}
                disabled={Progress !== null && Progress < 100}
                onClick={picsubmit}
              >
                {spinloder === true ? <TbLoader2 className="icon-spin" /> : ""}
                Update
              </button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Subprofile;
