import { useState } from 'react'
import './App.css'
import Product from './components/Product'
import Navbar from './components/Navbar'
import Home from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Home/>
    <Product/>
      
    </>
  )
}

export default App
