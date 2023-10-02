import { useState } from "react";

import "./App.css";
// import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import SearchNPicture from "./components/SearchNPicture/SearchNPicture";
import Container from "./components/Container/Container";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Container />
    </>
  );
}

export default App;
