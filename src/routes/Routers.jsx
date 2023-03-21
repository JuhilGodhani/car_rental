import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Register from "../components/Ui/Register";
import Login from "../components/Ui/Login";
import BookingForm from "../components/Ui/BookingForm";
import PaymentMethod from "../components/Ui/PaymentMethod";
import ProtectedRoute from "../components/ProtectedRoute";
import Conformpage from "../components/Ui/Conformpage";
import { UserAuthContextProvider } from "../components/context/UserAuthContext";
// import CarDetails from "../pages/CarDetails";
import Profile from "../pages/Profile";
// import AdminLogin from "../Admin/Ui/AdminLogin";
// import AdminRegister from "../Admin/Ui/AdminRegister";
// import Adminpanel from "../Admin/page/Adminpanel";

const Routers = () => {
  const userdata = JSON.parse(localStorage.getItem("userLoginDatas"));
  return (
    <div>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/cars" element={<CarListing />}></Route>
          <Route path="/cars/:slug" element={<CarDetails />}></Route>
          <Route path="/blogs" element={<Blog />}></Route>
          <Route path="/blogs/:slug" element={<BlogDetails />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/conformpage" element={<Conformpage />}></Route>
          <Route path="/cardetails" element={<CarDetails />}></Route>

          {userdata?.email !== " " ? (
            <>
              <Route
                path="/bookingform"
                element={<ProtectedRoute Cmp={BookingForm} />}
              ></Route>
              <Route
                path="/paymentmethod"
                element={<ProtectedRoute Cmp={PaymentMethod} />}
              ></Route>
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </>
          )}

          <Route path="/*" element={<NotFound />}></Route>
          {/* <AdminAuthContextProvider>
            <Route path="/aregister" element={<AdminRegister />}></Route>
            <Route path="/alogin" element={<AdminLogin />}></Route>
          </AdminAuthContextProvider> */}
        </Routes>
      </UserAuthContextProvider>
      {/* <AdminAuthContextProvider>
        <Routes></Routes>
      </AdminAuthContextProvider> */}
    </div>
  );
};

// const Router = () => {
//   return (
//     <AdminAuthContextProvider>
//     <Routes>
//     <Route path="/adminpanel" element={<Adminpanel />}></Route>
//       <Route path="/aregister" element={<AdminRegister />}></Route>
//       <Route path="/alogin" element={<AdminLogin />}></Route>
//     </Routes>
//     </AdminAuthContextProvider>
//   );
// };

export default Routers;
// export {Router};
