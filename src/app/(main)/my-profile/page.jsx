'use client'
import { authClient } from '@/lib/auth-client'
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const MyProfile = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    useEffect(() => {
        if(!isPending && !user){
            const timer = setTimeout(() => {
                redirect(`/login?redirect=/my-profile`);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [user, isPending, router]);

    if(isPending){
        return <p className='text-center mt-10'>
                    <span className="loading loading-spinner loading-sm"></span>
                </p>;
            }

    if(!user) {
        return (
            <div className='text-center mt-20 text-red-500 font-medium'>
                You are not logged in. Please login first...
            </div>
        )
    };

  return (
    <div className='min-h-[calc(100vh-90px)] flex items-center justify-center bg-base-200 px-4 py-10'>
        <div className="bg-base-100 w-full shadow-xl rounded-2xl max-w-md p-5 sm:p-8">
            <div className="flex flex-col items-center p-8">
                <Image
                    src={user?.image || "/assets/user.png"}
                    alt='User image'
                    width={100}
                    height={100}
                    className='rounded-full border-4 border-primary object-cover w-24 h-24 sm:w-28 sm:h-28'
                />
                <h1 className="text-2xl sm:text-3xl font-bold mt-4 text-center">My Profile</h1>
            </div>

            <div className='space-y-4'>
                <div className="bg-base-200 p-4 rounded-xl break-w">
                    <p className='text-gray-500 text-sm'>
                        Name
                    </p>

                    <h2 className='font-semibold text-base sm:text-lg'>
                        {user?.name}
                    </h2>
                </div>

                <div className="bg-base-200 p-4 rounded-xl">
                    <p className='text-gray-500 text-sm'>
                        Email
                    </p>

                    <h2 className='font-semibold text-base sm:text-lg'>
                        {user?.email}
                    </h2>
                </div>
            </div>

            <Link href={"/update-profile"}>
                <button className='btn btn-primary w-full mt-8'>
                    Update Profile
                </button>
            </Link>
        </div>
    </div>
  )
}

export default MyProfile
