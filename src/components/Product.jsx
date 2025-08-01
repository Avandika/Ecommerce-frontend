import products from '../data/Products';

function Product() {
  return (
    <div className="p-6 bg-[#f9f6f1] min-h-screen font-serif">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#1f160d]">Our Products</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded" />
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-lg text-green-700 font-bold">{product.price}</p>
            <button className="mt-3 w-full bg-stone-700 text-white py-2 rounded-full hover:bg-green-800 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
