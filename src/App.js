import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhotoGallery from "./components/photo.js";
import Canvas from "./components/Canvas.js";
import Calendars from "./components/Calendars.js";
import Prints from "./components/Prints.js";
import Header from "./components/header.js";
import SmoothScrollHero from "./components/Hero.js";
import About from "./components/About";
import Main from "./components/Main.js";
import PrintProduct from "./components/PrintProduct.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Canvas" element={<Canvas />} />
        <Route path="/Calendars" element={<Calendars />} />
        <Route path="/Prints" element={<Prints />} />
        <Route path="/PrintProduct" element={<PrintProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
