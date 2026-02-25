'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="bg-blue-900 text-white shadow-lg">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-extrabold tracking-wider">
                            WORK<span className="text-yellow-500">OPIA</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/homepage" className="text-sm font-medium hover:text-yellow-500 transition-colors">
                            All Jobs
                        </Link>
                        <Link to="/login" className="text-sm font-medium hover:text-yellow-500 transition-colors">
                            Login
                        </Link>
                        <Link to="/register" className="text-sm font-medium hover:text-yellow-500 transition-colors">
                            Register
                        </Link>
                        <Link
                            href="/jobs/create"
                            className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-4 py-2 rounded-md text-sm font-bold transition-all shadow-sm"
                        >
                            Post a Job
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg
                                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-blue-800 border-t border-blue-700`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">
                        All Jobs
                    </Link>
                    <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">
                        Login
                    </Link>
                    <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">
                        Register
                    </Link>
                    <Link
                        to="/homepage"  
                        className="block px-3 py-2 mt-4 text-center bg-yellow-500 text-blue-900 rounded-md text-base font-bold"
                    >
                        Post a Job
                    </Link>
                </div>
            </div>
        </header>
    );
}

