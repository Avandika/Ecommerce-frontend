import { useState } from 'react'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-16 px-4 font-serif">
      <h1 className="text-3xl font-bold text-stone-900 mb-4">Welcome to Flipkart</h1>
      <p className="text-lg text-neutral-700 max-w-xl">
        Discover the best deals on your favorite products. Shop smart, shop fast — all from the comfort of your home.
      </p>
      <button className="mt-6 px-6 py-2 bg-stone-700 text-white rounded-full hover:bg-green-800 transition">
        Start Shopping
      </button>
    </div>
  );
}

export default Home;
