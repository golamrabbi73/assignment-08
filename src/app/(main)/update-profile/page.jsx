"use client";
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const UpdateProfile = () => {

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const router = useRouter();

    const [name, setName] = useState(user?.name || "");
    const [image, setImage] = useState(user?.image || "");
    const [loading, setLoading] = useState(false);

    const handleUpade = async (e) => {
        e.preventDefault();

        setLoading(true);

        try{
            await authClient.updateUser({
                name,
                image,
            });

            alert("Profile Updated Successfully");

            router.push("/my-profile");

            } catch (error) {
                alert("Failed to update profile");
            }

            setLoading(false);
    };

  return (
    <div className='min-h-[calc(100vh-90px)] flex items-center justify-center bg-base-200 px-4 py-10'>
        <div className='bg-base-100 w-full shadow-xl rounded-2xl max-w-md p-5 sm:p-8'>
            <h1 className='text-1xl sm:text-3xl font-bold mb-6 text-center'>
                Update Profile
            </h1>

            <form onSubmit={handleUpade} className='space-y-4'>
                <input
                    type='text'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='input input-bordered w-full'
                />

                <input
                    type='text'
                    placeholder='Enter Image URL'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className='input input-bordered w-full'
                />
                
                <button
                    type='submit'
                    className='btn btn-primary w-full'
                    disabled={loading}
                >
                    {
                        loading ? "Updating..." : "Update Information"
                    }
                </button>
            </form>
        </div>
    </div>
  )
}

export default UpdateProfile