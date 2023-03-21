import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
// ===========================
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useNavigate } from "react-router";
// import { useUserAuth } from "../context/UserAuthContext";
import { SuccessToast } from "../../helper/Toast";
// ===================================
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
import "../../style/header.css";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import Button from "@mui/material/Button";
import ProtectedRoute from "../ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Ui/Login";
import Register from "../Ui/Register";
import { Construction } from "@mui/icons-material";
import { CgProfile } from "react-icons/cg";

import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Contact from "../../pages/Contact";
import { borderBottomColor } from "@mui/system";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const data = {
  password: "",
};

// const LILO = {
//   login: "Login Type",
//   logout: "Logout",
// };

const Header = (props) => {
  // ==========================================
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [OpenProfile, setOpenProfile] = useState(false);
  const [OpenProfile1, setOpenProfile1] = useState(false);
  const [modal, setModal] = useState(false);
  const [OpenPro, setOpenPro] = useState(false);
  const [Promodal, setPromodal] = useState(false);

  // const [lgtype, setLgtype] = useState("Login Type");

  // const lgtype = () => localStorage.setItem("lgtype", JSON.stringify(LILO));
  const LoginType = localStorage.getItem("lgtype");

  const open = Boolean(anchorEl);

  const menuRef = useRef(null);
  const toggleMenu = () => {
    menuRef.current.classList.toggle("menu_active");
  };

  // =================================================================================

  // const { logOut } = useUserAuth();
  const navigate = useNavigate();
  // const handleLogout = async () => {
  //   try {
  //     await logOut();
  //     navigate("/home");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const a = { username: " ", email: " ", password: " " };
  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/home");

    window.localStorage.setItem("userLoginDatas", JSON.stringify(a));
    window.localStorage.setItem("lgtype", "Login");
    window.location.reload();
  };

  const menuRef1 = useRef();
  const menuRef2 = useRef();
  useEffect(() => {
    // let handler = (e) => {
    //   if (!menuRef1.current.contains(e.target)) {
    //     setOpenProfile(false);
    //   }
    // };
    // document.addEventListener("mousedown", handler);
    // let handler1 = (e) => {
    //   if (!menuRef2.current.contains(e.target)) {
    //     setOpenProfile1(false);
    //   }
    // };
    // document.addEventListener("mousedown", handler1);
  });
  //===================================================
  const [securepassword, setPassword] = useState(data);

  // const handlePassword = (event) => {
  //   let name = event.target.name;
  //   let value = event.target.value;

  //   setPassword({ ...securepassword, [name]: value });
  // };

  // const psw = "juju@123";
  // //=============================================================
  // const handlerSubmit = () => {
  //   // setLgtype("Logout");
  //   // navigate("/alogin");
  //   if (securepassword.password === psw) {
  //     navigate("/alogin");
  //     // setLgtype("Logout");

  //     // console.log("click");
  //   } else if (securepassword.password !== psw) {
  //     navigate("/login");
  //     localStorage.setItem("Login type", "user");
  //   }
  //   // localStorage.setItem("lgtype","Logout")
  //   // // setModal(false);
  //   window.location.reload();
  // };

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
      // console.log("records", records);
      onValue(dbRef1, async (snapshot) => {
        let records1 = [];
        snapshot.forEach((childSnapShot) => {
          let keyName = childSnapShot.key;
          let data = childSnapShot.val();
          records1.push({ key: keyName, data: data });
        });
        const logindataFilter = await records.filter((row) => {
          // console.log("1111");
          return row.data.email === loginLSData?.email;
        });
        setLogindata(logindataFilter[0]?.data);
        // console.log("snfsv", logindataFilter);
        if (loginLSData?.email !== " ") {
          window.localStorage.setItem(
            "username",
            logindataFilter[0]?.data.firstname
          );
        } else {
          window.localStorage.setItem("username", "");
        }
      });
    });
  }, []);

  const login = () => {
    if (LoginType === "Login") {
      // setOpenProfile1(true);
      navigate("/login");
      // window.location.reload();
    } else if (LoginType === "Logout") {
      handleLogout();
      setOpenProfile(false);
      // SuccessToast("Logout Successfully");
    }
    // if (LoginType === "Logout") {
    //   setOpenPro(true);
    // }
  };

  const profile = () => {
    // setPromodal(true);
    navigate("./profile");
    // console.log(setOpenPro(true));

    // setOpenProfile(false);
  };
  const userdata = JSON.parse(localStorage.getItem("userLoginDatas"));
  // const admindata = JSON.parse(localStorage.getItem("adminLoginDatas"));
  const username = localStorage.getItem("username");
  // =================================================================================
  return (
    <header className="header">
      {/* ==============header top========= */}
      {/* <UserAuthContextProvider> */}
      {/* <ProtectedRoute> */}
      {/* <Modal
        size="lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
        style={{ width: "30%" }}
      >
        <ModalHeader toggle={() => setModal(!modal)} className="pe-4">
          If You are Admin Please Enter Password*
        </ModalHeader>
        <ModalBody>
          <ValidatorForm
            onSubmit={() => {
              handlerSubmit();
              setModal(false);
              // window.location.reload();
            }}
            onError={(errors) => {
              for (const err of errors) {
                console.log(err.props.errorMessages[0]);
              }
            }}
          >
            <TextValidator
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handlePassword}
              value={securepassword.password}
              validators={["required"]}
              errorMessages={["This field is required"]}
              autoComplete="off"
            />

            <div className="modalfooter">
              <button
                // onClick={() => {
                //   handlerSubmit();
                //   setModal(false);
                //   window.location.reload();
                // }}
                variant="contained"
                className="submitbtn"
                type="Submit"
              >
                Submit
              </button>
            </div>
          </ValidatorForm>
        </ModalBody>
      </Modal> */}

      <div className="header_top">
        <Container>
          <Row className="topleft">
            <Col lg="6" md="6" sm="6">
              <div className="header_top_left">
                <span>Need Help?</span>
                <span className="header_top_help">
                  <i className="ri-phone-fill"></i> +91-875-849-1244
                </span>
              </div>
            </Col>

            {/* //========================================================================================= */}
            {/* <Col lg="6" md="6" sm="6">
              <div className="header_top_right d-flex aign-items-center justify-content-end gap-3">
                <Link to="/login" className="d-flex align-items-center gap-1">
                  <i className="ri-login-circle-line"></i>Login{" "}
                </Link>

                <Link
                  to="/register"
                  className="d-flex align-items-center gap-1"
                >
                  <i className="ri-user-line"></i>Register{" "}
                </Link>
              </div>
            </Col> */}
            {/* //========================================================================================= */}
            <Row className="topright">
              <Col lg="6" md="6" sm="6">
                <div className="header_top_right d-flex aign-items-center justify-content-end">
                  {/* {auth && ( */}
                  <div
                    className="acc"
                    onMouseLeave={() => {
                      setOpenProfile(false);
                      // setOpenProfile1(false);
                    }}
                    onMouseEnter={() => {
                      if (LoginType === "Logout") {
                        setOpenPro(true);
                      } else if (LoginType === "Login") {
                        setOpenPro(false);
                      }
                      setOpenProfile(true);
                    }}
                  >
                    <IconButton className="iconbtn" color="inherit">
                      <AccountCircle />
                    </IconButton>
                    {OpenProfile && (
                      <div ref={menuRef1}>
                        <div className="flex flex-column dropDownProfile">
                          <div className="arrow"></div>
                          <ul className="flex flex-column gap-4 menu1">
                            <div
                              // onClick={() => {
                              //   setOpenProfile1(true);
                              //   localStorage.setItem("lgtype","LogOut")
                              //   // lgtype();
                              //   // console.log(LILO?.login);
                              //   // console.log(LILO?.logout);
                              //   console.log(LoginType);
                              // }}
                              className="same"
                            >
                              {OpenPro && <li onClick={profile}>Profile</li>}

                              <li onClick={login}>{LoginType}</li>
                            </div>
                            {/* <Link  className="same"> */}
                            {/* //================================================================================================== */}
                            {/* <li onClick={handleLogout}>LogOut</li> */}
                            {/* //================================================================================================== */}

                            {/* </Link> */}
                            {/* <Link to="/register" className="same">
                                  <li>Register</li>
                                </Link> */}
                          </ul>
                        </div>
                      </div>
                    )}
                    {/* {userdata?.email === "" ? "" : ( */}
                    <span className="name">{username}</span>
                    {/* )} */}

                    {/* <span className="name">{admindata?.username || ""}</span> */}

                    {/* {OpenProfile1 && (
                      <div
                        ref={menuRef2}
                        onMouseLeave={() => setOpenProfile1(false)}
                      >
                        <div className="flex flex-column dropDownProfile1">
                          <div className="arrow1"></div>
                          <ul className="flex flex-column gap-4 menu1">
                            <div
                              onClick={() => {
                                {
                                  localStorage.setItem("Login type", "admin");
                                  setOpenProfile1(false);
                                  setOpenProfile(false);
                                  setModal(true);
                                  // setLgtype("Logout");

                                  // navigate("/alogin");
                                  // window.location.reload();
                                }
                              }}
                              className="same"
                            >
                              <li>Admin</li>
                            </div>
                            <div
                              className="same"
                              onClick={() => {
                                {
                                  localStorage.setItem("Login type", "user");
                                  setOpenProfile1(false);
                                  setOpenProfile(false);
                                  navigate("/login");
                                  window.location.reload();
                                  // setLgtype("Logout");
                                }
                              }}
                            >
                              <li>User</li>
                            </div>
                          </ul>
                        </div>
                      </div>
                    )} */}
                  </div>
                  {/* )} */}
                </div>
              </Col>
              {/* //============================================================================================== */}
            </Row>
          </Row>
        </Container>
      </div>
      {/* </ProtectedRoute> */}
      {/* </UserAuthContextProvider> */}
      {/* <div className="header_top"></div> */}
      {/* header middle */}

      <div className="header_middle">
        <Container className="">
          <Row className="ce">
            <Col le="4" md="3" sm="4">
              <div className="logo d-flex justify-content-center">
                <h1>
                  <Link to="/home" className="d-flex align-items-center gap-3">
                    <i className="ri-car-line"></i>
                    <span>
                      Rent Car <br /> Service
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col le="3" md="3" sm="4">
              <div className="header_location  d-flex justify-content-center align-items-center gap-2">
                <span>
                  {/* ================================================================= */}
                  <i className="ri-earth-line"></i>
                  {/* ================================================================= */}
                </span>
                <div className="header_location_content">
                  <h4>Gujarat</h4>
                  <h6>Surat</h6>
                </div>
              </div>
            </Col>

            <Col le="3" md="3" sm="4">
              <div className="header_location d-flex justify-content-center align-items-center gap-2">
                <span>
                  {/* ================================================================= */}
                  <i className="ri-time-line"></i>
                  {/* ================================================================= */}
                </span>
                <div className="header_location_content">
                  <h4>Sunday To Friday</h4>
                  <h6>10am - 7am</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="3"
              md="3"
              sm="4"
              className=" d-flex aign-items-center  justify-content-center"
            >
              <Link to="/contact" className="text-decoration-none ">
                <Button className="header_btn btn">
                  <CallOutlinedIcon className="ri-phone-line  " />
                  <span className="reqacall">Request a call</span>
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* main navigation */}
      <div className="main_navbar">
        <Container>
          <div className="navigation_wrapper d-flex aign-items-center justify-content-between">
            <span className="mobile_menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav_active nav_item" : "nav_item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav_right">
              <div className="search_box">
                <input type="text" placeholder="Search" />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
