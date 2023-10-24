import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Layout.css";
const Layout = ({ children, props}) => {
  return (
    <div>
      <Header props={props}/>
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
