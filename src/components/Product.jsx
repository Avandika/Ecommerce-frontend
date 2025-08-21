import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from backend
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const categories = ['All', ...new Set(products.map((p) => p.category || 'Misc'))];

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    addToCart({ ...product, quantity });
  };

  const handleBuyNow = (product) => {
    const quantity = quantities[product._id] || 1;
    const orderItem = { ...product, quantity };
    localStorage.setItem('buyNowItem', JSON.stringify(orderItem));
    navigate('/order');
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleFilterClick = (category) => setActiveFilter(category);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeFilter === 'All' || (product.category || 'Misc') === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 bg-[#bebebe] min-h-screen font-serif">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#1f160d]">Our Products</h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full max-w-md px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-stone-700"
        />
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterClick(category)}
              className={`px-4 py-1 rounded-full border transition ${
                activeFilter === category
                  ? 'bg-stone-700 text-white border-stone-700'
                  : 'bg-white text-stone-700 border-gray-300 hover:bg-stone-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.length === 0 ? (
          <p className="text-center col-span-full">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
              <img src={product.image} alt={product.name} className="w-full h-48 object-contain rounded" />
              <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
              <p className="text-lg text-green-700 font-bold">₹{product.price}</p>

              <div className="flex items-center justify-center mt-2 space-x-3">
                <button
                  onClick={() => handleQuantityChange(product._id, -1)}
                  disabled={(quantities[product._id] || 1) <= 1}
                  className={`px-3 py-1 rounded ${
                    (quantities[product._id] || 1) <= 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-300'
                  }`}
                >
                  -
                </button>
                <span className="text-lg">{quantities[product._id] || 1}</span>
                <button
                  onClick={() => handleQuantityChange(product._id, 1)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  +
                </button>
              </div>

              <div className="flex flex-col space-y-2 mt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-stone-700 text-white py-2 rounded-full hover:bg-yellow-600 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="bg-stone-700 text-white py-2 rounded-full hover:bg-green-800 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;

