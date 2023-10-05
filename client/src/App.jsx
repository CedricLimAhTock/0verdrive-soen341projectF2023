import react from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
// function App() {
//   return (
//     <>
//       <Router>
//         <div>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <Layout>
//                   <Home />
//                 </Layout>
//               }
//             />
//           </Routes>
//         </div>
//       </Router>
//     </>
//   );
// }

function App() {
  return <Signin />;
}

export default App;
