import React from 'react'

function Car(props) {
  return (
    <div>
      <h2>I am a {props.color} {props.brand} {props.model} {props.year}.</h2>
    </div>
  )
}

export default Car
