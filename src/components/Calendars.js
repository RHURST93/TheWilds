import React from "react";
import Header from "../components/header.js";
import { photos } from "./photo.js";
import paintedbunting from "../assets/paintedbunting.jpg";
import herron from "../assets/herron.jpg";
import scissortail from "../assets/scissortail.jpg";
const calendarPhotos = [
  {
    id: 1,
    name: 'Birds',
    description: 'Beautiful bird species to pass the days with.',
    image: scissortail,
  },
  {
    id: 2,
    name: 'Flowers',
    description: 'Beautiful flowers to brighten up your day.',
    image: paintedbunting,
  },
  {
    id: 3,
    name: 'Land Animals',
    description: 'Beautiful land animals for viewing pleasure.',
    image: herron,
  }
]

const Calendars = () => {
  return (
    <>
      <Header />
      <div className=" p-6 bg-zinc-950 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {calendarPhotos.map ((photo) => (
          <div
          key={calendarPhotos.id}
          className="card bg-base-100 shadow-xl flex flex-col"
        >
          <figure>
            <img src={photo.image} alt={photo.name} className="w-full h-auto object-cover" />
          </figure>
          <div className="card-body flex-grow">
          <h2 className="card-title">{photo.name}</h2>
          <p>{photo.description}</p>
          </div>
        </div>
        ))}
        
      </div>
    </>
  );
};

export default Calendars;
