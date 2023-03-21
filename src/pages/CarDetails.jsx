import React, { useState, useEffect } from "react";
import ACcarData from "../assests/data/accarData";
import { Container, Row, Col } from "reactstrap";
import { useParams, useLocation } from "react-router-dom";
import BookingForm from "../components/Ui/BookingForm";
import PaymentMethod from "../components/Ui/PaymentMethod";
import ProtectedRoute from "../components/ProtectedRoute";
import Review from "../components/review/Review";
import { BsCurrencyRupee } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { dbs } from "../components/userfirebase/userfirebase";
import {
  ref,
  onValue,
  set,
  get,
  update,
  remove,
  child,
} from "firebase/database";

const colors = {
  orange: "#FFBA5A",
  grey: "#b5b5b566",
};

const CarDetails = () => {
  const { slug } = useParams();
  const [cardetail, setcardetail] = useState([]);
  const [Cardata, setCardata] = useState([]);
  const [avgstar, setavgstar] = useState(null);
  // const [cardetail, setcardetail] = useState("");
  const location = useLocation();
  const caridname = JSON.parse(localStorage.getItem("cardetails"));
  // const onecardata = Cardata?.data;
  // const singleCaritem1 = Cardata.map((row, index) => {
  //   console.log("row.data :>> ", row.data);
  //   // setcardetail(row);
  // });
  // const singleCaritem = cardetail?.find((item) => item?.data?.carname === slug);
  // console.log("Cardata :>> ", Cardata);
  // const cardetail = location.state.props.item;
  useEffect(() => {
    window.scrollTo(0, 0);
    // localStorage.setItem("selectcardetails", JSON.stringify(singleCaritem));
    // console.log("singleCaritem :>> ", singleCaritem);
    //==============================================================================
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
      console.log("Cardata :>> ", data[0]);
      //   console.log("Cardata45 :>> ", data);
      //   console.log("caraname", location.state.props.item.key);
      // singleCaritem1();
    });
    //==============================================================================
    setcardetail(location?.state?.props?.item);
    console.log("object :>> ", location?.state?.props?.item);

    const carrating = localStorage.getItem("carrating");
    console.log("carrating :>> ", carrating);
    setavgstar(carrating);
  }, []);

  return (
    <div title={Cardata?.data?.carname}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={Cardata?.data?.carimg} alt="" className="w-100" />
              {/* <button>submit</button> */}
            </Col>

            <Col lg="6">
              <h2 className="section_title">{Cardata?.data?.carname}</h2>
              <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                <h6 className="rent-price fw-bold fs-4">
                  <BsCurrencyRupee />
                  {Cardata?.data?.price}.00/Day
                </h6>
                {/* <Col
                  style={{
                    display: "flex",
                    gap: "5px",
                  }}
                  className="textcapi"
                > */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  {avgstar === "1" ? (
                    <FaStar color={colors?.orange} />
                  ) : avgstar === "2" ? (
                    <>
                      <FaStar color={colors?.orange} />
                      <FaStar color={colors?.orange} />
                    </>
                  ) : avgstar === "3" ? (
                    <>
                      <FaStar color={colors?.orange} />
                      <FaStar color={colors?.orange} />
                      <FaStar color={colors?.orange} />
                    </>
                  ) : avgstar === "4" ? (
                    <>
                      <FaStar color={colors?.orange} />
                      <FaStar color={colors?.orange} />
                      <FaStar color={colors?.orange} />
                      <FaStar color={colors?.orange} />
                    </>
                  ) : avgstar === "5" ? (
                    <>
                      <FaStar color={colors?.orange} />
                      <FaStar color={colors?.orange} />
                      <FaStar color={colors?.orange} />
                      <FaStar color={colors?.orange} />
                      <FaStar color={colors?.orange} />
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {/* </Col> */}
                {/* <span className="d-flex align-items-center gap-2">
                  <span style={{ color: "#f9a826" }}>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                  </span>
                  ({Cardata?.data?.carrating} ratings)
                </span> */}
              </div>

              <p className="section_description">
                {Cardata?.data?.description}
              </p>

              <div
                id="booking"
                className="d-flex align-items-center mt-3"
                style={{
                  columnGap: "4rem",
                }}
              >
                <span className="d-flex align-items-center gap-1  section_description">
                  <i
                    className="ri-roadster-line "
                    style={{
                      color: "#f9a826",
                    }}
                  ></i>
                  {Cardata?.data?.carmodel}
                </span>

                <span className="d-flex align-items-center gap-1 section_description">
                  <i
                    className="ri-settings-2-line"
                    style={{
                      color: "#f9a826",
                    }}
                  ></i>
                  {Cardata?.data?.automatic}
                </span>

                <span className="d-flex align-items-center gap-1 section_description">
                  <i
                    className="ri-timer-flash-line"
                    style={{
                      color: "#f9a826",
                    }}
                  ></i>
                  {Cardata?.data?.carspeed}kmph
                </span>
              </div>

              <div
                className="d-flex align-items-center mt-3"
                style={{
                  columnGap: "2.8rem",
                }}
              >
                <span className="d-flex align-items-center gap-1 section_description">
                  <i
                    className="ri-map-pin-line "
                    style={{
                      color: "#f9a826",
                    }}
                  ></i>
                  {Cardata?.data?.cargps}
                </span>

                <span className="d-flex align-items-center gap-1 section_description">
                  <i
                    className="ri-wheelchair-line"
                    style={{
                      color: "#f9a826",
                    }}
                  ></i>
                  {Cardata?.data?.seattype}
                </span>

                <span className="d-flex align-items-center gap-1 section_description">
                  <i
                    className="ri-building-2-line"
                    style={{
                      color: "#f9a826",
                    }}
                  ></i>
                  {Cardata?.data?.brandname}
                </span>
              </div>
            </Col>

            {/* <Col lg="7" className="mt-5"> */}
            <div className="booking-info mt-5">
              <h5 className="mb-4 fw-bold">Booking Information</h5>
              <ProtectedRoute Cmp={BookingForm} />
            </div>
            {/* </Col> */}

            {/* <Col lg="5" className="mt-5">
              <div className="payment_info mt-5">
                <h5 className="mb-4 fw-bold">payment Information</h5>
                <ProtectedRoute Cmp={PaymentMethod} />
              </div>
            </Col> */}
            {/* <hr />
            <Review /> */}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default CarDetails;
