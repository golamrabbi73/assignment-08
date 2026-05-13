import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


// fetch function
const tilesFetch = async () => {
    const res = await fetch(`https://assignment08-server.onrender.com/products`,
        {
            cache: "no-store",
        }
    );
    
    const data = await res.json();
    return data;  
}

// ui
const AllTilesPage = async() => {
    const tiles = await tilesFetch();
    console.log(tiles)
  return (
    <>
        <section className='container mx-auto mt-10'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-8 md:mb-10'>All Tiles</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6'>
                {
                    tiles.map((tile) => (
                        <div key={tile.id} className='border rounded-xl overflow-hidden  shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:transition-all duration-300 bg-white'>
                            <Image
                                src={tile.image}
                                alt={tile.title}
                                className='w-full h-40 sm:h-44 md:h-48
                                object-cover'
                                width={250}
                                height={250}
                                sizes='(max-width:786px) 100vw, 25vw'
                            />

                            <div className='p-4 md:p-5'>
                                <h3 className='text-base md:text-lg font-medium'>{tile.title}</h3>
                                <Link
                                    href={`/tiles/${tile.id}`}
                                    className='btn btn-primary btn-block mt-3 w-full text-white py-2 rounded-lg hover:bg-gray-800 text-sm md:text-base'
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    </>
  )
}

export default AllTilesPage
