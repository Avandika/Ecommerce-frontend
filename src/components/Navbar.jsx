import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Logo from '../assets/logo.png'
import Cartimg from '../assets/cart.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons'

function Navbar({ cartCount, cartItems, addToCart, removeFromCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = sessionStorage.getItem('username');
    setUsername(user && user.trim() !== '' ? user : null);
  }, [location]);

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    setUsername(null);
    setIsCartOpen(false);
    navigate('/login');
  };

  const handleGoToCart = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  const handleCheckout = () => {
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrders = [...existingOrders, ...cartItems];
    localStorage.setItem('orders', JSON.stringify(newOrders));
    setIsCartOpen(false);
    navigate('/order');
  };

  const increaseQty = (id) => {
  const item = cartItems.find((i) => i.id === id);
  addToCart({ ...item, quantity: item.quantity + 1 });
};

const decreaseQty = (id) => {
  const item = cartItems.find((i) => i.id === id);
  if (item.quantity > 1) {
    addToCart({ ...item, quantity: item.quantity - 1 }); 
  } 
};

  const formatPrice = (price) => {
    let num = typeof price === 'string' ? parseInt(price.replace(/[^0-9]/g, ''), 10) : price;
    if (isNaN(num)) num = 0;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <>
      <nav className="text-[#1f160d] px-5 py-2 bg-[#f2f2f2] shadow-md flex items-center relative z-10">
        <div className="flex space-x-3 w-[10%] items-center">
          <a href="https://instagram.com/rd_bouti_que" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#1f160d] hover:text-[#C13584] text-l" > <FontAwesomeIcon icon={faInstagram} /> </a>
          <a href="https://www.facebook.com/profile.php?id=61578882002576" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#1f160d] hover:text-[#3b5998] text-l" > <FontAwesomeIcon icon={faFacebookF} /> </a>
        </div>
        <div className="items-center w-[75%] ml-[30%]">
          <div className="flex items-center space-x-4">
            <img src={Logo} alt="Logo" className="w-16 h-12" />
            <span className="text-3xl font-bold font-serif items-center">E-Commerce</span>
          </div>
          <div className="md:hidden text-center flex-1">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex space-x-6 text-xl items-center text-center flex-1">
            <Link to="/home" className="hover:underline font-bold font-serif">Home</Link>
            <Link to="/product" className="hover:underline font-bold font-serif">Products</Link>
            <Link to="/order" className="hover:underline font-bold font-serif">Orders</Link>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-center md:flex-row md:space-x-4 space-y-2 md:space-y-0 font-bold font-serif w-auto md:w-[15%] text-center">
          <button onClick={() => setIsCartOpen(true)} className="relative focus:outline-none" aria-label="Open Cart">
            <img src={Cartimg} alt="cart" className="h-6 w-6 mx-auto" />
            {cartCount > 0 && <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{cartCount}</span>}
          </button>
          {username ? (
            <button onClick={handleLogout} className="whitespace-nowrap">Logout</button>
          ) : (
            <Link to="/login" className="underline whitespace-nowrap">Login</Link>
          )}
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4 text-xl font-serif font-bold">
            <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/product" onClick={() => setIsOpen(false)}>Products</Link>
            <Link to="/order" onClick={() => setIsOpen(false)}>Orders</Link>
            <button onClick={() => { setIsCartOpen(true); setIsOpen(false); }} className="relative flex items-center space-x-2 focus:outline-none">
              <img src={Cartimg} alt="cart" className="h-6 w-6" />
              <span>Cart</span>
              {cartCount > 0 && <span className="absolute top-0 right-0 -mt-1 -mr-4 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{cartCount}</span>}
            </button>
            {username ? (
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="font-serif font-bold underline text-left">Logout</button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="font-serif font-bold underline">Login</Link>
            )}
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '350px',
          backgroundColor: 'white',
          boxShadow: '0 0 15px rgba(0,0,0,0.3)',
          zIndex: 9999,
          transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 id="cart-title" className="text-lg font-bold">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} aria-label="Close Cart" className="text-xl font-bold focus:outline-none">✕</button>
        </div>

        {/* Scrollable Items */}
        <div className="p-4 flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <div className="flex items-center rounded-full w-24 border overflow-hidden h-9 justify-between font-bold">
                        <button onClick={() => decreaseQty(item.id)} className="px-3 py-1 hover:bg-gray-300">-</button>
                        <span className="mx-2">{item.quantity}</span>
                        <button onClick={() => increaseQty(item.id)} className="px-3 py-1 hover:bg-gray-300">+</button>
                      </div>
                    </div>
                  </div>
                  <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-white px-1 py-1 rounded hover:bg-red-100">❌</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Fixed Footer Buttons */}
        <div className="p-4 border-t flex flex-col gap-2 bg-white">
          <div className="flex justify-between font-bold text-lg mb-2">
            <span>Total</span>
            <span>{formatPrice(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))}</span>
          </div>
          <button onClick={handleCheckout} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Checkout</button>
          <button onClick={handleGoToCart} className="w-full bg-gray-500 text-white py-2 rounded">Go to Cart</button>
        </div>
      </div>

      {/* Overlay */}
      {isCartOpen && (
        <div onClick={() => setIsCartOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 9998 }} aria-hidden="true" />
      )}
    </>
  );
}

export default Navbar;

