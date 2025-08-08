import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, removeFromCart }) {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => {
    const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
    return acc + numericPrice * item.quantity;
  }, 0);

  const handleBuyAll = () => {
    // Append all cart items to existing orders
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrders = [...existingOrders, ...cartItems];
    localStorage.setItem('orders', JSON.stringify(newOrders));

    navigate('/Order');
  };

  return (
    <div className="bg-[#bebebe] min-h-screen py-2 font-serif">
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#1f160d]">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="mb-4 p-4 bg-white rounded-lg shadow text-xl font-semibold text-[#1f160d] text-center flex justify-between items-center">
              Total Price: ₹{totalPrice.toLocaleString('en-IN')}
              <div>
                <button
                  onClick={handleBuyAll}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 h-10"
                >
                  Buy All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cartItems.map((item) => {
                const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
                const itemTotal = numericPrice * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center h-100"
                  >
                    <img src={item.image} alt={item.name} className="h-50 w-60 object-contain mb-1" />
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-700 mb-1">Price: {item.price}</p>
                    <p className="text-gray-700 mb-1">Quantity: {item.quantity}</p>
                    <p className="text-gray-800 font-semibold mb-1">
                      Subtotal: ₹{itemTotal.toLocaleString('en-IN')}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mb-2"
                      >
                        Remove
                      </button>

                      <button
                        onClick={() => {
                          const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
                          const newOrders = [...existingOrders, item];
                          localStorage.setItem('orders', JSON.stringify(newOrders));
                          navigate('/Order');
                        }}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 mb-2"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
