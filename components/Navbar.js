'use client';

import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark =
      localStorage.getItem('darkMode') === 'true' ||
      (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    if (newMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  return (
    <>
      {/* Navbar for logged-in users */}
      <SignedIn>
        <nav className="bg-white dark:bg-gray-900 shadow-sm p-4 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl">Shortly</Link>
          <div className="flex items-center space-x-4">
            {/* 3 links for logged-in users */}
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/shorten" className="hover:text-blue-600">Shorten</Link>
            <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>

            <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <UserButton afterSignOutUrl="/" />
          </div>
        </nav>
      </SignedIn>

      {/* Navbar for logged-out users */}
      <SignedOut>
        <nav className="bg-white dark:bg-gray-900 shadow-sm p-4 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl">Shortly</Link>
          <div className="flex items-center space-x-4">
            {/* 3 links for logged-out users */}
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/shorten" className="hover:text-blue-600">Shorten</Link>
            <Link href="/" className="hover:text-blue-600">Documentation</Link>

            <SignInButton mode="modal">
              <button className="hover:text-blue-600">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Get Started
              </button>
            </SignUpButton>

            <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </SignedOut>
    </>
  );
}
