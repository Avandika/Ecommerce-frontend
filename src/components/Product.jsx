import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../data/Products';

function Product({ addToCart }) {
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({ ...product, quantity });
  };

  const handleBuyNow = (product) => {
    const quantity = quantities[product.id] || 1;
    const orderItem = { ...product, quantity };
    localStorage.setItem('buyNowItem', JSON.stringify(orderItem));
    navigate('/Order');
  };

  return (
    <div className="p-6 bg-[#bebebe] min-h-screen font-serif">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#1f160d]">Our Products</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-48 object-contain rounded" />
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-lg text-green-700 font-bold">{product.price}</p>

            <div className="flex items-center justify-center mt-2 space-x-3">
              <button
                onClick={() => handleQuantityChange(product.id, -1)}
                disabled={(quantities[product.id] || 1) <= 1}
                className={`px-3 py-1 rounded ${((quantities[product.id] || 1) <= 1) ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-300'}`}
              >
                −
              </button>
              <span className="text-lg">{quantities[product.id] || 1}</span>
              <button
                onClick={() => handleQuantityChange(product.id, 1)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                +
              </button>
            </div>

            <div className="flex flex-col space-y-2 mt-4">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-stone-700 text-white py-2 rounded-full hover:bg-green-800 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(product)}
                className="bg-yellow-600 text-white py-2 rounded-full hover:bg-yellow-700 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
