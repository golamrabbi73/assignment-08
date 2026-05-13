import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <>
        <section
            className='relative w-full bg-cover bg-center bg-no-repeat'
            style={{backgroundImage : "url('/assets/hero_image.jpg')"}}
        >
            <div className='absolute inset-0 bg-black/65'></div>
            <div
                className='relative container mx-auto min-h-[60vh] flex flex-col justify-center items-center px-4 py-24 text-center'
            >
                <h1 className='text-3xl md:text-5xl max-w-3xl mx-auto font-bold text-white'>Discover Your Perfect Aesthetic</h1>
                <Link href="/all-tiles">
                    <button className='btn mt-6 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition'>
                        Browse Now
                    </button>
                </Link>
            </div>
        </section>
    </>
  )
}

export default Hero
