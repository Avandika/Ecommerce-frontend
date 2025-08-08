import React from 'react'
import { useNavigate } from 'react-router-dom';
import Bgh from '../assets/bgh.jpg';
import About from './About'

function Home() {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    navigate('/Product');
  };

  return (
    <>
      <img src={Bgh} alt="Background img" className="w-400 h-90" />
      <div className="flex flex-col items-center justify-center text-center mt-6 mb-6 px-4 font-serif">
        <h1 className="text-3xl font-bold text-stone-900 mb-4 ">Welcome to E-Commerce</h1>
        <p className="text-lg text-neutral-700 max-w-xl">
          Discover the best deals on your favorite products. Shop smart, shop fast — all from the comfort of your home.
        </p>
        <button
          onClick={handleStartShopping}
          className="mt-6 px-6 py-2 bg-stone-700 text-white rounded-full hover:bg-green-800 transition"
        >
          Start Shopping
        </button>

        <About/>
      </div>
    </>
  );
}

export default Home;
