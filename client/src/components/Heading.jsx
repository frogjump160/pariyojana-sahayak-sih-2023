import React from 'react'
import './Heading.css'

const Heading = ({children}) => {
  return (
    <h1 className='heading'>{children}</h1>
  )
}

export default Heading