"use client";
import { useState } from 'react';
import Navbar from './components/Navbar';
import { calculateValue } from './lib/calculate_value';
import Picks from './components/Picks';

export default function Home() {
  const [xPicks, setXPicks] = useState<number[]>([]);
  const [yPicks, setYPicks] = useState<number[]>([]);
  const [valueType, setValueType] = useState<'l1_value' | 'l2_value' | 'jj_value'>('l1_value');

  const addXPicks = (pick: number) => {
    setXPicks([...xPicks, pick]);
  }
  
  const addYPicks = (pick: number) => {
    setYPicks([...yPicks, pick]);
  }

  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Trade Value Calculator
          </h1>
          <p className="text-gray-600">
            Welcome to the Trade Value Calculator. This tool will help you evaluate draft pick trades.
          </p>
        <Picks />
        </div>
      </main>
      
    </div>
  );
}
