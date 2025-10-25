"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { Link2, Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ThemeContext } from "../app/theme"; // adjust path to your ThemeProvider

export default function Navbar({ onThemeChange, className = "" }) {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navigation = [
    { name: "Features", href: "#features" },
    { name: "Shorten", href: "/shorten" },
    { name: "API", href: "#" },
    { name: "Documentation", href: "#" },
  ];

  return (
    <>
      <nav
      className={`bg-white/90 dark:bg-black/900 backdrop-blur-sm border-b border-gray-700 dark:border-gray-900 sticky top-0 z-50 ${className}`}
      >
      <div className="w-fill mx-auto px-6 bg-white/80-20 dark:bg-black/90">
        <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Link2 className="w-8 h-8 text-blue-900" />
              <span className="text-2xl font-bold text-blue-900">
                Shortly
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8  text-black/90 dark:text-gray-300">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.dropdown ? (
                    <>
                      <button className="flex items-center space-x-1 text-black-700 dark:text-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                        <span>{item.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <div className="absolute top-full left-0 mt-2 w-48 bg-black-800 dark:bg-black-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-1 z-50">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            className="block px-4 py-3 text-sm text-black-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      className="light:text-black-900 dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-400 transition-colors font-medium"
                      href={item.href}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4 ">
              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-400/20 dark:bg-black-800/50 text-blue-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Clerk Auth Buttons */}
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-blue-900 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl">
                    Get Started Free
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div className="space-y-2">
                        <div className="font-medium text-gray-900 dark:text-white py-2">
                          {item.name}
                        </div>
                        <div className="pl-4 space-y-2 border-l-2 border-gray-200 dark:border-gray-700">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              onClick={closeMobileMenu}
                              className="block py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                        onClick={closeMobileMenu}
                        href={item.href}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Clerk Buttons in Mobile Menu */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button
                        className="block w-full text-center py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                        onClick={closeMobileMenu}
                      >
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button
                        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors shadow-lg"
                        onClick={closeMobileMenu}
                      >
                        Get Started Free
                      </button>
                    </SignUpButton>
                  </SignedOut>

                  <SignedIn>
                    <div className="flex justify-center py-3">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </SignedIn>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}
