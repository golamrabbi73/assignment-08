"use client";
import { Menu } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import userAvatar from "@/assest/user.png";
import Link from "next/link";
import Image from "next/image";
import Navlink from "./Navlink";

const Navbar = () => {

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
  }

  return (
    <>
      <div className="drawer drawer-end">
        <input
          type="checkbox"
          id="mobile-drawer"
          className="drawer-toggle"/>
        <div className="drawer-content pt-21">
          <nav className="navbar fixed top-0 z-50 bg-base-100 shadow-sm">
            <div className="w-full flex items-center justify-between px-4 py-3">
              
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

              {/* mobile menu */}
              <div className="md:hidden">
                <label
                  htmlFor="mobile-drawer"
                  className="btn btn-ghost">
                  <Menu size={28}/>
                </label>
              </div>
            </div>
          </nav>
        </div>

        <div className="drawer-side z-[900]">
          <label
            htmlFor="mobile-drawer"
            className="drawer-overlay"
          ></label>

          <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-3">
            {/* Sidebar content here */}
            <li>
              <Navlink href='/' onClick={() => document.getElementById("mobile-drawer").click()}>Home</Navlink>
            </li>
            <li>
              <Navlink href="/all-tiles" onClick={() => document.getElementById("mobile-drawer").click()}>All Tiles</Navlink>
            </li>
            <li>
              <Navlink href="/my-profile" onClick={() => document.getElementById("mobile-drawer").click()}>My Profile</Navlink>
            </li>

            {
              user? (
                <>
                  <div className="flex items-center gap-3 px-2">
                    <Link
                      href={"/my-profile"}
                      onClick={() => document.getElementById("mobile-drawer").click()}
                    >
                      <Image
                        src={user?.image || userAvatar}
                        alt="User avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </Link>
                    <span>{user?.name}</span>
                  </div>

                  <li onClick={() => document.getElementById("mobile-drawer").click()}>
                    <button
                      className="btn btn-error mt-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                  <Link
                   className="btn btn-primary" href={"/login"}
                   onClick={() => document.getElementById("mobile-drawer").click()}
                  >
                    Login
                  </Link>
                )
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
