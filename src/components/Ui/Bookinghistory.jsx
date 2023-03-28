import React, { useEffect, useState } from "react";
import { dbs } from "../userfirebase/userfirebase";
import {
  ref,
  child,
  onValue,
  set,
  get,
  update,
  remove,
} from "firebase/database";
import moment from "moment/moment";
import { BsCurrencyRupee } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import "../../style/bookinghistory.css";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  ModalFooter,
} from "reactstrap";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { width } from "@mui/system";
import img from "../../../src/assests/all-images/no data found.jpg";

const Bookinghistory = () => {
  const [Search, setSearch] = useState(false);
  const [Tabledata, setTabledata] = useState([]);
  const [Filterdatas, setFilterdatas] = useState([]);
  const [Query, setQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [Opendata, setOpendata] = useState([]);
  const [usersele, setUsersele] = useState("");
  const [cardata, setcardata] = useState([]);

  const opensearch = () => {
    setSearch(true);
  };

  const hendalsearch = (e) => {
    const getsearch = e.target.value;
    // console.log("juhil", getsearch);

    if (getsearch) {
      // const getsearch = e.target.value;
      const searchdata = Filterdatas.filter((item) => {
        console.log("item", item);
        return (
          item.data.firstname.toLowerCase().includes(getsearch) ||
          item.data.lastname.toLowerCase().includes(getsearch) ||
          // item.data.email.toLowerCase().includes(getsearch) ||
          item.data.phonenumber.toLowerCase().includes(getsearch) ||
          item.data.deliverylocation.toLowerCase().includes(getsearch) ||
          //   item.data.pickuplocation.toLowerCase().includes(getsearch) ||
          //   item.data.checkboxclick.toLowerCase().includes(getsearch) ||
          // item.data.radioValue.toLowerCase().includes(getsearch) ||
          String(item?.data?.carprice)?.includes(getsearch) ||
          item.data.deliverydate.toLowerCase().includes(getsearch) ||
          item.data.carname.toLowerCase().includes(getsearch) ||
          item.data.status.toLowerCase().includes(getsearch) ||
          item.data.orderno.toLowerCase().includes(getsearch) ||
          //   item.data.journeytime.toLowerCase().includes(getsearch) ||
          item.data.date.toLowerCase().includes(getsearch)
          //   item.data.time.toLowerCase().includes(getsearch)
        );
      });
      setTabledata(searchdata);
      // this.setState({ tableData: searchdata });
    } else {
      setTabledata(Filterdatas);
      // this.setState({ tableData: this.state.filterdatas });
    }
    setQuery(getsearch);
    // this.setState({ query: getsearch });
  };

  const handleSele = async (event) => {
    let name = event.target.name;
    let value = event.target.value;
    // console.log(value);

    setUsersele(value);

    if (value === "Pending") {
      const scartype = await cardata.filter((row) => {
        if (row.data.status === "Pending") {
          return row;
        }
      });
      setTabledata(scartype);
    } else if (value === "Completed") {
      const scartype = await cardata.filter((row) => {
        if (row.data.status === "Completed") {
          return row;
        }
      });
      setTabledata(scartype);
    } else if (value === "Process") {
      const scartype = await cardata.filter((row) => {
        if (row.data.status === "Process") {
          return row;
        }
      });
      setTabledata(scartype);
    } else if (value === "Alldata") {
      const scartype = await cardata.filter((row) => {
        setUsersele(null);
        return row;
      });
      setTabledata(scartype);
    }
  };

  const opendata = (row) => {
    console.log("row241", row.data);
    setModal(true);
    setOpendata(row.data);
  };

  useEffect(() => {
    const dbRef = ref(dbs, "BookingData");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      const userLoginDatas = JSON.parse(localStorage.getItem("userLoginDatas"));
      //   const currentdate = new Date().toLocaleDateString();
      let data = records.filter((row) => {
        if (row.data.email === userLoginDatas.email) {
          return row;
        }
      });
      setTabledata(data);
      setFilterdatas(data);
      setcardata(data);
    });
  }, []);

  return (
    <>
      <div id="bookinghistory">
        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>My Booking History</h3>

              {Search === true ? (
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Col>
                    <FormControl
                      className="selectitem"
                      style={{ width: "100%" }}
                    >
                      <InputLabel
                        id="demo-simple-select-helper-label"
                        style={{ color: "var(--dark)" }}
                      >
                        Status
                      </InputLabel>
                      <Select
                        className="selectitem cartype"
                        value={usersele}
                        name="status"
                        label="status"
                        onChange={handleSele}
                        style={{ padding: 27, color: "var(--dark)" }}
                      >
                        <MenuItem value="Alldata">None</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Process">Process</MenuItem>
                      </Select>
                    </FormControl>
                  </Col>
                  <Col>
                    <div className="form-input">
                      <input
                        type="search"
                        placeholder="Search..."
                        value={Query}
                        onChange={(e) => {
                          // this.setState({ query: e.target.value });
                          hendalsearch(e);
                        }}
                      />
                      <button type="submit" className="search-btn">
                        <i className="bx">
                          <BiSearchAlt />
                        </i>
                      </button>
                    </div>
                  </Col>
                </Row>
              ) : (
                <i className="bx bx1" onClick={opensearch}>
                  <BiSearchAlt />
                </i>
              )}
              {/* <i className="bx bx-filter"></i> */}
            </div>
            <table>
              <thead>
                <tr>
                  {/* <th></th> */}
                  {/* <th>No.</th> */}
                  <th className="text-center">Order No.</th>
                  <th className="text-center">Full Name</th>
                  {/* <th>Email</th> */}
                  <th className="text-center">Car Name</th>
                  <th className="text-center">Phone Number</th>
                  <th className="text-center">Starting Location</th>
                  {/* <th>Pickup Location</th> */}
                  <th className="text-center">Departure Date</th>
                  {/* <th>Journey Time</th> */}
                  {/* <th>Other Details</th> */}
                  <th className="text-center">Total Payment</th>
                  {/* <th>Policy click</th> */}
                  <th className="text-center">Booking Date</th>
                  {/* <th>Booking Time</th> */}
                  {/* <th>Action</th> */}
                  <th className="text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {Tabledata?.length !== 0 ? (
                  Tabledata.map((row, index) => {
                    return (
                      <tr key={index + 1}>
                        {/* <td></td> */}
                        {/* <td>{index + 1}</td> */}
                        <td className="name1">{row.data.orderno}</td>
                        <td
                          className="name1"
                          role="button"
                          onClick={() => {
                            {
                              opendata(row);
                              console.log("rows", row);
                            }
                          }}
                        >
                          {row.data.firstname} {row.data.lastname}
                        </td>
                        {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}

                        {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {/* <td>{row.data.email}</td> */}
                        <td className="name1">{row.data.carname}</td>
                        <td className="name1">{row.data.phonenumber}</td>
                        <td className="name1">{row.data.deliverylocation}</td>
                        {/* <td className="name1">{row.data.pickuplocation}</td> */}
                        <td className="name1">{row.data.deliverydate}</td>
                        {/* <td className="name1">
                          {moment(row.data.journeytime, "hh:mm A").format("LT")}
                        </td> */}
                        {/* <td>{row.data.msg}</td> */}
                        <td className="name1">
                          <BsCurrencyRupee />
                          {row.data.carprice}
                        </td>
                        {/* <td className="name1">{row.data.checkboxclick}</td> */}
                        <td className="name1">{row.data.date}</td>
                        <td>
                          <span
                            className={
                              row.data.status === "Pending"
                                ? "status pending"
                                : row.data.status === "Completed"
                                ? "status completed"
                                : row.data.status === "Process"
                                ? "status process"
                                : "status"
                            }
                          >
                            {row.data.status}
                          </span>
                        </td>
                        {/* <td className="name1">{row.data.time}</td> */}
                        {/* <td>
                <Row className="d-flex justify-content-center">
                  <Col lg="4">
                    <EditUserContact record={row.data} />
                  </Col>
                  <Col lg="4">
                    <div className="del">
                      <MdDelete
                        // username={row.data.currenttime}
                        record={row.data}
                        // onClick={() => this.delete(row)}
                      />
                    </div>
                  </Col>
                </Row>
              </td> */}
                      </tr>
                    );
                  })
                ) : (
                  <div className="nodata">
                    <img className="nofoundimg" src={img} />
                    <td className="nodatafound">No Booking Found</td>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        centered
        size="lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
        style={{ width: "45%" }}
      >
        <ModalHeader
          toggle={() => setModal(!modal)}
          className="pe-5 mt-1 txtcen"
        >
          <h1 className="titles">
            {Opendata.firstname}
            <span>'s</span> Booking History
          </h1>
        </ModalHeader>
        <ModalBody>
          <Row className="d-flex justify-content-center ">
            <Row>
              <div className="detailbox">
                <Row className="alltxt">
                  <div className="setimg">
                    <img className="setimg_under" src={Opendata.carimg} />
                  </div>
                </Row>
                <Row className="alltxt">
                  <Col lg="4" className="sameque">
                    Car Model
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="6" className="sameans">
                    {Opendata.carmodel}
                  </Col>
                </Row>
                <Row className="alltxt">
                  <Col lg="4" className="sameque">
                    Car Type
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="6" className="sameans">
                    {Opendata.cartype}
                  </Col>
                </Row>
                {/* <Row className="alltxt">
                  <Col lg="4" className="sameque">
                    Departure Time
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="6" className="sameans">
                    {moment(Opendata.journeytime, "hh:mm A").format("LT")}
                  </Col>
                </Row> */}
                <Row className="alltxt">
                  <Col lg="4" className="sameque">
                    Ending Location
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="6" className="sameans">
                    {Opendata.pickuplocation}
                  </Col>
                </Row>
                <Row className="alltxt">
                  <Col lg="4" className="sameque">
                    Return Date
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="6" className="sameans">
                    {Opendata.returndate}
                  </Col>
                </Row>
                <Row className="alltxt">
                  <Col lg="4" className="sameque">
                    Other Details
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="6" className="sameans othermsg">
                    {Opendata.msg}
                  </Col>
                </Row>

                <Row className="alltxt">
                  <Col lg="4" className="sameque">
                    Policy click
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="6" className="sameans">
                    {Opendata.checkboxclick}
                  </Col>
                </Row>
                <Row className="alltxt">
                  <Col lg="4" className="sameque">
                    Booking Time
                  </Col>
                  <Col lg="1" className="sameque">
                    :
                  </Col>
                  <Col lg="6" className="sameans">
                    {Opendata.time}
                  </Col>
                </Row>
              </div>
            </Row>
          </Row>
        </ModalBody>
        {/* <ModalFooter className="justify-content-center mfooter">
          <botton className="acceptbtn" onClick={() => setModal(false)}>
            Ok
          </botton>
        </ModalFooter> */}
      </Modal>
    </>
  );
};

export default Bookinghistory;
