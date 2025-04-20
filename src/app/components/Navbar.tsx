"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`sticky top-0 z-10 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-lg' : 'bg-white'
    } border-b border-gray-200`}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl text-gray-900 font-semibold hover:text-blue-600 transition-colors">
            Draftise
          </Link>
          <div className="flex space-x-6 text-gray-900">
            <Link href="/" className="text-gray-900 hover:text-blue-600 transition-colors">Calculator</Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 