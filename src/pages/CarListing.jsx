import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
// import Helmet from '../components/Helmet.js';
import CommonSection from "../components/Ui/CommonSection";
import CarItem from "../components/Ui/CarItem";
import CarData from "../assests/data/carData";
import ACcarData from "../assests/data/accarData";
import Button from "@mui/material/Button";
import "../style/carlisting.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Select, MenuItem } from "@material-ui/core";

import { Form, FormGroup } from "reactstrap";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
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

const CarListing = () => {
  const [usersele, setUsersele] = useState("");
  const [Cardata, setCardata] = useState([]);
  const [cars, setcars] = useState([]);
  const [Arr, setArr] = useState(CarData);

  const handleSele = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    // console.log(value);

    setUsersele(value);
  };
  console.log("usersele", usersele);
  const Search = (e) => {
    e.preventDefault();
    console.log('row :>>  ', Cardata);
    if (usersele === "Sedan") {
     
      const Sedancars = Cardata.filter((row) => {
        if (row.data.cartype === "Sedan") {
          return row;
          // console.log("cars", row);
        }
      });
      // localStorage.setItem("cartype", "Sedan");
      setcars(Sedancars);
    } else if (usersele === "SUV") {
      const SUVcars = Cardata.filter((row) => {
        if (row.data.cartype === "SUV") {
         return row; 
        }
      });
      setcars(SUVcars);
    } else if (usersele === "SelectCars") {
      console.log(' selectcar:>> ',CarData );
        setcars(Cardata)
    } else if (usersele === "Coupe") {
      const Coupecars = Cardata.filter((row) => {
        if (row.data.cartype === "Coupe") {
          return row;
          // console.log("cars", row);
        }
      });
      // setCardata(Arr);
      // localStorage.setItem("cartype", "Coupe");
      setcars(Coupecars);
    } else if (usersele === "PickupTrucks") {
      const PickupTruckscars = Cardata.filter((row) => {
        if (row.data.cartype === "PickupTrucks") {
          return row;
          // console.log("cars", row);
        }
      });
      // setCardata(Arr);
      // localStorage.setItem("cartype", "PickupTrucks");
      setcars(PickupTruckscars);
    }
  };

  let a = JSON.parse(localStorage.getItem("Journey-Details"));

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
      setcars(records);
    });

    if (a.cartype === "Sedan") {
      // console.log("a.cartype :>> ", a.cartype);
      setUsersele("Sedan");
      const Sedancars = Cardata.filter((row) => {
        if (row.data.cartype === a.cartype) {
          return row;
          // console.log("cars", row);
        }
      });
      setcars(Sedancars);
      // localStorage.setItem("cartype", a.cartype);
    } else {
      // localStorage.setItem("cartype", "AC Car");
      setUsersele("SUV");
      // setUsersele("AC Car");
      // setArr(ACcarData);
    }
    // setUsersele(a.cartype);/
    // setArr(ACcarData);
  }, []);

  console.log("usersele", usersele);
  return (
    <div title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <ValidatorForm onSubmit={Search}>
              <Row className="d-flex align-items-center">
                <Col lg="2">
                  <TextValidator
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={usersele}
                    label="Car Type"
                    name="cartype"
                    onChange={handleSele}
                  >
                    <MenuItem value="SelectCars">All Cars</MenuItem>
                    <MenuItem value="Sedan">Sedan</MenuItem>
                    <MenuItem value="SUV">SUV</MenuItem>
                    <MenuItem value="Coupe">Coupe</MenuItem>
                    <MenuItem value="PickupTrucks">Pickup Trucks</MenuItem>
                  </TextValidator>
                  {/* <FormControl
                    sx={{ m: 1, width: 300 }}
                    className="col-md-8"
                    style={{ width: "250px" }}
                  >
                    <InputLabel id="demo-multiple-name-label">
                      AC or Non-AC
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      value={usersele}
                      name="ACNonAc"
                      onChange={handleSele}
                      input={<OutlinedInput label="AC or Non-AC" />}
                      // MenuProps={MenuProps}
                    >
                      <MenuItem value="AC Car">AC Car</MenuItem>
                      <MenuItem value="Non-AC Car">Non-AC Car</MenuItem>
                    </Select>
                  </FormControl> */}
                  {/* <FormGroup className="select_group">
                    <select className="selects" onClick={sel}>
                      <option value="ac">AC car</option>
                      <option value="non-ac">Non-AC car</option>
                    </select>
                  </FormGroup> */}
                </Col>
                <Col lg="3">
                  <Button className="search_btn btn" type="submit">
                    <span className="reqacall">Search</span>
                  </Button>
                  {/* <botton>Search</botton> */}
                </Col>
              </Row>
            </ValidatorForm>
            <Col lg="12">
              {a.journeydate !== "" && a.returndate !== "" ? (
                <h3 className="findcartext">
                  Your Journey Date :-
                  <span className="findcartextdt">{a.deliverydate}</span> <br />
                  Return Date :-
                  <span className="findcartextdt">{a.returndate}</span>
                </h3>
              ) : (
                ""
              )}

              <div className="d-flex align-items-center gap-3 mb-5">
                {/* <span className='d-flex align-items-center gap-2'>
                  <i className="ri-sort-asc"></i>Sort By
                </span> */}
                {/* <select >
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select> */}
              </div>
            </Col>

            {cars.map((item) => (
              <CarItem item={item} key={item.key} />
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default CarListing;
