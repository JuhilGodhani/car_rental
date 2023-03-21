import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import CommonSection from "../components/Ui/CommonSection";
import "../style/contact.css";
import validator from "validator";
import { ErrorToast, SuccessToast } from "../helper/Toast";
import {
  ref,
  onValue,
  set,
  get,
  update,
  remove,
  child,
} from "firebase/database";
import { dbs } from "../components/userfirebase/userfirebase";

const data = {
  yourName: "",
  email: "",
  message: "",
};

const Contact = () => {
  const [userContact, setContact] = useState(data);

  const [emailError, setEmailError] = useState(data);
  // const [emailError1, setEmailError1] = useState({
  //   yourName: "",
  //   email: "",
  //   message: "",
  // });

  let name, value;
  const postUserContact = (event) => {
    name = event.target.name;
    value = event.target.value;

    setContact({ ...userContact, [name]: value });
  };
  const currentdate = new Date().toLocaleDateString();
  const currenttime = new Date().toLocaleTimeString();

  const getAllData = () => {
    return {
      id: currenttime,
      data: {
        yourName: userContact.yourName,
        email: userContact.email,
        message: userContact.message,
        date: currentdate,
        time: currenttime,
      },
    };
  };

  const getAllData1 = () => {
    return {
      id: currenttime,
      data: 1,
    };
  };
  // connect with firebase
  const sendMsg = async (event) => {
    event.preventDefault();
    //=======================================================================
    const { yourName, email, message } = userContact;

    const dbref = ref(dbs);

    //========================================================================

    const record = getAllData();
    // console.log("record------", record);
    const address = "ContactDatas/" + record.id;
    // console.log("yourName----", userContact.yourName);
    get(child(dbref, address)).then((snapshot) => {
      if (snapshot.exists()) {
        ErrorToast("Please enter all details...");
      } else if (!yourName) {
        ErrorToast("Please enter name !!");
      } else if (!validator.isEmail(email)) {
        ErrorToast("Please enter valid email !!");
      } else if (!message) {
        ErrorToast("Please enter message !!");
      } else {
        setContact(data);
        set(ref(dbs, address), record.data);
        SuccessToast("Thank you for your response 😄");
        const record1 = getAllData1();
        const address1 = "notification/" + record1.id;
        get(child(dbref, address1)).then((snapshot) => {
          if (snapshot.exists()) {
          } else {
            set(ref(dbs, address1), record1.data);
          }
        });
      }
    });
    //=================================================================================================
    //========================================================================
    // const { yourName, email, message } = userContact;
    // const currentdate = new Date().toLocaleDateString();

    // if (yourName && validator.isEmail(email) && message) {
    //   const res = await fetch(
    //     "https://car-rent-website-7fa0c-default-rtdb.firebaseio.com/ContactDatas.json",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         yourName,
    //         email,
    //         message,
    //         currentdate,
    //       }),
    //     }
    //   );
    //   if (res) {
    //     setContact(data);
    //     SuccessToast("Message Sent Successfully 😄");
    //     setEmailError("");
    //   } else {
    //   }
    // } else if (!validator.isEmail(email)) {
    //   ErrorToast("Please Enter valid email !!");
    // } else {
    //   // ErrorToast("Please Fill The Data 😥");
    //   ErrorToast("Please fill all field !!");
    // }
  };

  //=============================================================

  const socialLinks = [
    {
      url: "https://www.semicolonsolution.com/",
      icon: "ri-facebook-line",
    },
    {
      url: "https://www.semicolonsolution.com/",
      icon: "ri-instagram-line",
    },
    {
      url: "https://www.semicolonsolution.com/",
      icon: "ri-linkedin-line",
    },
    {
      url: "https://www.semicolonsolution.com/",
      icon: "ri-twitter-line",
    },
  ];

  return (
    <>
      <div title="Contact">
        <CommonSection title="Contact" />
        <section>
          <Container>
            <Row>
              <Col lg="7" md="7">
                <h6 className="fw-bold mb-4">Get In Touch</h6>

                <Form method="POST" className="ps-3">
                  <FormGroup className="contact_form">
                    <Input
                      placeholder="Your Name"
                      name="yourName"
                      value={userContact.yourName}
                      onChange={postUserContact}
                      type="text"
                      className="text-capitalize"
                      required
                    ></Input>
                  </FormGroup>

                  <FormGroup className="contact_form">
                    <Input
                      placeholder="Email"
                      name="email"
                      value={userContact.email}
                      onChange={postUserContact}
                      type="email"
                      required
                    ></Input>
                  </FormGroup>

                  <FormGroup className="contact_form">
                    <Input
                      rows={5}
                      type="textarea"
                      placeholder="Message"
                      name="message"
                      value={userContact.message}
                      onChange={postUserContact}
                      className="textarea text-capitalize"
                    ></Input>
                  </FormGroup>

                  <button
                    className="contact_btn"
                    type="submit"
                    onClick={sendMsg}
                  >
                    Send Message
                  </button>
                </Form>
              </Col>

              <Col lg="5" md="5">
                <div className="contact_info mt-3">
                  <h6 className="fw-bold">Contact Information :-</h6>
                  <p className="section_description mb-0">
                    123,atlanta mall,surat
                  </p>

                  <div className="d-flex align-items-center gap-2">
                    <h6 className="section_description1 mb-0 ">Phone:</h6>
                    <p className="section_description mb-0 ">
                      +91-123-4567-890
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <h6 className="mb-0 section_description1">Email:</h6>
                    <p className="section_description mb-0 ">
                      example@gmail.com
                    </p>
                  </div>

                  <h6 className="fw-bold mt-4">Follow Us</h6>
                  <div className="d-flex align-items-center gap-4 mt-3">
                    {socialLinks.map((item, index) => (
                      <a
                        href={item.url}
                        key={index}
                        className="social_link-icon"
                        target="__blank"
                      >
                        <i className={item.icon}></i>
                      </a>
                    ))}
                    {/* <a href='https://www.facebook.com/'>
                                <i className='ri-facebook-line'></i>
                                   
                                </a> */}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default Contact;
