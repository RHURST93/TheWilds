import React from "react";
import { useLocation } from "react-router-dom";
import { formatPrice } from "../utils/utils.js";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const receipt = state?.receipt || {};

  return (
    <div className="p-6 bg-zinc-950 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-6">Order Confirmed!</h1>
        <p className="text-lg mb-4">Thank you for your purchase!</p>
        
        {receipt.paymentIntentId ? (
          <div className="space-y-4">
            <p><strong>Order Date:</strong> {new Date(receipt.date).toLocaleString()}</p>
            <h2 className="text-lg font-semibold">Items:</h2>
            <ul className="list-disc pl-5">
              {receipt.cartItems.map((item) => (
                <li key={`${item.id}-${item.size}`}>
                  {item.name} ({item.size}) x {item.quantity} - {formatPrice(item.prices[item.size] * item.quantity)}
                </li>
              ))}
            </ul>
            <p><strong>Subtotal:</strong> {formatPrice(receipt.subtotal)}</p>
            <p><strong>Shipping:</strong> {formatPrice(receipt.shippingCost)}</p>
            <p><strong>Total:</strong> {formatPrice(receipt.amount)}</p>
            <p><strong>Shipped to:</strong> {receipt.shippingDetails.firstName} {receipt.shippingDetails.lastName}, {receipt.shippingDetails.address}, {receipt.shippingDetails.city}, {receipt.shippingDetails.state} {receipt.shippingDetails.zipCode}</p>
            <p><strong>Payment ID:</strong> {receipt.paymentIntentId}</p>
            <p className="text-sm text-gray-500">A receipt has been sent to {receipt.shippingDetails.email}.</p>
          </div>
        ) : (
          <p>No receipt details available.</p>
        )}
        
        <a href="/" className="btn btn-primary mt-4">Back to Home</a>
      </div>
    </div>
  );
};

export default OrderConfirmation;