import {useState, useCallback} from 'react'
import { useUser } from '../context/UserContext'


function Counter() {
    const {name} = useUser();
    const [count, setCount] = useState(0)
    const increment = useCallback(() => {
        setCount(count + 5) 
    },[count])
    const decrement = () => {
        setCount(count - 1)
    }
    const reset = () => {
        setCount(0)
    }
  return (
    <div>
        <h3>Name: {name}</h3>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

export default Counter
