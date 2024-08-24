import React from "react";
import { Link } from "react-router-dom";
import paintedbunting from "../assets/paintedbunting.jpg";
import herron from "../assets/herron.jpg";
import scissortail from "../assets/scissortail.jpg";
import Canvas from "../components/Canvas.js";

export const photos = [
  {
    id: 1,
    title: "Canvas",
    image: paintedbunting,
    name: "Painted Bunting",
    description: "Painted Bunting perched on a branch.",
    link: "/Canvas",
  },
  {
    id: 2,
    title: "Calendars",
    name: "Great Blue Herron",
    image: herron,
    description: "Herron skimming over sunset waters.",
    link: "/calendars",
  },
  {
    id: 3,
    title: "Prints",
    image: scissortail,
    name: "Scissortail Flycatcher",
    description: "Scissortail perched on a stem looking for food.",
    link: "/prints",
  },
];

const PhotoGallery = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            to={photo.link}
            className="relative bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={photo.image}
              alt={photo.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-center text-white p-4">
                <h2 className="text-xl font-semibold mb-2">{photo.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
