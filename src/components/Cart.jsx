import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  // Update quantity of an item
  const updateQuantity = (id, amount) => {
    const updatedCart = cartItems
      .map(item =>
        item._id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      );
    setCartItems(updatedCart);
  };

  // Remove item from cart
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
  };

  // Total price
  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  // Checkout function
  const handleCheckout = () => {
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrders = [...existingOrders, ...cartItems];
    localStorage.setItem('orders', JSON.stringify(newOrders));
    setCartItems([]); // Clear cart after checkout
    navigate('/order'); // Navigate to order page
  };

  const goToProducts = () => {
    navigate('/product');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen bg-[#f5f5f5]">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-lg">Your cart is empty.</p>
          <button
            onClick={goToProducts}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-lg shadow-sm bg-white"
              >
                <div className="flex items-center space-x-4 w-full md:w-1/2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <button
                    onClick={() => updateQuantity(item._id, -1)}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, 1)}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col md:flex-row justify-between items-center border-t pt-4">
            <h2 className="text-xl font-bold mb-4 md:mb-0">
              Total: ₹{getTotalPrice()}
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={handleCheckout}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Checkout
              </button>
              <button
                onClick={goToProducts}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
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
