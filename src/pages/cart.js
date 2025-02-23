import React, { useContext } from "react";
import Header from "../components/header.js";
import { CartContext } from "../utils/cartContext.js";
import { formatPrice } from "../utils/utils.js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const { 
    cartItems = [], 
    cartTotal = 0, 
    removeFromCart, 
    updateQuantity, 
    processCheckout, 
    isCheckoutComplete
  } = useContext(CartContext) || {};

  const isCartEmpty = !cartItems || cartItems.length === 0;

  const handleQuantityChange = (productId, size, change) => {
    if (!updateQuantity) return;
    const item = cartItems.find(item => item.id === productId && item.size === size);
    if (!item) return;
    const newQuantity = Math.max(1, item.quantity + change);
    updateQuantity(productId, size, newQuantity);
  };

  const getItemPrice = (item) => {
    if (!item || !item.prices || !item.size) {
      console.error("Invalid item data:", item);
      return 0;
    }
    if (typeof item.prices[item.size] !== 'number') {
      console.error(`Price not found for size ${item.size}`, item);
      return 0;
    }
    return item.prices[item.size];
  };

  const handleCheckout = () => {
    if (!isCheckoutComplete) {
      navigate('/Checkout');
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 bg-zinc-950 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

          {isCartEmpty ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Your cart is empty</p>
              <a href="/" className="btn btn-primary mt-4">
                Return to Home
              </a>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Size</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => {
                      const itemPrice = getItemPrice(item);
                      const itemTotal = itemPrice * item.quantity;
                      return (
                        <tr key={`${item.id}-${item.size}`} className="border-b">
                          <td className="py-4">
                            <div className="flex items-center space-x-3">
                              <div className="avatar">
                                <div className="w-16 h-16 rounded">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="object-cover object-center"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{item.name}</div>
                                <div className="text-sm text-gray-500">
                                  {item.description}
                                </div>
                                {item.productType === 'canvas' && (
                                  <div className="mt-1">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Canvas</span>
                                  </div>
                                )}
                                {item.productType === 'print' && (
                                  <div className="mt-1">
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">Print</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>{item.size}</td>
                          <td>{formatPrice(itemPrice)}</td>
                          <td>
                            <div className="flex items-center space-x-2">
                              <button
                                className="btn btn-xs btn-circle bg-gray-200"
                                onClick={() => handleQuantityChange(item.id, item.size, -1)}
                                disabled={item.quantity <= 1}
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                -
                              </button>
                              <span className="mx-1 font-medium">{item.quantity}</span>
                              <button
                                className="btn btn-xs btn-circle bg-gray-200"
                                onClick={() => handleQuantityChange(item.id, item.size, 1)}
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="font-medium">
                            {formatPrice(itemTotal)}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-circle btn-ghost"
                              onClick={() => removeFromCart(item.id, item.size)}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-8 pt-4 border-t">
                <div>
                  <h3 className="text-xl font-bold">
                    Total: {formatPrice(cartTotal)}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Shipping calculated at checkout
                  </p>
                </div>
                <div className="space-x-4">
                  <a href="/" className="btn btn-outline">
                    Continue Shopping
                  </a>
                  <button 
                    className={`btn ${isCheckoutComplete ? 'btn-success' : 'btn-primary'}`}
                    onClick={handleCheckout} // Fixed: Pass function reference
                    disabled={isCheckoutComplete}
                  >
                    {isCheckoutComplete ? '✓ Order Placed!' : 'Checkout'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;