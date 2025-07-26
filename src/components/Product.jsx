import { useState } from 'react'
import Smartwatch from '../assets/Smartwatch.jpg'
import Earbuds from '../assets/Earbuds.jpg'


function Product(){
  const [count, setCount] = useState(0)

  return (
    <>
    <div class="table-auto">
      <table>
        <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-400 px-4 py-2">Product</th>
            <th class="border border-gray-400 px-4 py-2">Price</th>
            <th class="border border-gray-400 px-4 py-2">Description</th>
            <th class="border border-gray-400 px-4 py-2">Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-400 px-4 py-2">Smartwatch Z10</td>
            <td class="border border-gray-400 px-4 py-2">₹3,499</td>
            <td class="border border-gray-400 px-4 py-2">7-day battery life.</td>
            <td class="border border-gray-400 px-4 py-2">
                <img src={Smartwatch} alt="Smartwatch Z10" className="w-20 h-auto"/>
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 px-4 py-2">Wireless Earbuds X1</td>
            <td class="border border-gray-400 px-4 py-2">₹2,199</td>
            <td class="border border-gray-400 px-4 py-2">20-hour battery.</td>
            <td class="border border-gray-400 px-4 py-2">
                <img src={Earbuds} alt="Wireless Earbuds X1" className="w-20 h-auto"/>
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 px-4 py-2">Laptop Stand Pro</td>
            <td class="border border-gray-400 px-4 py-2">₹1,099</td>
            <td class="border border-gray-400 px-4 py-2">foldable</td>
            <td class="border border-gray-400 px-4 py-2">
                <img src={Smartwatch} alt="Smartwatch Z10" className="w-20 h-auto"/>
            </td>
          </tr>
        </tbody>
    </table>
  </div>   
    </>
  )
}

export default Product