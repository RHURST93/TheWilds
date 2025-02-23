import React, { useContext, useState } from "react";
import { CartContext } from "../utils/cartContext.js";
import { formatPrice } from "../utils/utils.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate, Navigate } from "react-router-dom";

const stripePromise = loadStripe('pk_test_your_publishable_key_here');

const CheckoutForm = ({ cartTotal, cartItems, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "", // Added for receipt
    address: "",
    city: "",
    state: "",
    zipCode: "",
    shippingPreference: "standard",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingChange = (e) => {
    setFormData((prev) => ({ ...prev, shippingPreference: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || processing) return;

    setProcessing(true);
    setError(null);

    const { firstName, lastName, email, address, city, state, zipCode } = formData;
    if (!firstName || !lastName || !email || !address || !city || !state || !zipCode) {
      setError("Please fill in all required fields.");
      setProcessing(false);
      return;
    }

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartTotal, cartItems, shippingDetails: formData }),
      });

      if (!response.ok) throw new Error('Failed to create payment intent');
      const { clientSecret, receipt } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${firstName} ${lastName}`,
            email: email,
            address: {
              line1: address,
              city: city,
              state: state,
              postal_code: zipCode,
              country: 'US',
            },
          },
        },
      });

      if (result.error) throw new Error(result.error.message);
      if (result.paymentIntent.status === 'succeeded') onSuccess(receipt); // Pass receipt
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h3 className="text-lg font-semibold mb-4">Billing & Shipping Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-1"
            placeholder="John"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-1"
            placeholder="Doe"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-1"
            placeholder="john.doe@example.com"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-1"
            placeholder="123 Main St"
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-1"
            placeholder="Anytown"
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
          <input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-1"
            placeholder="CA"
            required
          />
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            value={formData.zipCode}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-1"
            placeholder="12345"
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-md font-semibold mb-2">Shipping Preferences</h4>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="shippingPreference"
              value="standard"
              checked={formData.shippingPreference === "standard"}
              onChange={handleShippingChange}
              className="radio radio-primary mr-2"
            />
            Standard ($5)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="shippingPreference"
              value="expedited"
              checked={formData.shippingPreference === "expedited"}
              onChange={handleShippingChange}
              className="radio radio-primary mr-2"
            />
            Expedited ($10)
          </label>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
        <CardElement
          options={{
            style: {
              base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } },
              invalid: { color: '#9e2146' },
            },
          }}
        />
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        type="submit"
        className={`btn btn-primary mt-4 ${processing ? 'btn-disabled' : ''}`}
        disabled={!stripe || processing}
      >
        {processing ? 'Processing...' : `Pay ${formatPrice(cartTotal + (formData.shippingPreference === 'expedited' ? 10 : 5))}`}
      </button>
    </form>
  );
};

const Checkout = () => {
  const { cartItems = [], cartTotal = 0, processCheckout, isCheckoutComplete } = useContext(CartContext) || {};
  const navigate = useNavigate();

  const handleSuccess = (receipt) => {
    if (processCheckout) processCheckout(receipt); // Pass receipt to context if needed
    navigate('/order-confirmation', { state: { receipt } }); // Pass receipt to confirmation page
  };

  if (isCheckoutComplete) {
    return <Navigate to="/order-confirmation" replace />;
  }

  if (!cartItems.length) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="p-6 bg-zinc-950 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="mb-6">
          <h3 className="text-xl font-bold">Total (excluding shipping): {formatPrice(cartTotal)}</h3>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm cartTotal={cartTotal} cartItems={cartItems} onSuccess={handleSuccess} />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;