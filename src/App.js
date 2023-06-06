import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import WeatherForcast from "./pages/WeatherForcast";

function App() {
  const [receivedData, setReceivedData] = useState("");

  const handleFormSubmit = (data) => {
    setReceivedData(data);
  };

  return (
    <Routes>
      <Route path="/" element={<Main submitHandler={handleFormSubmit} />} />
      <Route
        path="/weatherforcast"
        element={<WeatherForcast data={receivedData} />}
      />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;