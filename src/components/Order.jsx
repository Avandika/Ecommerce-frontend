import React, { useEffect, useState } from 'react';

function Order() {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const singleItem = localStorage.getItem('buyNowItem');
    const allItems = localStorage.getItem('buyNowAll');

    if (singleItem) {
      setOrderItems([JSON.parse(singleItem)]);
    } else if (allItems) {
      setOrderItems(JSON.parse(allItems));
    }
  }, []);

  if (!orderItems || orderItems.length === 0) {
    return <p className="p-6">No orders yet.</p>;
  }

  return (
    <div className="bg-[#bebebe] min-h-screen p-6 font-serif">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#1f160d]">Order Summary</h1>

      {orderItems.map((item, index) => (
        <div key={index} className="max-w-md mx-auto bg-white p-4 mb-4 rounded-xl shadow">
          <img src={item.image} alt={item.name} className="w-full h-48 object-contain rounded" />
          <h2 className="text-xl font-semibold mt-4">{item.name}</h2>
          <p className="text-lg text-green-700 font-bold">{item.price}</p>
          <p className="mt-2">Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default Order;
