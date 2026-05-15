'use client';
import { authClient } from '@/lib/auth-client';
import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
const footerLogo = '/images/logo-xl.png';
const instagram = '/images/instagram.png';
const facebook = '/images/facebook.png';
const twitter = '/images/twitter.png';


const Footer = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
        const { data } = await authClient.getSession();
        setIsLoggedIn(!!data);
    };

    checkUser();
    }, []);

  return (
    <>
        <footer className='bg-base-200 mt-20 border-t border-base-300'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>

                {/* main footer */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>

                    {/* logo and description */}
                    <div>
                        <Link href={"/"}>
                            <h2 className="text-3xl font-bold mb-4">
                                Tile<span className="text-blue-500 text-primary">Gallery</span>
                            </h2>
                        </Link>

                        <p className='text-gray leading-7'>
                            Discover premium aesthetic tiles for modern, luxurious and elegant interiors. Build your dream space with our curated tile collection.
                        </p>
                    </div>
                    
                    {/* Quick links */}
                    <div>
                        <h3 className='text-xl font-semibold mb-5'>
                            Quick Links
                        </h3>

                        <ul className='space-y-3'>
                            <li>
                                <Link href={"/"} className='hover:text-primary transition'>
                                Home
                                </Link>
                            </li>
                            <li>
                                <Link href={"/all-tiles"} className='hover:text-primary transition'>
                                All Tiles
                                </Link>
                            </li>
                            <li>
                                <Link href={"/my-profile"} className='hover:text-primary transition'>
                                My Profile
                                </Link>
                            </li>
                            <li>
                                <Link href={isLoggedIn ? "/my-profile" : "/login"} className='hover:text-primary transition'>
                                Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* contact us */}
                    <div>
                        <h3 className='text-xl font-semibold mb-5'>
                            Contact Us
                        </h3>

                        <div className='space-y-4'>
                            <div className='flex items-start gap-3'>
                                <MapPin className='w-5 h-5 text-primary mt-1' />
                                <p className='text-gray-500'>
                                    Sirajganj, Bangladesh
                                </p>
                            </div>

                            <div className='flex items-center gap-3'>
                                <Phone className='w-5 h-5 text-primary' />
                                <p className='text-gray-500'>
                                    +8801608177973
                                </p>
                            </div>

                            <div className='flex items-center gap-3'>
                                <Mail className='w-5 h-5 text-primary' />
                                <p className='text-gray-500'>
                                    support@tilegallery.com
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* social links */}
                    <div>
                        <h3 className='text-xl font-semibold mb-5'>
                            Follow Us
                        </h3>

                        <ul className='flex items-center gap-4'>
                            <li>
                                <a href=""><img src={instagram} alt="" /></a>
                            </li>
                            <li>
                                <a href=""><img src={facebook} alt="" /></a>
                            </li>
                            <li>
                                <a href=""><img src={twitter} alt="" /></a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* bottom footer */}
                <div className='border-t border-base-300 mt-10 pt-6 text-center'>
                    <p className='text-gray-500 text-sm sm:text-base'>
                        © 2026 TileGallery. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer