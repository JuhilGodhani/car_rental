import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { Container, Row, Col } from "reactstrap";
import { dbs } from "../userfirebase/userfirebase";
import {
  ref,
  child,
  onValue,
  set,
  get,
  update,
  remove,
} from "firebase/database";
import { useState } from "react";

const Subprofile = () => {
  const [logindata, setLogindata] = useState("");

  const loginLSData = JSON.parse(localStorage.getItem("userLoginDatas"));
  useEffect(() => {
    const dbRef = ref(dbs, "UserRegisterData");
    const dbRef1 = ref(dbs, "UserLoginData");
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
        console.log("snfsv", logindataFilter);
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
          <Row className="d-flex justify-content-center ">
            <div className="proimg_div">
              <CgProfile className="probg" />
            </div>
          </Row>
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
    </div>
  );
};

export default Subprofile;
