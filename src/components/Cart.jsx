import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const updateQuantity = (index, amount) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += amount;
    if (updatedCart[index].quantity <= 0) updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  const goToProducts = () => {
    navigate('/');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your cart is empty.</p>
          <button
            onClick={goToProducts}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(index)}
                    className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <h2 className="text-lg font-bold">
              Total: ₹{getTotalPrice()}
            </h2>
            <div className="space-x-4">
              <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Checkout
              </button>
              <button
                onClick={goToProducts}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
