'use client'
import { authClient } from '@/lib/auth-client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const MyProfile = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    useEffect(() => {
        if(!isPending && !user){
            const timer = setTimeout(() => {
                router.replace("/login");
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
    <div>
       <h1>My Profile</h1>;
       <p>Name: {user.name}</p>;
       <p>Email: {user.email}</p>;
    </div>
  )
}

export default MyProfile
