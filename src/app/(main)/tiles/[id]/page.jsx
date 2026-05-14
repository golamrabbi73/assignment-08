
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const getSingletile = async (id) => {
            
    const res = await fetch(`https://assignment08-server.onrender.com/products/${id}`,
        {
            cache: "no-store",
        }
    );

    if(!res.ok){
        return null;
    }
    
    return res.json();
    
};


const TileDetailsPage = async({ params }) => {
    const { id } = await params;

    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    })

    if(!session) {
        redirect(`/login?redirect=/tiles/${id}`);
    }

    const tile = await getSingletile(id);
    

  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8'>
        {/* heading */}
        <div className='mb-8 lg:mb-14 text-center'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>Tile Details</h1>
            <p className='text-sm sm:text-base text-gray-500 mt-3'>Explore premium aesthetic tile collection</p>
        </div>

        {/* container */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-14 items-stretch'>
            {/* left image */}
            <div className='overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl group bg-base-200 h-[300px] sm:h-[450px] lg:h-[600px]'>
                <Image
                    src={tile?.image}
                    alt={tile?.title}
                    width={500}
                    height={500}
                    className="
                        w-full
                        h-full
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-110
                    "
                />
            </div>

            {/* right details info */}
            <div className='w-full'>
                <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight'>{tile?.title}</h2>
                <p className='text-sm sm:text-base lg:text-lg text-gray-500'>By {tile?.creator}</p>
                
                <h3 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mt-4 mb-6 lg:mb-8'>
                    {tile?.currency} {tile?.price}
                </h3>

                <div className='space-y-4 sm:space-y-5 text-sm sm:text-base lg:text-lg'>
                    <div className='flex items-center justify-between border-b border-base-300 pb-3'>
                        <span className='text-lg sm:text-xl font-semibold'>
                            Category
                        </span>
                        <span className='capitalize text-lg'>
                            {tile.category}
                        </span>
                    </div>

                    <div className='flex items-center justify-between border-b border-base-300 pb-3'>
                        <span className='text-lg sm:text-xl font-semibold'>
                            Stock
                        </span>
                        {
                            tile.inStock ? (
                                <span className='badge badge-success badge-lg text-white'>
                                    In Stock
                                </span>
                            ) : (
                                <span className='badge badge-success badge-lg text-white'>
                                    Out of Stock
                                </span>
                            )
                        }
                    </div>

                    <div className='pt-4'>
                        <h4 className='text-lg sm:text-xl font-semibold mb-1'>
                            Description
                        </h4>
                        <p className='text-gray-600 leading-7 sm:leading-8'>
                            {tile.description}
                        </p>
                    </div>

                    <div className='pt-3'>
                        <h4 className='text-lg sm:text-xl font-semibold mb-4'>
                            Tags
                        </h4>

                        <div className='flex flex-wrap gap-2 sm:gap-3'>
                            {
                                tile.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className='badge badge-outline px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm'>
                                        {tag}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 mt-8 lg:mt-12'>
                    <Link
                        href={"/all-tiles"}
                        className='w-full sm:w-auto'
                    >
                        <button className='btn btn-outline w-full sm:w-auto'>
                            Back To Gallery
                        </button>
                    </Link>

                    <button className='btn btn-primary w-full sm:w-auto'>
                        Save Tile
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default TileDetailsPage