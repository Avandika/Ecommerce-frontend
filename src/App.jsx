import { useState } from 'react';
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
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
  setCartItems((prevItems) => {
    const exist = prevItems.find(item => item.id === product.id);
    if (exist) {
      return prevItems.map(item =>
        item.id === product.id ? { ...item, quantity: product.quantity } : item
      );
    } else {
      return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    }
  });
};


  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <Router>
      {/* Pass both cartItems and add/remove functions to Navbar so drawer uses the same state */}
      <Navbar
        cartCount={cartItems.length}
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/product" element={<PrivateRoute><Product addToCart={addToCart} /></PrivateRoute>} />
        <Route path="/order" element={<PrivateRoute><Order /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart cartItems={cartItems} removeFromCart={removeFromCart} /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
