import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
import "../../style/find-car-form.css";
import "../../style/find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const data = {
  deliverylocation: "",
  pickuplocation: "",
  deliverydate: "",
  // journeytime: "",
  returndate: "",
  cartype: "",
};

const FindCarForm = () => {
  const [userfindData, setFindData] = useState(data);

  const navigate = useNavigate();

  const hendalfindcar = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setFindData({ ...userfindData, [name]: value });
  };

  const findcarbtn = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "Journey-Details",
      JSON.stringify({
        deliverylocation: userfindData.deliverylocation,
        pickuplocation: userfindData.pickuplocation,
        deliverydate: userfindData.deliverydate,
        // journeytime: userfindData.journeytime,
        returndate: userfindData.returndate,
        cartype: userfindData.cartype,
      })
    );
    navigate("/cars");
    // console.log(localStorage.getItem("Journey-Details"));
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextDayISO = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    localStorage.setItem(
      "Journey-Details",
      JSON.stringify({
        deliverylocation: "",
        pickuplocation: "",
        deliverydate: "",
        // journeytime: "",
        returndate: "",
        cartype: "",
      })
    );
  }, []);
  return (
    <Form className="form" onSubmit={findcarbtn}>
      <div className="d-flex align-items-center justify-content-between flex-wrap main">
        <FormGroup className="form_group ">
          <input
            className="text-capitalize"
            type="text"
            name="deliverylocation"
            onChange={hendalfindcar}
            value={userfindData.deliverylocation}
            placeholder="Starting Location"
            required
          />
          <FormHelperText className="formhelpertxt1">
            Starting Location
          </FormHelperText>
        </FormGroup>

        <FormGroup className="form_group">
          <input
            onChange={hendalfindcar}
            className="text-capitalize"
            name="pickuplocation"
            type="text"
            value={userfindData.pickuplocation}
            placeholder="Ending Location"
            required
          />
          <FormHelperText className="formhelpertxt1">
            Ending Location
          </FormHelperText>
        </FormGroup>

        <FormGroup className="form_group">
          <input
            className="text-uppercase"
            onChange={hendalfindcar}
            name="deliverydate"
            id="date-1"
            min={new Date().toISOString().split("T")[0]}
            type="date"
            value={userfindData.deliverydate}
            placeholder="journey date"
            required
          />
          <FormHelperText className="formhelpertxt">
            Departure Date
          </FormHelperText>
        </FormGroup>

        <FormGroup className="form_group">
          {/* <input
            className="journey_time text-capitalize"
            name="journeytime"
            onChange={hendalfindcar}
            type="time"
            value={userfindData.journeytime}
            placeholder="journey time"
            required
          /> */}
          <input
            className="text-uppercase"
            onChange={hendalfindcar}
            min={nextDayISO}
            id="date-1"
            name="returndate"
            type="date"
            value={userfindData.returndate}
            placeholder="return date"
            required
          />
          <FormHelperText className="formhelpertxt">Return Date</FormHelperText>
        </FormGroup>

        <FormGroup className="select_group">
          <select
            name="cartype"
            className="select"
            onChange={hendalfindcar}
            value={userfindData.cartype}
          >
            <option value="" disabled>
              Car Type
            </option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Coupe">Coupe</option>
            <option value="PickupTrucks">Pickup Trucks</option>
          </select>
          <FormHelperText className="formhelpertxt1">Car Type</FormHelperText>
        </FormGroup>

        <FormGroup className="form_group">
          <button type="submit" className=" find_car-btn">
            Find Car
          </button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
