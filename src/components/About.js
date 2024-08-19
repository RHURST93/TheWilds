import React from "react";
import lummi from "../assets/lummi.jpg";

const About = () => {
  

  return (
    <div className="bg-zinc-950 p-6 relative">
      <div className="relative bg-zinc-950 border-4 border-lime-950">
        
          
        
          <h1 className="text-white text-center text-3xl m-4">
            About
          </h1>
        
      </div>

      <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <img
            className="rounded-full"
            src={lummi}
            alt="portfolio photo"
            style={{ width: 250 }}
          />
          <div className="h-85 w-1 bg-lime-950 mx-auto"></div>
        </div>
        <div className="text-white text-lg text-center md:text-left">
          <p>
            As a dedicated wildlife photographer, I have spent the past three
            years capturing the raw beauty of nature. Equipped with a Nikon Z-7
            and a Nikkor 500mm lens, I immerse myself in the wilds, from dense
            forests to open plains, to document the incredible diversity of
            life. My portfolio ranges from the delicate grace of birds in flight
            to the majestic presence of bison roaming freely. Every shot I take
            is a testament to my passion for the natural world and my commitment
            to showcasing its splendor through my lens.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;