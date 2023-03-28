import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import HeroSlider from "../components/Ui/HeroSlider";
import Slider from "react-slick";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../style/hero-slider.css";
import FindCarForm from "../components/Ui/FindCarForm";
import AboutSection from "../components/Ui/AboutSection";
import ServiceList from "../components/Ui/ServiceList";
import carData from "../assests/data/carData";
import CarItem from "../components/Ui/CarItem";
import BecomeDriverSection from "../components/Ui/BecomeDriverSection";
import Testimonial from "../components/Ui/Testimonial";
import Homepage_blogs from "../components/Ui/Homepage_blogs";
import BlogList from "../components/Ui/BlogList";
import { BsCurrencyRupee } from "react-icons/bs";
import KommunicateChat from "../components/Ui/KommunicateChat";
import { dbs } from "../components/userfirebase/userfirebase";
import { useNavigate } from "react-router-dom"
import {
  ref,
  onValue,
  set,
  get,
  update,
  remove,
  child,
} from "firebase/database";

const Home = () => {
  const [Cardata, setCardata] = useState([]);
  const [Blogdata, setBlogdata] = useState([]);
  const navigate=useNavigate()

  const setting = {
    fade: true,
    speed: 2000,
    autoplayspeed: 3000,
    infinite: true,
    autoplay: true,
    sliderToShow: 1,
    sliderToScroll: 1,
    pauseOnHover: false,
  };

  useEffect(() => {
    const dbRef = ref(dbs, "cardata");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      setCardata(records);
    });

    const dbRef1 = ref(dbs, "blogs");
    onValue(dbRef1, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      setBlogdata(records);
    });

    localStorage.setItem(
      "userBookingdata",
      JSON.stringify({
        firstname: "",
        lastname: "",
        phonenumber: "",
        deliverylocation: "",
        pickuplocation: "",
        deliverydate: "",
        returndate: "",
        msg: "",
      })
    );
  }, []);

  return (
    <>
      <div>
        <section className="p-0 hero_slider-section">
          <Slider {...setting} className="hero_slider">
            <div className="slider_item slider_item-01 mt0">
              <Container>
                <div className="slider_content">
                  <h4 className="text-light mb-3">
                    For Rent <BsCurrencyRupee />
                    5000 Per Day
                  </h4>
                  <h1 className="text-light mb-4">
                    Reserve Now and Get 50% off
                  </h1>
                  <Link to="/cars">
                    <button className="btn reserve_btn mt-4">
                      Reserve Now
                    </button>
                  </Link>
                </div>
              </Container>
            </div>

            <div className="slider_item slider_item-02  mt0">
              <Container>
                <div className="slider_content">
                  <h4 className="text-light mb-3">
                    For Rent <BsCurrencyRupee />
                    5000 Per Day
                  </h4>
                  <h1 className="text-light mb-4">
                    Reserve Now and Get 50% off
                  </h1>
                  <Link to="/cars">
                    <button className="btn reserve_btn  mt-4">
                      Reserve Now
                    </button>
                  </Link>
                </div>
              </Container>
            </div>

            <div className="slider_item slider_item-03  mt0">
              <Container>
                <div className="slider_content">
                  <h4 className="text-light mb-3">
                    For Rent <BsCurrencyRupee />
                    5000 Per Day
                  </h4>
                  <h1 className="text-light mb-4">
                    Reserve Now and Get 50% off
                  </h1>
                  <Link to="/cars">
                    <button className="btn reserve_btn mt-4">
                      Reserve Now
                    </button>
                  </Link>
                </div>
              </Container>
            </div>
          </Slider>
        </section>

        {/*======================== form============================*/}
        <div className="hero_form">
          <Container>
            <Row
              className="form_row"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Col lg="4" md="4">
                <div className="find_cars-left">
                  <h2>Find your best car here</h2>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12">
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div>
        {/*======================== about============================*/}

        <AboutSection />

        {/*======================== service============================*/}
        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-5 text-center">
                <h6 className="section_subtitle">See our</h6>
                <h2 className="section_title">popular Services</h2>
              </Col>
              <ServiceList />
            </Row>
          </Container>
        </section>

        {/*======================== car item(hot offer)============================*/}
        <section>
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5 ">
                <h6 className="section_subtitle">Come with</h6>
                <h2 className="section_title">Hot offers</h2>
              </Col>
              {Cardata.slice(0, 6).map((item) => (
                <CarItem item={item} key={item.key} />
              ))}
              {console.log("cardata", Cardata)}
            </Row>
          </Container>
        </section>

        {/*======================== Becomme a driver============================*/}
        <BecomeDriverSection />
        {/*======================== testimonial============================*/}
        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-4 text-center">
                <h6 className="section_subtitle">Our clients says</h6>
                <h2 className="section_title">Testimonials</h2>
              </Col>
              <Testimonial />
            </Row>
          </Container>
        </section>

        {/*======================== Blog list============================*/}

        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-5 text-center">
                <h6 className="section_subtitle">Explore our bogs</h6>
                <h2 className="section_title">Latest Blogs</h2>
                <h4 onClick={()=>navigate("/blogs")} className='seeall' style={{float:"right",cursor:'pointer'}}>See all</h4>
              </Col>
              {Blogdata.slice(0, 3).map((item) => (
                <BlogList item={item} key={item.key} />
              ))}
              {/* <BlogList /> */}
            </Row>
          </Container>
        </section>

        {/* <div>
   <KommunicateChat />
          </div> */}
      </div>
    </>
  );
};

export default Home;
