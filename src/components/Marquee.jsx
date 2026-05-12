import React from 'react'

const Marquee = () => {
  return (
    <div className='container mx-auto bg-blue-50 text-blue-800 py-2 text-[16px] text-center font-medium overflow-hidden'>
      <div className='animate-marquee flex w-max'>
        <span className='mr-20'>
            New Arrivals: Ceramic Blue Tile | Weekly Feature: Modern Geometric Patterns | Join the Community...
        </span>
        <span>
            New Arrivals: Ceramic Blue Tile | Weekly Feature: Modern Geometric Patterns | Join the Community...
        </span>
      </div>
    </div>
  )
}

export default Marquee
