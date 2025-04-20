"use client";
import Navbar from './components/Navbar';
import Picks from './components/Picks';
import ValueSelectionGuide from './components/ValueSelectionGuide';

function TradeCalculator() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">
        Trade Value Calculator
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Welcome to the Trade Value Calculator. This tool will help you evaluate draft pick trades.
      </p>
      
      <ValueSelectionGuide />
      
      <div className="mb-8">
        <Picks teamXPicks={[]} teamYPicks={[]} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 p-8">
        <TradeCalculator />
      </main>
    </div>
  );
}
