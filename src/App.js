import React, { useEffect } from "react";
import Layout from "./components/Layout/Layout";
// import AdminLayout from "./components/Layout/AdminLayout";
// import Home from "./pages/Home";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const PUBLIC_KEY =
  "pk_test_51Mjya5SHUioN0kDXuWnRh4ecHV5YyyMOePIrDrftVmP8WPp7bklex8TdF6OqgBhBBgrpWsykawfnsuvypc4BYb0d00noS2PS04";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

function App() {
  // const logintype = localStorage.getItem("Login type");
  // console.log(logintype, "logintype");
  // const A = () => {
  //   if (logintype === "admin") {
  //     <AdminLayout />;
  //   } else {
  //     <Layout />;
  //   }
  // };
  const userLoginDatas = localStorage.getItem("userLoginDatas");
  // const adminLoginDatas = localStorage.getItem("adminLoginDatas");
  const lgtype = localStorage.getItem("lgtype");
  useEffect(() => {
    if (!userLoginDatas) {
      localStorage.setItem(
        "userLoginDatas",
        JSON.stringify({
          // username: " ",
          email: " ",
          password: " ",
        })
      );
    }
    window.localStorage.setItem("username", "");

    window.localStorage.setItem(
      "userBookingdata",
      JSON.stringify({
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        deliverylocation: "",
        pickuplocation: "",
        deliverydate: "",
        journeytime: "",
        msg: "",
        radioValue: "",
        checkboxclick: "",
      })
    );
    // if (!adminLoginDatas) {
    //   localStorage.setItem(
    //     "adminLoginDatas",
    //     JSON.stringify({
    //       username: " ",
    //       email: " ",
    //       password: " ",
    //     })
    //   );
    // }
    if (!lgtype) {
      localStorage.setItem("lgtype", "Login");
    }
  }, []);
  return (
    <>
      <Elements stripe={stripeTestPromise}>
        <Layout />
      </Elements>
      {/* {window.localStorage.setItem("Login type", "user")} */}
      {/* {logintype && logintype === "admin" ? <AdminLayout /> : <Layout />} */}
      {/* {logintype === "user" || " " ? <Layout/> : <AdminLayout/>} */}
      {/* <Layout/> */}
    </>
  );

  // /* logintype === "admin" ? <AdminLayout /> : <Layout /> */
  // return(
  //   <>
  //     <Layout/>
  //     {/* <AdminLayout/> */}
  //   </>
  // )
}

// import React, { useEffect } from "react";
// import Layout from "./components/Layout/Layout";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// const PUBLIC_KEY =
//   "pk_test_51Mjya5SHUioN0kDXuWnRh4ecHV5YyyMOePIrDrftVmP8WPp7bklex8TdF6OqgBhBBgrpWsykawfnsuvypc4BYb0d00noS2PS04";
// const stripeTestPromise = loadStripe(PUBLIC_KEY);

// function App() {
//   const userLoginDatas = localStorage.getItem("userLoginDatas");
//   // const adminLoginDatas = localStorage.getItem("adminLoginDatas");
//   const lgtype = localStorage.getItem("lgtype");
//   useEffect(() => {
//     if (!userLoginDatas) {
//       localStorage.setItem(
//         "userLoginDatas",
//         JSON.stringify({
//           email: " ",
//           password: " ",
//         })
//       );
//     }
//     window.localStorage.setItem("username", "");
//     window.localStorage.setItem(
//       "userBookingdata",
//       JSON.stringify({
//         firstname: "",
//         lastname: "",
//         email: "",
//         phonenumber: "",
//         deliverylocation: "",
//         pickuplocation: "",
//         deliverydate: "",
//         journeytime: "",
//         msg: "",
//         radioValue: "",
//         checkboxclick: "",
//       })
//     );
//     if (!lgtype) {
//       localStorage.setItem("lgtype", "Login");
//     }
//   }, []);
//   return (
//     <>
//       <Elements stripe={stripeTestPromise}>
//         <Layout />
//       </Elements>
//     </>
//   );
// }

export default App;
