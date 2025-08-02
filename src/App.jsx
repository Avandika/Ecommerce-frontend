import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './components/Product';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import About from './components/About';
import Order from './components/Order';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    if (!cartItems.find((item) => item.id === product.id)) {
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <Navbar cartCount={cartItems.length} />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Product" element={<Product addToCart={addToCart} />} />
        <Route
          path="/Cart"
          element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route path="/About" element={<About />} />
        <Route path="/Order" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
