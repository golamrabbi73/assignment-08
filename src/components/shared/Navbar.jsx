"use client";
import { Menu, X } from "lucide-react";
import React, { useState } from 'react'
// import Navlink from "../navlink/Navlink";
import { authClient } from "@/lib/auth-client";
import userAvatar from "@/assest/user.png";
import Link from "next/link";
import Image from "next/image";
import Navlink from "./Navlink";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  // const users = null;

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
  }

  return (
    <>
      <nav className="navbar sticky top-0 z-50 bg-base-100 shadow-sm">
        <div className="w-full flex items-center justify-between">
          
          {/* left logo */}
          <div>
            <Navlink href={"/"}>
              <h1 className="text-xl font-bold tracking-wide">
                Tile<span className="text-blue-500">Gallery</span>
              </h1>
            </Navlink>
          </div>

          {/* centre - menu for desktop */}
          <div className='hidden md:flex gap-8 font-medium'>
            <Navlink href='/'>Home</Navlink>
            <Navlink href="/all-tiles">All Tiles</Navlink>
            <Navlink href="/my-profile">My Profile</Navlink>
          </div >
          

          {/* right - auth for desk */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? <span className="loading loading-spinner loading-sm"></span> : user ? (
              <>
                <h3>Hello, {user?.name}</h3>
                <Link href={"/my-profile"}>
                  <Image
                  src={user?.image || userAvatar} 
                  alt="User avatar" 
                  width={40}
                  height={40}
                />
                </Link>

                <button className="btn btn-error cursor-pointer" onClick={handleLogout}>Logout</button>
              </>
              ) : (
                    <Link className="btn btn-primary" href={"/login"}>Login</Link>
                  )
            }
          </div>
          
          {/* mobile menu button */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            {
              open? <X /> : <Menu />
            }
          </button>
        </div>

        {/* mobile menu  */}
        {
          open && (
            <div className="md:hidden mt-4 flex flex-col gap-4 bg-gray-800 p-4 rounded-lg">
              <Navlink href="/" onClick={() => setOpen(false)}>Home</Navlink>
              <Navlink href="/all-tiles" onClick={() => setOpen(false)}>All Tiles</Navlink>
              <Navlink href="/profile" onClick={() => setOpen(false)}>My Profile</Navlink>

              {
                !user? (
                  <Navlink href="/login" onClick={() => setOpen(false)}>
                    Login
                  </Navlink>
                ) : (
                  <>
                    <Navlink href="/profile" onClick={() => setOpen(false)}>
                      Profile
                    </Navlink>
                    <button>
                      Logout
                    </button>
                  </>
                )
              }
            </div>
          )
        }
        
      </nav>
    </>
  )
}

export default Navbar
