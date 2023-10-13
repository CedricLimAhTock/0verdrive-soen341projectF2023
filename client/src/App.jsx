import react from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Detailed from "./pages/Detailed";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/detailed" element={<Layout><Detailed/></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard/></Layout>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;