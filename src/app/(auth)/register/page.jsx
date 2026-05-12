'use client';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {

  const {register, handleSubmit, formState: {errors}} = useForm();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleRegisterFunc = async(data) => {

    const {email, name, photo, password} = data;

    const {data: res, error} = await authClient.signUp.email({
      name: name, // required
      email: email, // required
      password: password, // required
      image: photo,
      callbackURL: "/",
    })
    console.log(data, error);
    if(error){
      alert(error.message)
    }

    if(res){
      alert('Signup successful')
    }
  }
  return (
    <>
      <div className='container mx-auto flex min-h-[80vh] justify-center items-center bg-slate-100'>
        <form onSubmit={handleSubmit(handleRegisterFunc)} className="fieldset bg-white border-base-300 rounded-box w-xs border p-4">
          <legend className="text-2xl font-bold text-center">Register</legend>

          <label className="label text-black font-bold">Name</label>
          <input type="text"  className="input bg-slate-100" placeholder="Type here name" {...register("name", { required: "Eame field is required" })} />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
          <label className="label text-black font-bold">Photo URL</label>
          <input type="text" className="input bg-slate-100" placeholder="Type here photo url" {...register("photo", { required: "Photo URL field is required" })}/>
          {errors.photo && <p className='text-red-500'>{errors.photo.message}</p>}

          <label className="label text-black font-bold">Email</label>
          <input type="email"  className="input bg-slate-100" placeholder="Email" {...register("email", { required: "Email field is required" })} />
          {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          <label className="label text-black font-bold">Password</label>
          <fieldset className='fieldset relative'>
            <input
            type={isShowPassword ? "text" : "password"}
            className="input bg-slate-100" 
            placeholder="Password" {...register("password", { required: "Password field is required" })}/>
            <span className="absolute right-2 top-4 cursor-pointer" onClick={() => setIsShowPassword(!isShowPassword)}>
              {isShowPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </fieldset>
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

          <button className="btn btn-neutral mt-4">Register</button>
        </form>
      
      </div>
    </>
  )
}

export default RegisterPage
