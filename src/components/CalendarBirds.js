import React from "react";
import Header from "./header.js";
import { photos } from "../components/photo.js";
import paintedbunting from "../assets/paintedbunting.jpg";
import scissortail from "../assets/scissortail.jpg";
import herron from "../assets/herron.jpg";

const birdphotos = [
  {
    id: 1,
    title: "Canvas",
    image: paintedbunting,
    name: "Painted Bunting",
    description: "Painted Bunting perched on a branch.",
    link: "/Canvas",
    price: "$29.99",
  },
  {
    id: 2,
    title: "Calendars",
    name: "Great Blue Herron",
    image: herron,
    description: "Herron skimming over sunset waters.",
    link: "/calendars",
    price: "$29.99",
  },
  {
    id: 3,
    title: "Prints",
    image: scissortail,
    name: "Scissortail Flycatcher",
    description: "Scissortail perched on a stem looking for food.",
    link: "/prints",
    price: "$29.99",
  },
];

const CalendarBirds = () => {
  return (
    <>
      <Header />

      <h1 className="text-center text-3xl text-white bg-zinc-950 p-6">
        Bird Calendars
      </h1>
      <div className=" p-6 bg-zinc-950 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {birdphotos.map((photo) => (
          <div
            key={photo.id}
            className="card bg-base-100 shadow-xl flex flex-col"
          >
            <figure>
              <img
                className="rounded-lg w-full h-auto object-cover"
                src={photo.image}
                alt={photo.title}
              />
            </figure>
            <div className="card-body flex-grow">
              <h2 className="card-title">{photo.name}</h2>
              <p>{photo.description}</p>
              <div className="card-actions float-end">
                <h4 className="text-2xl mt-2 ">{photo.price}</h4>
                <button className="ml-10  btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
        ;
      </div>
    </>
  );
};

export default CalendarBirds;
