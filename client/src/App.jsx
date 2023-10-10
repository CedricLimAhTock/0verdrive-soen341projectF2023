import react from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./pages/Browse";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Browse />
              </Layout>
            }
          />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
