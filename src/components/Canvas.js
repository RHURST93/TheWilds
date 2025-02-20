import React, { useState, useContext } from "react";
import Header from "../components/header.js";
import { photos, CANVAS_PRICES, formatPrice } from "../utils/utils.js";
import { CartContext } from "../utils/cartContext.js";

const Canvas = () => {
  const [selectedSize, setSelectedSize] = useState({});
  const [quantities, setQuantities] = useState({});
  const { addToCart, getProductQuantity } = useContext(CartContext);
  const [addedToCart, setAddedToCart] = useState({});

  const canvasPhotos = photos.filter(photo => photo.availableOnCanvas);

  const handleSizeClick = (photoId, size) => {
    setSelectedSize((prevState) => ({
      ...prevState,
      [photoId]: size,
    }));
    
    setQuantities(prev => ({
      ...prev,
      [photoId]: 1
    }));
  };

  const handleQuantityChange = (photoId, change) => {
    setQuantities(prev => {
      const currentQty = prev[photoId] || 1;
      const newQty = Math.max(1, currentQty + change); // Prevent going below 1
      return {
        ...prev,
        [photoId]: newQty
      };
    });
  };

  const handleAddToCart = (photo, size) => {
    if (!size) {
      alert("Please select a size first");
      return;
    }
    
    const quantity = quantities[photo.id] || 1;
    
    const canvasProduct = {
      ...photo,
      productType: "canvas",
      productSubtype: "canvas",
      name: `${photo.name} canvas`,
      prices: { ...photo.canvasPrices }
    };
    
    if (!canvasProduct.prices[size]) {
      alert(`Sorry, the ${size} size is not available for canvas prints.`);
      return;
    }
    
    addToCart(canvasProduct, size, quantity);

    setAddedToCart(prev => ({
      ...prev,
      [photo.id]: true
    }));

    setTimeout(() => {
      setAddedToCart(prev => ({
        ...prev,
        [photo.id]: false
      }));
    }, 2000);
  };

  return (
    <>
      <Header />
      <div className="p-6 bg-zinc-950">
        <h1 className="text-2xl font-bold text-white mb-6">Canvas Prints</h1>
        <p className="text-white mb-6">
          Our premium canvas prints are gallery-wrapped and ready to hang. 
          Each canvas is printed on high-quality material and stretched over 
          a solid wood frame with a depth of 1.5 inches.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {canvasPhotos.map((photo) => (
            <div
              key={photo.id}
              className="card bg-base-100 shadow-xl flex flex-col hover:shadow-2xl transition-shadow duration-300"
            >
              <figure className="relative object-cover mb-4 overflow-hidden group">
                <img
                  src={photo.image}
                  alt={photo.description}
                  className="w-full h-[200px] object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                  style={{ objectPosition: "center top" }}
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Canvas
                </div>
              </figure>
              <div className="card-body flex-grow p-4">
                <h2 className="card-title text-lg font-semibold">{photo.name} canvas</h2>
                <p className="text-sm text-gray-600">{photo.description}</p>

                <div className="mt-4">
                  <h4 className="bg-slate-200 p-2 rounded-t-lg w-full font-medium">Select Canvas Size</h4>
                  <ul className="menu bg-base-200 rounded-b-lg p-2 flex flex-wrap gap-2">
                    {Object.entries(CANVAS_PRICES).map(([size, price]) => (
                      <li key={size}>
                        <button
                          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                            selectedSize[photo.id] === size
                              ? "bg-blue-500 text-white font-semibold"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                          onClick={() => handleSizeClick(photo.id, size)}
                        >
                          <span>{size}</span>
                          <span className="font-medium">{formatPrice(price)}</span>
                          {getProductQuantity(photo.id, size) > 0 && (
                            <span className="ml-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs">
                              {getProductQuantity(photo.id, size)} in cart
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedSize[photo.id] && (
                  <div className="mt-4">
                    <h4 className="bg-slate-200 p-2 rounded-t-lg w-full font-medium">Quantity</h4>
                    <div className="bg-base-200 rounded-b-lg p-3 flex items-center justify-between">
                      <button 
                        className="btn btn-sm btn-circle bg-gray-300 hover:bg-gray-400"
                        onClick={() => handleQuantityChange(photo.id, -1)}
                        disabled={(quantities[photo.id] || 1) <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2 font-semibold text-lg">
                        {quantities[photo.id] || 1}
                      </span>
                      <button 
                        className="btn btn-sm btn-circle bg-gray-300 hover:bg-gray-400"
                        onClick={() => handleQuantityChange(photo.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="card-actions p-4 pt-0">
                <button
                  className={`btn w-full ${
                    selectedSize[photo.id]
                      ? addedToCart[photo.id]
                        ? "btn-success"
                        : "btn-primary"
                      : "btn-disabled bg-gray-300"
                  }`}
                  onClick={() => handleAddToCart(photo, selectedSize[photo.id])}
                  disabled={!selectedSize[photo.id]}
                >
                  {addedToCart[photo.id]
                    ? "✓ Added!"
                    : selectedSize[photo.id]
                    ? `Add ${quantities[photo.id] || 1} to Cart - ${formatPrice(photo.canvasPrices[selectedSize[photo.id]] * (quantities[photo.id] || 1))}`
                    : "Select Size"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Canvas;