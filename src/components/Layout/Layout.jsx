import React, { useEffect, Fragment } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routes/Routers";
import { UserAuthContextProvider } from "../context/UserAuthContext";
import ProtectedRoute from "../ProtectedRoute";
import { L } from "../../routes/Routers";
import { Router } from "../../routes/Routers";
import "../../style/layout.css";

const Layout = () => {
  return (
    <>
      <Fragment>
        <UserAuthContextProvider>
          {/* <ProtectedRoute> */}
          <Header />

          {/* </ProtectedRoute> */}
        </UserAuthContextProvider>
        <div>
          <Routers />
          {/* <Router/> */}
        </div>
        <Footer />
      </Fragment>
      {/* <L/> */}
    </>
  );
};

export default Layout;
