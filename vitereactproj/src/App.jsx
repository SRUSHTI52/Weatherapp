import { useState } from 'react'
import './App.css'
import Weather from './Weather';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container'>
       <h1>Enter City Name to know the weather details!</h1>
       <Weather />
    </div>
  )
}

export default App
