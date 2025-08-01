import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Product from './components/Product'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Cart from './components/Cart'
import About from './components/About'
import Order from './components/Order'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Product' element={<Product/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Order' element={<Order/>}/>
      </Routes>
    </Router>

      
    </>
  )
}

export default App
