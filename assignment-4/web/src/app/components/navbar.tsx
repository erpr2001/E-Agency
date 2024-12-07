'use client'
// import React from 'react';
// import Link from 'next/link';

// const Navbar: React.FC = () => {
//   return (
//     <nav>
//       <Link href="/">Home </Link>
//       <Link href="/login"> Login </Link>
//       <Link href="/register"> Register </Link>
//       <Link href="/booking-status"> Booking Status </Link>
//       <Link href="/gallery"> Gallery </Link>
//     </nav>
//   );
// };

// export default Navbar;


import React, {useEffect} from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {

  useEffect(() => {
    const btn = document.querySelector("button.mobile-menu-button");
    const menu = document.querySelector(".mobile-menu");

    if (btn && menu) {
      btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
      });
    }
  }, []);

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
            <Link href="/booking-status" className="py-4 px-2 text-gray-300 hover:text-white transition duration-300">Booking Status</Link>
            <Link href="/login" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Login</Link>
            <Link href="/register" className="py-2 px-2 font-medium text-white bg-purple-500 rounded hover:bg-purple-400 transition duration-300">Register</Link>
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
          <li><Link href="/booking-status" className="block text-sm px-2 py-4 text-white hover:bg-green-500 transition duration-300">Booking Status</Link></li>
          <li><Link href="/login" className="block text-sm px-2 py-4 text-white hover:bg-green-500 transition duration-300">Login</Link></li>
          <li><Link href="/register" className="block text-sm px-2 py-4 text-white hover:bg-green-500 transition duration-300">Register</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;