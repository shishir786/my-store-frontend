'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <nav className="bg-neutral text-neutral-content sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold">MyStore</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <Link 
                href="/" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/') 
                    ? 'text-primary' 
                    : 'text-neutral-content/80 hover:text-primary'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/products') || pathname.startsWith('/products/')
                    ? 'text-primary' 
                    : 'text-neutral-content/80 hover:text-primary'
                }`}
              >
                Products
              </Link>
              <Link 
                href="/categories" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/categories')
                    ? 'text-primary' 
                    : 'text-neutral-content/80 hover:text-primary'
                }`}
              >
                Categories
              </Link>
              <Link 
                href="/deals" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/deals')
                    ? 'text-primary' 
                    : 'text-neutral-content/80 hover:text-primary'
                }`}
              >
                Deals
              </Link>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input input-bordered input-sm w-64 bg-neutral-focus text-neutral-content placeholder:text-neutral-content/50"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-content/50 hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* User Menu */}
            <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Cart */}
            <button className="btn btn-ghost btn-circle relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden btn btn-ghost btn-circle"
            >
              <svg 
                className={`${isMenuOpen ? 'hidden' : 'block'} h-5 w-5`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`${isMenuOpen ? 'block' : 'hidden'} h-5 w-5`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-neutral-focus`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            href="/" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') 
                ? 'text-primary bg-neutral' 
                : 'text-neutral-content/80 hover:text-primary hover:bg-neutral'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/products" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/products') || pathname.startsWith('/products/')
                ? 'text-primary bg-neutral' 
                : 'text-neutral-content/80 hover:text-primary hover:bg-neutral'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link 
            href="/categories" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/categories')
                ? 'text-primary bg-neutral' 
                : 'text-neutral-content/80 hover:text-primary hover:bg-neutral'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Categories
          </Link>
          <Link 
            href="/deals" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/deals')
                ? 'text-primary bg-neutral' 
                : 'text-neutral-content/80 hover:text-primary hover:bg-neutral'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Deals
          </Link>
        </div>

        {/* Mobile Search */}
        <div className="px-4 py-3 border-t border-neutral">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-full bg-neutral text-neutral-content placeholder:text-neutral-content/50"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-content/50 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;