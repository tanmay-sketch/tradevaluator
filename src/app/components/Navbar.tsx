"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

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
      scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg' : 'bg-white dark:bg-black'
    } border-b border-gray-200 dark:border-gray-800 dark:text-white`}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-2xl text-gray-900 font-semibold hover:text-blue-600 transition-colors dark:text-white dark:hover:text-blue-400">
            <Image 
              src="/ghost.svg" 
              alt="Valpick ghost logo" 
              width={32} 
              height={32} 
              className="w-8 h-8"
            />
            Valpick
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-900 hover:text-blue-600 transition-colors dark:text-white dark:hover:text-blue-400">Calculator</Link>
            <Link href="/about" className="text-gray-900 hover:text-blue-600 transition-colors dark:text-white dark:hover:text-blue-400">About</Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
} 