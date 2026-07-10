// import React from 'react'

// function Welcome({name="Guest"}) {
//   return (
//     <div>
//       <h2>Welcome back, {name}!</h2>
//     </div>
//   )
// }

// export default Welcome
import {useState} from 'react'

function Welcome() {
    const [name, setName] = useState('Guest')
  return (
    <div>
      <h2>Welcome back, {name}</h2>
      <button onClick={() => setName('Aisha')}>Change name</button>
    </div>
  )
}

export default Welcome
