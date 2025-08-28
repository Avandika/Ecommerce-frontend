import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './components/Product';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Order from './components/Order';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Cart from './components/Cart';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });
const uidOf = (item) => item?._id ?? item?.id;
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

const addToCart = (product) => {
  const uid = uidOf(product);
  setCartItems(prev =>
    prev.some(it => uidOf(it) === uid)
      ? prev.map(it => uidOf(it) === uid ? { ...it, quantity: (it.quantity ?? 1) + 1 } : it)
      : [...prev, { ...product, quantity: product.quantity ?? 1 }]
  );
};

const updateQty = (id, delta) => {
  setCartItems(prev =>
    prev.map(it => {
      const uid = uidOf(it);
      if (uid !== id) return it;
      const next = Math.max(1, (it.quantity ?? 1) + delta);
      return { ...it, quantity: next };
    })
  );
};

const removeFromCart = (id) => {
  setCartItems(prev => prev.filter(it => uidOf(it) !== id));
};

  return (
    <Router>
      <Navbar
        cartItems={cartItems}
        cartCount={cartItems.length}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        updateQty={updateQty}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/product" element={<PrivateRoute><Product addToCart={addToCart} /></PrivateRoute>} />
        <Route path="/order" element={<PrivateRoute><Order /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart cartItems={cartItems} setCartItems={setCartItems} /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;




