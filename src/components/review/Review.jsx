import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Row, Col } from "reactstrap";
import "../../style/review.css";
import {
  ref,
  onValue,
  set,
  get,
  update,
  remove,
  child,
} from "firebase/database";
import moment from "moment";
import { dbs } from "../userfirebase/userfirebase";
import { SuccessToast } from "../../helper/Toast";
import { useEffect } from "react";

const colors = {
  orange: "#FFBA5A",
  grey: "#b5b5b566",
};

const data = {
  reviewtext: "",
};

const Review = () => {
  const location = window.location.pathname.split("/")[2];
  console.log("location", location);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [Reviewtext, setReviewtext] = useState(data);
  const [Tabledata, setTabledata] = useState([]);
  const [Cardetails, setCardetails] = useState({});
  const [Totalreviews, setTotalreviews] = useState(null);
  const [avgstar, setavgstar] = useState(null);
  const [avgstarnum, setavgstarnum] = useState(null);
  // console.log("TbleDdta", Tabledata);
  const [Reviewname, setReviewname] = useState([]);
  const stars = Array(5).fill(0);
  const [Ratingstar, setRetingstar] = useState([]);
  const starrat = Ratingstar;
  ////////////////////////////////////////////////////////////
  const handlereviewtext = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setReviewtext({ ...Reviewtext, [name]: value });
  };

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  const currentdate = new Date().toLocaleDateString();
  const currenttime = new Date().toLocaleTimeString();

  const getAllData = () => {
    return {
      id: currenttime,
      data: {
        reviewname: Reviewname[0]?.data.firstname,
        reviewlastname: Reviewname[0]?.data.lastname,
        reviewtext: Reviewtext?.reviewtext,
        reviewstar: currentValue,
        date: currentdate,
        time: currenttime,
        // id: location,
        carname: Cardetails?.carname,
        carkey: Cardetails?.key,
      },
    };
  };

  const submitreview = async (event) => {
    event.preventDefault();

    const dbref = ref(dbs);

    const record = getAllData();
    const address = "reviewdata/" + record.id;
    get(child(dbref, address)).then((snapshot) => {
      if (snapshot.exists()) {
      } else {
        set(ref(dbs, address), record.data);
        SuccessToast("Review Submited!");
        setReviewtext(data);
        setCurrentValue(0);
      }
    });
    // console.log("reting", currentValue);
  };
  /////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const cardetails = JSON.parse(localStorage.getItem("cardetails"));
    setCardetails(cardetails);
    const username = JSON.parse(localStorage.getItem("userLoginDatas"));
    const dbRef = ref(dbs, "UserRegisterData");
    onValue(dbRef, async (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });

      const reviewusername = await records.filter((row) => {
        return row.data.email === username?.email;
      });
      console.log("ijfdklfmk", reviewusername[0]);
      setReviewname(reviewusername);
    });

    const dbRef2 = ref(dbs, "reviewdata");
    onValue(dbRef2, (snapshot) => {
      let records2 = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records2.push({ key: keyName, data: data });
      });
      //   const userLoginDatas = JSON.parse(localStorage.getItem("userLoginDatas"));
      //   const currentdate = new Date().toLocaleDateString();
      let data = [];
      // records2.filter((v) => {
      //   if (v?.data?.id === location) {
      //     data.push(v);
      //   }
      // });
      records2.filter((v) => {
        if (
          v?.data?.carkey === cardetails?.key &&
          v?.data?.carname === cardetails?.carname
        ) {
          data.push(v);
        }
      });

      //========================================== avg review star(open) ============================================//

      let total = 0;
      data.map((star, index) => {
        console.log("v :>> ", star);
        if (star?.data.reviewstar) {
          total = total + star?.data.reviewstar;
          console.log("total :>> ", total);
        }

        let avg = total / data.length;
        console.log("avg :>> ", avg.toFixed(0));
        setavgstar(avg.toFixed(0));
        setavgstarnum(avg.toFixed(1));
        localStorage.setItem("carrating", avg.toFixed(0));
      });

      //========================================== avg review star(close) ============================================//

      console.log("data", data);
      setTabledata(data);
      console.log("datasadf :>> ", data.length);
      // console.log("data1 :>> ", Tabledata);
      setTotalreviews(data.length);
      // setRetingstar(records2);
      // console.log("ratingstar :>> ", records2);
    });
  }, []);

  return (
    <Row>
      <h2 className="ratingtxt">Ratings and Reviews</h2>
      {/* <Col lg="4" className="reviewleftside">
        <div className="container">
          <h2 className="ratingtxt"> Car Ratings </h2>
          <div className="stars">
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={24}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  color={
                    (hoverValue || currentValue) > index
                      ? colors.orange
                      : colors.grey
                  }
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
          <textarea
            placeholder="What's your experience?"
            name="reviewtext"
            className="textareaa"
            value={Reviewtext?.reviewtext}
            onChange={handlereviewtext}
          />

          <button className="subbtn" onClick={submitreview}>
            Submit
          </button>
        </div>
      </Col> */}
      {/* <Col lg="12"> */}
      <div className="reviewbox">
        <div>
          <Row className="reviewbox_underhad">
            <Col className="textcapi">{Totalreviews} Reviews</Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "5px",
              }}
              className="textcapi"
            >
              {avgstarnum}
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
            </Col>
          </Row>
          {Tabledata.map((row, index) => {
            {
              /* console.log("dsf", row); */
            }
            {
              /* console.log("ddfkn sf", Reviewname[0]); */
            }
            return (
              <div key={index + 1}>
                {/* <div>{Reviewname[0].data.firstname}</div> */}
                <div className="reviewgap">
                  <Row>
                    <Col>
                      <div className="textcapi">
                        {row.data.reviewname} {row.data.reviewlastname}
                      </div>
                      <div>
                        {row?.data?.reviewstar === 1 ? (
                          <FaStar color={colors?.orange} />
                        ) : row?.data?.reviewstar === 2 ? (
                          <>
                            <FaStar color={colors?.orange} />
                            <FaStar color={colors?.orange} />
                          </>
                        ) : row?.data?.reviewstar === 3 ? (
                          <>
                            <FaStar color={colors?.orange} />
                            <FaStar color={colors?.orange} />
                            <FaStar color={colors?.orange} />
                          </>
                        ) : row?.data?.reviewstar === 4 ? (
                          <>
                            <FaStar color={colors?.orange} />
                            <FaStar color={colors?.orange} />
                            <FaStar color={colors?.orange} />
                            <FaStar color={colors?.orange} />
                          </>
                        ) : row?.data?.reviewstar === 5 ? (
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
                    </Col>
                    <Col className="ratingstar">
                      <div className="textcapi reviewdate">
                        {moment(row.data.date).format(" MMM Do, YYYY ")}
                      </div>
                    </Col>
                  </Row>

                  <div className="textmsg">{row.data.reviewtext}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* </Col> */}
    </Row>
  );
};

export default Review;
