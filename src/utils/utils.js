import scissortail from '../assets/scissortail.jpg';
import herron from '../assets/herron.jpg';
import paintedbunting from '../assets/paintedbunting.jpg';

// Define fixed prices for each size
const PRINT_PRICES = {
  "4x6": 9.99,
  "5x7": 14.99,
  "8x10": 19.99
};

// Define canvas prices (separate from regular prints)
const CANVAS_PRICES = {
  "11x14": 39.99,
  "16x24": 60.00
};

const photos = [
  {
    id: 1,
    title: "Canvas",
    image: paintedbunting,
    name: "Painted Bunting",
    prices: {
      "4x6": 9.99,
      "5x7": 14.99,
      "8x10": 19.99
    },
    canvasPrices: {
      "11x14": 39.99,
      "16x24": 60.00
    },
    basePrice: 9.99, // Starting price
    description: "Painted Bunting perched on a branch.",
    link: "/Canvas",
    availableOnCanvas: true
  },
  {
    id: 2,
    title: "Calendars",
    name: "Great Blue Herron",
    image: herron,
    prices: {
      "4x6": 9.99,
      "5x7": 14.99,
      "8x10": 19.99
    },
    canvasPrices: {
      "11x14": 39.99,
      "16x24": 60.00
    },
    basePrice: 9.99,
    description: "Herron skimming over sunset waters.",
    link: "/calendars",
    availableOnCanvas: true
  },
  {
    id: 3,
    title: "Prints",
    image: scissortail,
    name: "Scissortail Flycatcher",
    prices: {
      "4x6": 9.99,
      "5x7": 14.99,
      "8x10": 19.99
    },
    canvasPrices: {
      "11x14": 39.99,
      "16x24": 60.00
    },
    basePrice: 9.99,
    description: "Scissortail perched on a stem looking for food.",
    link: "/prints",
    availableOnCanvas: true
  },
];

function getProductData(id) {
  console.log('Searching for product with ID:', id);
  
  let productData = photos.find(photo => photo.id === Number(id));
  
  if (!productData) {
    console.log("Product data does not exist for ID:", id);
    return {
      name: "Unknown",
      prices: PRINT_PRICES,
      canvasPrices: CANVAS_PRICES,
      basePrice: 0,
      image: "",
      getPriceForSize: (size, isCanvas = false) => 0
    };
  }
  
  // Add a method to get price for specific size and format
  const enrichedProductData = {
    ...productData,
    getPriceForSize: (size, isCanvas = false) => {
      if (isCanvas) {
        return productData.canvasPrices[size] || (Object.keys(productData.canvasPrices).length > 0 
          ? productData.canvasPrices[Object.keys(productData.canvasPrices)[0]]
          : 0);
      }
      return productData.prices[size] || productData.basePrice;
    }
  };
  
  console.log('Product found:', enrichedProductData);
  return enrichedProductData;
}

// Helper function to format price
function formatPrice(price) {
  return `$${Number(price).toFixed(2)}`;
}

// Helper function to get price for a specific size
function getPriceForSize(size, isCanvas = false) {
  if (isCanvas) {
    return CANVAS_PRICES[size] || (Object.keys(CANVAS_PRICES).length > 0 
      ? CANVAS_PRICES[Object.keys(CANVAS_PRICES)[0]] 
      : 0);
  }
  return PRINT_PRICES[size] || PRINT_PRICES["4x6"]; // Default to 4x6 price if size not found
}

// Helper function to get all available sizes
function getAvailableSizes(isCanvas = false) {
  return isCanvas ? Object.keys(CANVAS_PRICES) : Object.keys(PRINT_PRICES);
}

export {
  getProductData,
  photos,
  formatPrice,
  getPriceForSize,
  getAvailableSizes,
  PRINT_PRICES,
  CANVAS_PRICES
};