import React, { useState } from "react";
import Header from "../components/header.js";
import { photos } from "../components/photo.js";

const Canvas = () => {
  const [selectedSize, setSelectedSize] = useState({});

  const handleSizeClick = (photoId, size) => {
    setSelectedSize((prevState) => ({
      ...prevState,
      [photoId]: size,
    }));
  };

  return (
    <>
      <Header />
      <div className="p-6 bg-zinc-950 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="card bg-base-100 shadow-xl flex flex-col "
          >
            <figure>
              <img
                src={photo.image}
                alt={photo.description}
                className="w-full h-auto object-cover"
              />
            </figure>
            <div className="card-body flex-grow">
              <h2 className="card-title">{photo.name}</h2>
              <p>{photo.description}</p>
              <div className="flex flex-col">
                <h4 className="bg-slate-200 text-center text-xl p-2 z-20 rounded-t-lg w-full">
                  Size
                </h4>
                <ul className="menu menu-vertical w-full bg-base-200 rounded-b-lg flex justify-around p-2">
                  {["12x14", "14x16", "18x20"].map((size) => (
                    <li key={size} className="w-full text-center">
                      <a
                        className={`block p-2 ${
                          selectedSize[photo.id] === size ? "bg-primary text-white" : ""
                        }`}
                        onClick={() => handleSizeClick(photo.id, size)}
                      >
                        {size}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="card-actions flex-col items-center p-4">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Canvas;
