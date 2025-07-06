"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser, UserButton } from '@clerk/nextjs';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();

  const handleNavClick = (href, itemName) => {
    setClickedItem(itemName);
    
    // Add a small delay to show the 3D effect before navigation
    setTimeout(() => {
      router.push(href);
      setClickedItem(null);
    }, 300);
  };

  const NavLink = ({ href, children, className = "", isActive = false, itemName }) => {
    const isClicked = clickedItem === itemName;
    
    return (
      <div
        className={`
          transform transition-all duration-300 ease-out cursor-pointer
          ${isClicked ? 'scale-95 rotate-x-12 translate-z-4' : 'hover:scale-105 hover:-translate-y-1'}
          perspective-1000 transform-style-preserve-3d
          ${className}
        `}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          ...(isClicked && {
            transform: 'scale(0.95) rotateX(12deg) translateZ(8px)',
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
          })
        }}
        onClick={(e) => {
          e.preventDefault();
          handleNavClick(href, itemName);
        }}
      >
        <Link
          href={href}
          className={`
            flex items-center px-4 py-2 border-b-2 transition-all duration-200
            transform-gpu relative overflow-hidden
            ${isActive 
              ? 'border-indigo-500 text-indigo-500 dark:text-indigo-400 dark:border-indigo-400 font-semibold' 
              : 'border-transparent hover:border-indigo-500 hover:text-indigo-500'
            }
            ${isClicked ? 'animate-pulse' : ''}
          `}
          onClick={(e) => e.preventDefault()}
        >
          <span className="relative z-10">{children}</span>
          {/* 3D shine effect */}
          <div 
            className={`
              absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
              transform skew-x-12 -translate-x-full transition-transform duration-500
              ${isClicked ? 'translate-x-full' : ''}
            `}
          />
        </Link>
      </div>
    );
  };

  const MobileNavLink = ({ href, children, isActive = false, itemName }) => {
    const isClicked = clickedItem === itemName;
    
    return (
      <div
        className={`
          transform transition-all duration-300 ease-out cursor-pointer
          ${isClicked ? 'scale-90 rotate-y-12' : 'hover:scale-105'}
          perspective-1000
        `}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          ...(isClicked && {
            transform: 'scale(0.9) rotateY(12deg)',
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)',
          })
        }}
        onClick={(e) => {
          e.preventDefault();
          setIsMobileMenuOpen(false);
          handleNavClick(href, itemName);
        }}
      >
        <Link 
          href={href}
          className={`
            block text-lg transition-all duration-200 px-4 py-2 rounded-lg
            ${isActive 
              ? 'text-indigo-500 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-900/20' 
              : 'hover:text-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-700'
            }
            ${isClicked ? 'animate-pulse' : ''}
          `}
          onClick={(e) => e.preventDefault()}
        >
          {children}
        </Link>
      </div>
    );
  };

  return (
    <>
      {/* Add custom CSS for 3D effects */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-x-12 {
          transform: rotateX(12deg);
        }
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        .translate-z-4 {
          transform: translateZ(4px);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>

      <header className="sticky top-0 p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-100 shadow-lg z-50 transition-all duration-500">
        <div className="container flex justify-between items-center h-16 mx-auto px-4">
          {/* Logo with 3D hover effect */}
          <Link href="/" className="flex items-center p-2 group" aria-label="Back to homepage">
            <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 perspective-1000">
              <Image
                src="/logo.png"
                alt="Logo"
                width={64}
                height={64}
                className="w-16 h-16 object-contain mr-3 drop-shadow-xl group-hover:animate-float"
              />
              <span className="ml-2 text-xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400 hidden sm:inline-block select-none">Excel Analytics</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="items-center hidden space-x-6 md:flex">
            <li className="flex">
              <NavLink href="/" itemName="home">
                Home
              </NavLink>
            </li>
            <li className="flex">
              <NavLink href="/dashboard" itemName="Dashboard">
                Dashboard
              </NavLink>
            </li>
            {!isSignedIn && (
              <>
                <li className="flex">
                  <NavLink href="/login" itemName="login">
                    Login
                  </NavLink>
                </li>
                <li className="flex">
                  <NavLink href="/register" itemName="register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
            {isSignedIn && (
              <li className="flex items-center space-x-2">
                <span className="text-sm font-medium mr-2">{user?.fullName || user?.primaryEmailAddress?.emailAddress}</span>
                <UserButton afterSignOutUrl="/login" />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button with 3D effect */}
          <button
            className={`
              p-2 md:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md
              transform transition-all duration-300 hover:scale-110 hover:rotate-12
              ${isMobileMenuOpen ? 'rotate-90 scale-110' : ''}
            `}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 transform transition-all duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Content with 3D slide-in effect */}
        <div className={`
          md:hidden bg-white/95 dark:bg-gray-800/95 shadow-2xl rounded-b-2xl border-t border-gray-200 dark:border-gray-700 overflow-hidden
          transform transition-all duration-500 ease-out
          ${isMobileMenuOpen 
            ? 'opacity-100 max-h-96 translate-y-0 scale-100' 
            : 'opacity-0 max-h-0 -translate-y-4 scale-95'
          }
        `}>
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <MobileNavLink href="/" itemName="mobile-home">
                Home
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink href="/dashboard" itemName="mobile-upload">
                Upload
              </MobileNavLink>
            </li>
            {!isSignedIn && (
              <>
                <li>
                  <MobileNavLink href="/login" itemName="mobile-login">
                    Login
                  </MobileNavLink>
                </li>
                <li>
                  <MobileNavLink href="/register" itemName="mobile-register">
                    Register
                  </MobileNavLink>
                </li>
              </>
            )}
            {isSignedIn && (
              <li className="flex items-center space-x-2">
                <span className="text-sm font-medium mr-2">{user?.fullName || user?.primaryEmailAddress?.emailAddress}</span>
                <UserButton afterSignOutUrl="/login" />
              </li>
            )}
          </ul>
        </div>

        {/* Page transition overlay */}
        {clickedItem && (
          <div className="fixed inset-0 bg-indigo-500/10 backdrop-blur-sm z-40 animate-pulse" />
        )}
      </header>
    </>
  );
};

export default Header;