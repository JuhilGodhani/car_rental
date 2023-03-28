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
import Box from '@mui/material/Box';
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
import { async } from "q";

const CarListing = () => {
  const [usersele, setUsersele] = useState("");
  const [Cardata, setCardata] = useState([]);
  const [cars, setcars] = useState([]);
  const [Arr, setArr] = useState(CarData);

  const handleSele = async (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUsersele(value);
    if (value === "Sedan") {
      const scartype = await Cardata.filter((row) => {
        if (row.data.cartype === "Sedan") {
          return row;
        }
      });
      setcars(scartype);
    } else if (value === "SUV") {
      const scartype = await Cardata.filter((row) => {
        if (row.data.cartype === "SUV") {
          return row;
        }
      });
      setcars(scartype);
    } else if (value === "Coupe") {
      const scartype = await Cardata.filter((row) => {
        if (row.data.cartype === "Coupe") {
          return row;
        }
      });
      setcars(scartype);
    } else if (value === "PickupTrucks") {
      const scartype = await Cardata.filter((row) => {
        if (row.data.cartype === "PickupTrucks") {
          return row;
        }
      });
      setcars(scartype);
    } else if (value === "none") {
      const scartype = await Cardata.filter((row) => {
        // setUsersele(null);
        return row;
      });
      setcars(scartype);
    }
  };

  const Search = (e) => {
    e.preventDefault();
    if (usersele === "Sedan") {


      const Sedancars = Cardata.filter((row) => {
        if (row.data.cartype === "Sedan") {
          return row;

        }
      });

      setcars(Sedancars);
    } else if (usersele === "SUV") {
      const SUVcars = Cardata.filter((row) => {
        if (row.data.cartype === "SUV") {
          return row;

        }
      });

      setcars(SUVcars);
    } else if (usersele === "Coupe") {
      const Coupecars = Cardata.filter((row) => {
        if (row.data.cartype === "Coupe") {
          return row;

        }
      });

      setcars(Coupecars);
    } else if (usersele === "PickupTrucks") {
      const PickupTruckscars = Cardata.filter((row) => {
        if (row.data.cartype === "PickupTrucks") {
          return row;

        }
      });

      setcars(PickupTruckscars);
    } else if (usersele === "AllCar") {
      setUsersele(null);
      setcars(Cardata);
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
      if (a.cartype === "Sedan") {
        const Sedancars = records.filter((row) => {
          if (row.data.cartype === a.cartype) {
            return row;
          }
        });
        setUsersele(a.cartype);
        setcars(Sedancars);
      } else if (a.cartype === "SUV") {
        const Sedancars = records.filter((row) => {
          if (row.data.cartype === a.cartype) {
            return row;
          }
        });
        setUsersele(a.cartype);
        setcars(Sedancars);
      } else if (a.cartype === "Coupe") {
        const Sedancars = records.filter((row) => {
          if (row.data.cartype === a.cartype) {
            return row;
          }
        });
        setUsersele(a.cartype);
        setcars(Sedancars);
      } else if (a.cartype === "PickupTrucks") {
        const Sedancars = records.filter((row) => {
          if (row.data.cartype === a.cartype) {
            return row;
          }
        });
        setUsersele(a.cartype);
        setcars(Sedancars);
      }
    });
  }, []);

  console.log("usersele", usersele);
  return (
    <div title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            {/* <ValidatorForm onSubmit={Search}>
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
                    <MenuItem value="AllCar">All Cars</MenuItem>
                    <MenuItem value="Sedan">Sedan</MenuItem>
                    <MenuItem value="SUV">SUV</MenuItem>
                    <MenuItem value="Coupe">Coupe</MenuItem>
                    <MenuItem value="PickupTrucks">Pickup Trucks</MenuItem>
                  </TextValidator>
                
                 
                </Col>
                <Col lg="3">
                  <Button className="search_btn btn" type="submit">
                    <span className="reqacall">Search</span>
                  </Button>
               
                </Col>
              </Row>
            </ValidatorForm> */}
            <Col>
           
              <FormControl 
               className="selectitem" 
               style={{ width: "10%",borderRadius:'10px',height:'80px' }}
              >
                <InputLabel  style={{ color: "var(--dark)",marginTop:'-40px',fontWeight:'200',fontSize:"25px" }}
                >
                  Car Type
                </InputLabel>
                <Select
             

                  className="selectitem cartype"
                  value={usersele}
                  name="cartype"
                  label="Cartype"
                  onChange={handleSele}
                  style={{ padding: 27, color: "var(--dark)", height: '10px', marginTop: '10px', }}
                >
                  <MenuItem value="none">None of these</MenuItem>
                  <MenuItem value="Sedan">Sedan</MenuItem>
                  <MenuItem value="SUV">SUV</MenuItem>
                  <MenuItem value="Coupe">Coupe</MenuItem>
                  <MenuItem value="PickupTrucks">Pickup Trucks</MenuItem>
                </Select>
              </FormControl>
             
            </Col>
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
