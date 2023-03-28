import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import "../style/profile.css";
import Subprofile from "../components/Ui/Subprofile";
import Bookinghistory from "../components/Ui/Bookinghistory";
import { CgProfile } from "react-icons/cg";
import { BiHistory } from "react-icons/bi";

const Profile = () => {
  const [isActive, setActive] = useState("");
  const [isActive1, setActive1] = useState("");

  useEffect(() => {
    setActive("a");
    localStorage.setItem("carrating", "0");
  }, []);

  return (
    <Row id="profile" className="w-100">
      <Col lg="2" className="sidebar_outsidebox">
        <div className="sidebar_box">
          <ul className="profile_ul">
            <li
              className={isActive === "a" ? "li1" : ""}
              onClick={() => {
                setActive("a");
                setActive1("");
              }}
            >
              <CgProfile />
              <span style={{ marginLeft: "10px" }}>Profile</span>
            </li>
            <li
              className={isActive1 === "a" ? "li2 li1" : "li2"}
              onClick={() => {
                setActive("");
                setActive1("a");
              }}
            >
              <BiHistory />
              <span style={{ marginLeft: "10px" }}>Booking History</span>
            </li>
          </ul>
        </div>
      </Col>
      <Col
        lg="10"
        style={{
          padding: "3rem",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "-20px",
        }}
      >
        {isActive === "a" ? (
          <Subprofile />
        ) : isActive1 === "a" ? (
          <Bookinghistory />
        ) : (
          ""
        )}
      </Col>
    </Row>
  );
};

export default Profile;
