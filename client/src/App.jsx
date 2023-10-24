import react, {useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./pages/Browse";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Detailed from "./pages/Detailed";
import Dashboard from "./pages/Dashboard";
import jwt_decode from "jwt-decode";

function App() {
  const token = localStorage.getItem("jwtToken"); 
  const decodedToken = token ? jwt_decode(token) : null;

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Layout props={decodedToken}>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/detailed"
            element={
              <Layout>
                <Detailed />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/browse"
            element={
              <Layout>
                <Browse />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
