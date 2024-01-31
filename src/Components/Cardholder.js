import React from 'react'
import Swipe from './Swipe'

const Cardholder = () => {
    const items = [
        { content: 'Card 1' },
        { content: 'Card 2' },
        { content: 'Card 3' },
        // Add more items as needed
      ];
  return (
    <>
    <Swipe items = {items} />
    </>
  )
}

export default Cardholder