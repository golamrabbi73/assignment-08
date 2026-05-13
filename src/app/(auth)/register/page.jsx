'use client';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {

  const {register, handleSubmit, formState: {errors}} = useForm();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const router = useRouter();

  const handleRegisterFunc = async(data) => {

    const {email, name, photo, password} = data;

    const {data: res, error} = await authClient.signUp.email({
      name: name, // required
      email: email, // required
      password: password, // required
      image: photo,
      callbackURL: "/",
    })
    
    if(error){
      alert(error.message)
    }

    if(res){
      alert('Signup successful');

      router.push("/")
    }
  }
  return (
    <>
      <div className='flex min-h-screen justify-center items-center bg-slate-100 px-4'>
        <form onSubmit={handleSubmit(handleRegisterFunc)} className="fieldset bg-white border-base-300 rounded-2xl shadow-xl w-full max-w-md border p-8">
          <legend className="text-2xl font-bold text-center">Register</legend>
          <p className='text-center text-sm text-gray-500 mb-4'>
            Create your account to continue
          </p>

          <label className="label text-black font-bold">Name</label>
          <input type="text"  className="input input-bordered w-full bg-slate-100" placeholder="Type here name" {...register("name", { required: "Eame field is required" })} />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
          <label className="label text-black font-bold">Photo URL</label>
          <input type="text" className="input input-bordered w-full bg-slate-100" placeholder="Type here photo url" {...register("photo", { required: "Photo URL field is required" })}/>
          {errors.photo && <p className='text-red-500'>{errors.photo.message}</p>}

          <label className="label text-black font-bold">Email</label>
          <input type="email"  className="input input-bordered w-full bg-slate-100" placeholder="Email" {...register("email", { required: "Email field is required" })} />
          {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          <label className="label text-black font-bold">Password</label>
          <fieldset className='fieldset relative'>
            <input
            type={isShowPassword ? "text" : "password"}
            className="input input-bordered w-full bg-slate-100" 
            placeholder="Password" {...register("password", { required: "Password field is required" })}/>
            <span className="absolute right-2 top-4 cursor-pointer" onClick={() => setIsShowPassword(!isShowPassword)}>
              {isShowPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </fieldset>
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

          <button
            className="btn btn-primary w-full mt-4">
            
              Register
          </button>
          <p className='text-center text-sm mt-4'>
            Already have an account?
            <Link href={"/login"} className='text-primary ml-1'>
              Login
            </Link>
          </p>
        </form>
      
      </div>
    </>
  )
}

export default RegisterPage
