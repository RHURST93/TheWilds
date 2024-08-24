import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header.js";
import scissortail from "../assets/scissortail.jpg";
import paintedbunting from "../assets/paintedbunting.jpg";
import Bison from "../assets/Bison.jpg";

const calendarPhotos = [
  {
    id: 1,
    name: "Birds",
    description: "Beautiful bird species to pass the days with.",
    image: scissortail,
    link: "/CalBirds",
  },
  {
    id: 2,
    name: "Flowers",
    description: "Beautiful flowers to brighten up your day.",
    image: paintedbunting,
    link: "/CalFlowers",
  },
  {
    id: 3,
    name: "Land Animals",
    description: "Beautiful land animals for viewing pleasure.",
    image: Bison,
    link: "/CalAnimals",
  },
  {
    id: 4,
    name: "Landscapes",
    image: scissortail,
    link: "/CalLandscape",
  },
];

const Calendars = () => {
  return (
    <>
      <Header />
      <h1 className="bg-zinc-950 text-center text-white p-6 text-3xl">
        Calendars
      </h1>
      <div className="p-6 bg-zinc-950 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {calendarPhotos.map((photo) => (
          <Link
            className="card bg-base-100 shadow-xl flex flex-col"
            key={photo.id}
            to={photo.link}
          >
            <figure>
              <img
                src={photo.image}
                alt={photo.name}
                className="w-full h-auto object-cover"
              />
            </figure>
            <div className="card-body flex-grow">
              <h2 className="card-title">{photo.name}</h2>
              <p>{photo.description}</p>
            </div>
          </Link>
        ))}
        ;
      </div>
    </>
  );
};

export default Calendars;
