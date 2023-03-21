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
    if (usersele === "AC Car") {
      setArr(ACcarData);
      localStorage.setItem("AC&Non-AC", "AC Car");
    } else {
      setArr(CarData);
      localStorage.setItem("AC&Non-AC", "Non-AC Car");
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
    });

    if (a.cartype === "Non-AC Car") {
      localStorage.setItem("AC&Non-AC", a.cartype);
      // console.log("a.cartype :>> ", a.cartype);
      setUsersele(a.cartype);
      setArr(CarData);
    } else {
      localStorage.setItem("AC&Non-AC", "AC Car");
      setUsersele(a.cartype);
      // setUsersele("AC Car");
      setArr(ACcarData);
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
                    label="AC or Non-AC"
                    name="ACNonAc"
                    onChange={handleSele}
                  >
                    <MenuItem value="AC Car">AC Car</MenuItem>
                    <MenuItem value="Non-AC Car">Non-AC Car</MenuItem>
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

            {Cardata.map((item) => (
              <CarItem item={item} key={item.key} />
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default CarListing;
