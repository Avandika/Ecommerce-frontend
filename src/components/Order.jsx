import React, { useEffect, useState } from 'react';

function Order() {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrderItems(savedOrders);
  }, []);

  const clearOrders = () => {
    localStorage.removeItem('orders');
    setOrderItems([]);
  };

  const removeOrderItem = (indexToRemove) => {
    const updatedOrders = orderItems.filter((_, index) => index !== indexToRemove);
    setOrderItems(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  if (!orderItems.length) {
    return <p className="p-6 text-center text-lg">No orders yet.</p>;
  }

  return (
    <div className="bg-[#bebebe] min-h-screen p-6 font-serif">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#1f160d]">Orders</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {orderItems.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center relative"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-contain mb-4 rounded"
            />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-green-700 font-bold text-lg mt-2">{item.price}</p>
            <p className="mt-2 text-gray-700">Quantity: {item.quantity}</p>

            <button
              onClick={() => removeOrderItem(index)}
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={clearOrders}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Clear All Orders
        </button>
      </div>
    </div>
  );
}

export default Order;
