import React from "react";
import { Col } from "reactstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../style/car-item.css";
import BookingForm from "./BookingForm";
import { BsCurrencyRupee } from "react-icons/bs";

const CarItem = (props) => {
  const { carimg, carmodel, carname, automatic, carspeed, price } =
    props.item.data;
  // const { imgUrl, model, carName, automatic, speed, price } = props.item;
  const navigate = useNavigate();
  const location = useLocation();
  const userdata = JSON.parse(localStorage.getItem("userLoginDatas"));

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car_item">
        <div className="car_img">
          <img src={carimg} alt="" className="car_imgsrc" />
        </div>

        <div className="car_item-content mt-4">
          <h4 className="section_title text-center">{carname}</h4>
          <h6 className="rent_price text-center mt-">
            <BsCurrencyRupee />
            {price}.00
            <span>/Day</span>
          </h6>

          <div className="car_item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i>
              {carmodel}
            </span>

            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i>
              {automatic}
            </span>

            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i>
              {carspeed} kmph
            </span>
          </div>
          <a
            href="#booking"
            onClick={() => {
              {
                navigate("/cardetails", { state: { props } });
                localStorage.setItem(
                  "cardetails",
                  JSON.stringify({
                    key: props.item.key,
                    carname: props.item.data.carname,
                    carimg: props.item.data.carimg,
                  })
                );
              }
              // if (userdata?.email === " ") {
              //   window.location.reload();
              // } else {
              // }
            }}
          >
            <button type="submit" className="w-50 car_item-btn car_btn-rent">
              Booking
            </button>
          </a>
          <a
            onClick={() => {
              {
                navigate("/cardetails", { state: { props } });
                localStorage.setItem(
                  "cardetails",
                  JSON.stringify({
                    key: props.item.key,
                    carname: props.item.data.carname,
                    carimg: props.item.data.carimg,
                  })
                );
              }
              // if (userdata?.email === " ") {
              //   window.location.reload();
              // } else {
              // }
            }}
          >
            <button type="button" className="w-50 car_item-btn car_btn-details">
              Details
            </button>
          </a>
        </div>
      </div>
    </Col>
  );
  //====================================================================================================
  // return (
  //   <Col lg="4" md="4" sm="6" className="mb-5">
  //     <div className="car_item">
  //       <div className="car_img">
  //         <img src={imgUrl} alt="" className="w-100" />
  //       </div>

  //       <div className="car_item-content mt-4">
  //         <h4 className="section_title text-center">{carName}</h4>
  //         <h6 className="rent_price text-center mt-">
  //           ${price}.00<span>/Day</span>
  //         </h6>

  //         <div className="car_item-info d-flex align-items-center justify-content-between mt-3 mb-4">
  //           <span className=" d-flex align-items-center gap-1">
  //             <i className="ri-car-line"></i>
  //             {model}
  //           </span>

  //           <span className=" d-flex align-items-center gap-1">
  //             <i className="ri-settings-2-line"></i>
  //             {automatic}
  //           </span>

  //           <span className=" d-flex align-items-center gap-1">
  //             <i className="ri-timer-flash-line"></i>
  //             {speed}
  //           </span>
  //         </div>
  //         <a
  //           href="#booking"
  //           onClick={() => {
  //             navigate(`/cars/${carName}`);
  //             // if (userdata?.email === " ") {
  //             //   window.location.reload();
  //             // } else {
  //             // }
  //           }}
  //         >
  //           <button type="submit" className="w-50 car_item-btn car_btn-rent">
  //             Booking
  //           </button>
  //         </a>
  //         <a
  //           onClick={() => {
  //             navigate(`/cars/${carName}`);
  //             // if (userdata?.email === " ") {
  //             //   window.location.reload();
  //             // } else {
  //             // }
  //           }}
  //         >
  //           <button type="button" className="w-50 car_item-btn car_btn-details">
  //             Details
  //           </button>
  //         </a>
  //       </div>
  //     </div>
  //   </Col>
  // );
};

export default CarItem;
