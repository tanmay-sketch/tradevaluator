"use client";
import Navbar from './components/Navbar';
import Picks from './components/Picks';
import ValueSelectionGuide from './components/ValueSelectionGuide';

function TradeCalculator() {
  return (
    <div className="max-w-4xl mx-auto">
      <ValueSelectionGuide />
      
      <div className="mb-8">
        <Picks teamXPicks={[]} teamYPicks={[]} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Navbar />
      <main className="flex-1 p-8">
        <TradeCalculator />
      </main>
    </div>
  );
}
