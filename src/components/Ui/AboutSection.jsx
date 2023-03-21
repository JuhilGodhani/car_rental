import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../style/about-section.css";
import aboutImg from "../../assests/all-images/cars-img/bmw-offer.png";
const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about_section"
      // style=
      // {aboutClass === 'aboutPage'?
      // {marginTop :'0px'}
      // :{marginTop :'280px'}
      // }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about_section-content">
              <h4 className="section_subtitle">About Us</h4>
              <h2 className="section_title">Welcome to car rent service</h2>
              <p className="section_description">
                Welcome to our car rental website! We are dedicated to providing
                our customers with the best car rental experience possible. Our
                team is committed to ensuring that you have a safe and enjoyable
                trip, no matter where your travels take you.
              </p>

              <div className="about_section-item d-flex align-item-center">
                <p className="section_description1 d-flex align-item-center gap-2">
                  <i className="ri-checkbox-circle-line"></i>
                  <span className="pt-2">Choose the perfect car</span>
                </p>

                <p className="section_description1 d-flex align-item-center gap-2">
                  <i className="ri-checkbox-circle-line"></i>
                  <span className="pt-2">Helping you make memories</span>
                </p>

                {/* <p className="section_description d-flex align-item-center gap-2">
                            <i className="ri-checkbox-circle-line"></i>Lorem ipsum dolor sit amet.

                        </p>

                        <p className="section_description d-flex align-item-center gap-2">
                            <i className="ri-checkbox-circle-line"></i>Lorem ipsum dolor sit amet.

                        </p> */}
              </div>
            </div>
          </Col>
          <Col lg="6" md="6">
            <div className="about_img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
