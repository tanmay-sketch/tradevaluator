import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-white/20 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl text-gray-900 font-semibold hover:text-blue-600 transition-colors">
            Trade Valuator
          </Link>
          <div className="flex space-x-6 text-gray-900">
            <Link href="/" className="text-gray-900 hover:text-blue-600 transition-colors">Calculator</Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 