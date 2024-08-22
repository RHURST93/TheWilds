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
      <div className="p-6 bg-zinc-950 grid grid-cols-4 sm:grid-cols-2  gap-6">
        {photos.map((photo) => (
          <div className="col-span-1  card bg-base-100  shadow-xl">
            <figure>
              <img src={photo.image} alt={photo.description} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{photo.name}</h2>
              <p>{photo.description}</p>

              <h4 className="bg-slate-200 -mb-3 p-2 rounded-lg">Size</h4>

              <ul className="menu menu-horizontal bg-base-200 rounded-lg">
                {["12x14", "14x16", "18x20"].map((size) => (
                  <li key={size}>
                    <a
                      className={
                        selectedSize[photo.id] === size ? "active" : ""
                      }
                      onClick={() => handleSizeClick(photo.id, size)}
                    >
                      {size}
                    </a>
                  </li>
                ))}
                
              </ul>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary mr-8 mb-5">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Canvas;
