import React from 'react'
import { useUser } from '../context/UserContext'

function UserProfile() {
    const {name, age} = useUser();
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Age: {age}</p>
    </div>
  )
}

export default UserProfile

export const Heading = ({name}) => {
    return (
        <h1>Hello my name is {name}</h1>
    )
}
