'use client';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {

  const {register, handleSubmit, formState: {errors}} = useForm();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const handleLoginFunc = async(data) => {

    const { data:res, error } = await authClient.signIn.email({
    email: data.email, // required
    password: data.password, // required
    rememberMe: true,
    callbackURL: redirectPath,
});

console.log(res, error)
}

  const handleGoogleSignIn = async() => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectPath
    });
  }

  const handleGitHubSignIn = async() => {
    const data = await authClient.signIn.social({
        provider: "github",
        callbackURL: redirectPath
    })
  }

  return (
    <>
      <div className='flex min-h-screen justify-center items-center bg-slate-100 px-4'>
        <form onSubmit={handleSubmit(handleLoginFunc)} className="fieldset bg-white border-base-300 rounded-box w-full max-w-md border p-4">
          <legend className="text-2xl font-bold text-center">Login</legend>
          <p className='text-center text-gray-500 text-sm mb-2'> Welcome back! Please login to continue</p>

          <label className="label text-black font-bold">Email</label>
          <input type="email"  className="input w-full bg-slate-100" placeholder="Email" {...register("email", { required: "Email field is required" })} />
          {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          <label className="label text-black font-bold">Password</label>
          <fieldset className='fieldset relative'>
            <input 
              type={isShowPassword ? "text" : "password"}
              className="w-full input bg-slate-100" 
              placeholder="Password" {...register("password", { required: "Password field is required" })}/>
            <span className="absolute right-2 top-4 cursor-pointer" onClick={() => setIsShowPassword(!isShowPassword)}>
              {isShowPassword ? <FaEye /> : <FaEyeSlash/>}
            </span>
          </fieldset>
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

          <button className="btn btn-primary mt-4">Login</button>

          <div className='divider'>
              OR
          </div>

          <button 
            className="btn btn-outline w-full text-black border-[#e5e5e5]"
            onClick={handleGoogleSignIn}
            type='button'
          >
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
          </button>

          <button
            className="btn btn-neutral w-full bg-black text-white border-black mt-4"
            onClick={handleGitHubSignIn}
            type='button'
          >
            <svg aria-label="GitHub logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
            Login with GitHub
          </button>

          <p className='pt-4'>
              Don't have an account? 
              <Link href={"/register"} className='text-blue-500'> Register</Link>
          </p>
        </form>
      
      </div>
    </>
  )
}

export default LoginPage
