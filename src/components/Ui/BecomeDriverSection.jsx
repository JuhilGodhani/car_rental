import React from "react";
import { Container, Row, Col } from "reactstrap";
import Button from "reactstrap";
import { Link,useNavigate } from "react-router-dom";
import driverImg from "../../assests/all-images/toyota-offer-2.png";
import "../../style/become-driver.css";

const BecomeDriverSection = () => {
  const navigate = useNavigate()

  return (
    <section className="become_driver">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12" className="become_driver-img">
            <img src={driverImg} alt="" className="w-100 img" />
          </Col>

          <Col lg="6" md="6" sm="12">
            <h2 className="section_title become_driver-title">
              Do You Want to Earn With Us? So Don't Be Late
            </h2>
            {/* <button className="btn1 become_driver-btn mt-4">Become A Driver</button> */}

            <a href="#c" onClick={()=>navigate(`/contact`) }>
            {/* <Link to="/contact"> */}
              <button className="btn1 become_driver-btn mt-4">
                Become a Driver
              </button>
            {/* </Link> */}
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BecomeDriverSection;
