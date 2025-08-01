import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#d2b48c] text-[#1f160d] px-6 py-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="Logo" className="w-16 h-12" />
          <div className="text-3xl font-bold font-serif">E-Commerce</div>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-2xl">
          <Link to="/Home" className="hover:underline font-bold font-serif">Home</Link>
          <Link to="/Product" className="hover:underline font-bold font-serif">Products</Link>
          <Link to="/Cart" className="hover:underline font-bold font-serif">Cart</Link>
          <Link to="/About" className="hover:underline font-bold font-serif">About</Link>
          <Link to="/Order" className="hover:underline font-bold font-serif">Orders</Link>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 text-xl font-serif font-bold">
          <Link to="/Home" className="hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/Product" className="hover:underline" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/Cart" className="hover:underline" onClick={() => setIsOpen(false)}>Cart</Link>
          <Link to="/About" className="hover:underline" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/Order" className="hover:underline" onClick={() => setIsOpen(false)}>Orders</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
