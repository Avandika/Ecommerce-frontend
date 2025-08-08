import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Cartimg from '../assets/cart.png';

function Navbar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  useEffect(() => {
    // Update username every time route changes (including after login)
    const user = sessionStorage.getItem('username');
    if (user && user.trim() !== '') {
      setUsername(user);
    } else {
      setUsername(null);
    }
  }, [location]); // runs on every route change

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    setUsername(null);
    navigate('/login');
  };

  return (
    <nav className="text-[#1f160d] px-5 py-2 bg-[#f2f2f2] shadow-md">
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

        <div className="hidden md:flex space-x-6 text-2xl items-center">
          <Link to="/home" className="hover:underline font-bold font-serif">Home</Link>
          <Link to="/product" className="hover:underline font-bold font-serif">Products</Link>
          <Link to="/order" className="hover:underline font-bold font-serif">Orders</Link>
          <Link to="/cart" className="relative hover:underline font-bold font-serif">
            <img src={Cartimg} alt="cart" className="h-10 w-10" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {username ? (
            <>
              <span className="text-xl font-semibold">{username}</span>
              <button onClick={handleLogout} className="text-blue-600 underline">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-blue-600 underline">Login</Link>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 text-xl font-serif font-bold">
          <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/product" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/order" onClick={() => setIsOpen(false)}>Orders</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)}>Cart</Link>

          {username ? (
            <>
              <span>{username}</span>
              <button onClick={handleLogout} className="text-blue-600 underline text-left">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-blue-600 underline">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
