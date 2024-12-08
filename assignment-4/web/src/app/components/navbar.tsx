'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const btn = document.querySelector("button.mobile-menu-button");
    const menu = document.querySelector(".mobile-menu");

    const toggleMenu = () => menu?.classList.toggle("hidden");

    btn?.addEventListener("click", toggleMenu);

    return () => {
      btn?.removeEventListener("click", toggleMenu);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-white text-lg">E Agency</span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="py-4 px-2 text-gray-300 hover:text-white transition duration-300">Home</Link>
            <Link href="/gallery" className="py-4 px-2 text-gray-300 hover:text-white transition duration-300">Gallery</Link>
            {session ? (
              <>
                <Link href="/booking-status" className="py-4 px-2 text-gray-300 hover:text-white transition duration-300">Booking Status</Link>
                {session.user.role === 'admin' && (
                  <Link href="/admin/dashboard" className="py-4 px-2 text-gray-300 hover:text-white transition duration-300">Admin</Link>
                )}
                <button onClick={handleSignOut} className="py-2 px-2 font-medium text-white bg-red-500 rounded hover:bg-red-400 transition duration-300">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Login</Link>
                <Link href="/register" className="py-2 px-2 font-medium text-white bg-purple-500 rounded hover:bg-purple-400 transition duration-300">Register</Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button">
              <svg className="w-6 h-6 text-gray-300 hover:text-white"
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div className="hidden mobile-menu">
        <ul className="">
          <li><Link href="/" className="block text-sm px-2 py-4 text-white hover:bg-green-500 transition duration-300">Home</Link></li>
          <li><Link href="/gallery" className="block text-sm px-2 py-4 text-white hover:bg-green-500 transition duration-300">Gallery</Link></li>
          {session ? (
            <>
              <li><Link href="/booking-status" className="block text-sm px-2 py-4 text-white hover:bg-green-500 transition duration-300">Booking Status</Link></li>
              {session.user.role === 'admin' && (
                <li><Link href="/admin/dashboard" className="block text-sm px-2 py-4 text-white hover:bg-green-500 transition duration-300">Admin</Link></li>
              )}
              <li><button onClick={handleSignOut} className="block w-full text-left text-sm px-2 py-4 text-white hover:bg-red-500 transition duration-300">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link href="/login" className="block text-sm px-2 py-4 text-white hover:bg-green-500 transition duration-300">Login</Link></li>
              <li><Link href="/register" className="block text-sm px-2 py-4 text-white hover:bg-green-500 transition duration-300">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;