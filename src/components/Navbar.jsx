import { useState } from 'react'

function Navbar() {
  return (
    <nav className="bg-[#d2b48c] text-[#1f160d] px-6 py-5 flex justify-between items-center">
      <div className="text-4xl font-bold font-serif">E-Commerce</div>
      <div className="space-x-6 text-2xl">
        <a href="#" className="hover:underline font-bold font-serif">Home</a>
        <a href="#" className="hover:underline font-bold font-serif">Products</a>
        <a href="#" className="hover:underline font-bold font-serif">Cart</a>
        <a href="#" className="hover:underline font-bold font-serif">About</a>
        <a href="#" className="hover:underline font-bold font-serif">Orders</a>
      </div>
    </nav>
  );
}

export default Navbar;
