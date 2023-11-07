import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Browse from "./pages/Browse";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Detailed from "./pages/Detailed";
import BrokerDetailed from "./pages/BrokerDetailed";
import Dashboard from "./pages/Dashboard";
import jwt_decode from "jwt-decode";
import Page404 from "./pages/Page404";
import Brokers from "./pages/Brokers";
import { useNavigate } from "react-router-dom"; // Inside your component

function App() {
  const [decodedToken, setDecodedToken] = React.useState(null);
  function DashboardOrRedirect({ decodedToken }) {
    const navigate = useNavigate();

    useEffect(() => {
      if (!decodedToken) {
        navigate("/signin", { replace: true });
      }
    }, [decodedToken, navigate]);

    return decodedToken ? (
      <Layout decodedToken={decodedToken}>
        <Dashboard token={decodedToken} />
      </Layout>
    ) : null;
  }
  useEffect(() => {
    async function fetchData() {
      const token = await localStorage.getItem("jwtToken");
      const decoded = await jwt_decode(token);
      setDecodedToken(decoded);
    }

    fetchData();
  }, []);

  const user = localStorage.getItem("jwtToken");

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Layout decodedToken={decodedToken}>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/browse"
            element={
              <Layout decodedToken={decodedToken}>
                <Browse />
              </Layout>
            }
          />
          <Route
            path="/brokers"
            element={
              <Layout decodedToken={decodedToken}>
                <Brokers />
              </Layout>
            }
          />
          <Route
            path="/property/:id"
            element={
              <Layout decodedToken={decodedToken}>
                <Detailed decodedToken={decodedToken} />
              </Layout>
            }
          />
          <Route
            path="/detailed"
            element={
              <Layout decodedToken={decodedToken}>
                <Detailed />
              </Layout>
            }
          />
          <Route
            path="/brokerdetailed"
            element={
              <Layout decodedToken={decodedToken}>
                <BrokerDetailed />
              </Layout>
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              user ? (
                <Layout>
                  <Dashboard token={decodedToken} />
                </Layout>
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
