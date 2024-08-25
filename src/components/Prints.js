import React, { useState } from "react";
import Header from "../components/header.js";
import { photos } from "../components/photo.js";

const Prints = () => {
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
      <div className="p-6 bg-zinc-950 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="card bg-base-100 shadow-xl flex flex-col"
          >
            <figure className="relative object-cover mb-8 overflow-hidden ">
              <img
                src={photo.image}
                alt={photo.description}
                className="w-full  h-50 object-cover object-center transition-transform duration-300 ease-in-out"
                style={{ objectPosition: "center top" }}
              />
            </figure>
            <div className="card-body flex-grow p-4">
              <h2 className="card-title text-lg font-semibold">{photo.name}</h2>
              <p className="text-sm">{photo.description}</p>

              <h4 className="bg-slate-200 p-2 rounded-t-lg mt-4 w-full">Size</h4>

              <ul className="menu menu-verticle bg-base-200 -mt-3 rounded-b-lg flex flex-wrap ">
                {["4x6", "5x7", "8x10"].map((size) => (
                  <li key={size} className="mr-2 mb-2">
                    <a
                      className={
                        selectedSize[photo.id] === size
                          ? "text-blue-500 font-bold"
                          : "text-gray-700"
                      }
                      onClick={() => handleSizeClick(photo.id, size)}
                    >
                      {size}
                    </a>
                  </li>
                ))}
              </ul>
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

export default Prints;
