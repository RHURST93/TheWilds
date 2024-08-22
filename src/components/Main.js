import React from "react";
import Header from "./header.js";
import SmoothScrollHero from "./Hero.js";
import About from "./About.js";
import PhotoGallery from "./photo.js";

const Main = () => {
  return (
    <div>
      <Header />
      <SmoothScrollHero />
      <About />
      <PhotoGallery />
    </div>
  );
};

export default Main;
