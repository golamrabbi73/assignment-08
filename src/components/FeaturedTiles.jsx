'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css";
import "swiper/css/pagination";


// fetch function


// ui
const FeaturedTiles = () => {
    const [tiles, setTiles] = useState([]);
    
    useEffect(() => {
        const tilesFetch = async () => {
            const res = await fetch(`https://assignment08-server.onrender.com/products`);

        const data = await res.json();
            setTiles(data);
    };

    tilesFetch();
}, []);


  return (
    <>
        <section className='container mx-auto mt-10'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-8 md:mb-10'>Featured Tiles</h2>

            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },

                    640: {
                        slidesPerView: 2,
                    },

                    1024: {
                        slidesPerView: 4,
                    },
                }}
            >
                {
                    tiles.slice(0, 8).map((tile) => (
                        <SwiperSlide key={tile.id}>
                            <div className='border rounded-xl overflow-hidden hover:shadow-xl transition duration-300 bg-white h-full'>
                                <img
                                    src={tile.image}
                                    alt={tile.title}
                                    className='w-full h-48 hover:scale-105 transition duration-300 object-cover'
                                />

                                <div className='p-4 md:p-5'>
                                    <h3 className='text-base md:text-lg font-medium'>{tile.title}</h3>
                                    <Link href={`/tiles/${tile.id}`}>
                                        <button className='btn btn-primary btn-block mt-3 w-full text-white '>View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    </>
  )
}

export default FeaturedTiles
