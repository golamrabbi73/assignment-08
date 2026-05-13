"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


const AllTilesPage = () => {

    const[tiles, setTiles] = useState([]);
    const[search, setSearch] = useState("");
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTiles =async () => {
            setLoading(true);
            const res = await fetch(`https://assignment08-server.onrender.com/products`,
                {
                    cache: "no-store",
                }
            );

            const data = await res.json();
            setTiles(data);
            setLoading(false);
        };

        fetchTiles();
    }, []);

    const filteredTiles = tiles.filter((tile) =>
        tile.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
        <section className='container mx-auto mt-10'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-8 md:mb-10'>All Tiles</h2>

            {/* search bar*/}
            <div className='max-w-2xl mx-auto mb-10'>

                <label className="input input-bordered w-full h-14 text-lg">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        type="search"
                        required placeholder="Search tiles by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </label>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6'>
               
               { loading? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className='h-64 bg-gray-200 rounded-xl animate-pulse'
                            />
                        ))}
                    </div>
               ) : (
                    filteredTiles.map((tile) => (
                        <div key={tile.id} className='border rounded-xl overflow-hidden  shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:transition-all duration-300 bg-white'>
                            <Image
                                src={tile.image}
                                alt={tile.title}
                                className='w-full h-40 sm:h-44 md:h-48
                                object-cover'
                                width={250}
                                height={250}
                                sizes='(max-width: 786px) 100vw, 25vw'
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
               )

               }
                {/* {
                    filteredTiles.map((tile) => (
                        <div key={tile.id} className='border rounded-xl overflow-hidden  shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:transition-all duration-300 bg-white'>
                            <Image
                                src={tile.image}
                                alt={tile.title}
                                className='w-full h-40 sm:h-44 md:h-48
                                object-cover'
                                width={250}
                                height={250}
                                sizes='(max-width: 786px) 100vw, 25vw'
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
                } */}
            </div>
        </section>
    </>
  )
}

export default AllTilesPage
