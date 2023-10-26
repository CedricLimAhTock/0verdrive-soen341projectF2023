import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Layout.css";
const Layout = ({ children, decodedToken}) => {
  return (
    <div>
      <Header decodedToken={decodedToken}/>
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
