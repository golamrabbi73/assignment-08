import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <>
        <section className='container mx-auto py-24 bg-[#F8FAFC] to-white text-center'>
            <h1 className='text-5xl font-heading font-bold text-[#111827]'>Discover Your Perfect Aesthetic</h1>
            <Link href="/all-tiles">
                <button className='btn mt-6 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition'>
                    Browse Now
                </button>
            </Link>
        </section>
    </>
  )
}

export default Hero
