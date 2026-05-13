import React from 'react'

const Marquee = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 my-8'>
      <div className='bg-base-200 border border-base-300 rounded-2xl overflow-hidden py-3 shadow-sm'>
        <div className='whitespace-nowrap animate-marquee text-sm md:text-base font-medium'>
          <span className='mx-8 text-primary'>
            New Arrivals: Ceramic Blue Tile
          </span>
          <span className='mx-8 text-secondary'>
            Weekly Feature: Modern Geometric Patterns
          </span>
          <span className='mx-8 text-accent'>
            Join the TileGallery Comumnity
          </span>
        </div>
      </div>
    </div>
  )
}

export default Marquee
