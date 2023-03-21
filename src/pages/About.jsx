import React, { useEffect } from "react";
import CommonSection from "../components/Ui/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/Ui/AboutSection";
import { Container, Row, Col } from "reactstrap";
import BecomeDriverSection from "../components/Ui/BecomeDriverSection";
import driveImg from "../assests/all-images/drive.jpg";
import OurMembers from "../components/Ui/OurMembers";
import "../style/about.css";
const About = () => {
  return (
    // <Helmet title='About'>
    <>
      <CommonSection title="About Us" />
      <AboutSection aboutClass="aboutPage" />
      <section className="about_page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about_page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about_page-content">
                <h2 className="section_title">
                  We Are Committed To Provide Safe Ride Solutions
                </h2>
                <p className="section_description">
                  Vehicles, all the drivers are made aware of the latest
                  developments in the maintenance of the vehicle.
                </p>

                <p className="section_description">
                  Regular full-day vehicle checks are conducted with training
                  programs to keep the drivers in check.
                </p>
                <p className="section_description">
                  The training covers areas such a vehicular maintenance, proper
                  healthy checkups of the vehicle, the procedure to handle the
                  vehicle in case it breaks down, and defensive driving.
                </p>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i className="ri-phone-line"></i>
                  </span>
                  <div>
                    <h6 className="section_subtitle">Need Any Help?</h6>
                    <h4>+91-1234567890</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <BecomeDriverSection />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section_subtitle">Experts</h6>
              <h2 className="section_title">Our Members</h2>
            </Col>
            <OurMembers />
          </Row>
        </Container>
      </section>
    </>
    // </Helmet>
  );
};

export default About;
