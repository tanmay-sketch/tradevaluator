"use client";
import Navbar from '../components/Navbar';
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
            About Valpick
          </h1>
          
          <Card className="p-8 mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 dark:bg-gradient-to-br dark:from-blue-950/40 dark:to-indigo-950/40 dark:border-blue-800 rounded-lg overflow-hidden">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Research Background</h2>
            <p className="mb-4 dark:text-gray-300">
              Valpick was developed from my own research on NFL draft modelling. Initially it started off 
              as a class project for my Sports Analytics class but now is a result of my own work. The goal is 
              simple: to help NFL teams, analysts, and fans evaluate potential trades on draft day to help them make 
              the best decisions for their team. Because of the uncertainty of who a team will draft, it is difficult 
              to know the actual value of a pick until after the draft. Valpick is a tool that allows you to evaluate your
              position value against another team&apos;s position value to help you make the best decisions for your team.
            </p>
            
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Key Models</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 dark:text-gray-300">
              <li>
                <span className="font-medium dark:text-gray-200">Jimmy Johnson Value Chart:</span> The original draft value 
                chart developed in the 1990s by former Dallas Cowboys coach Jimmy Johnson. This chart 
                has been an industry standard for decades.
              </li>
              <li>
                <span className="font-medium dark:text-gray-200">L1 Value Model:</span> A modern valuation model that accounts 
                for the actual on-field performance of drafted players, developed through statistical analysis 
                of player careers and contributions.
              </li>
              <li>
                <span className="font-medium dark:text-gray-200">L2 Value Model:</span> An enhanced version of the L1 model that 
                incorporates positional value, contract considerations, and long-term team building strategy.
              </li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Research Methodology</h3>
            <p className="mb-4 dark:text-gray-300">
              Our research fitted a model to thousands of NFL draft trades from 2006 to 2023, to fit a distribution that
              minimizes the value difference between the trades made. Below is a graph that shows a comparison of the 
              valuation of picks using the L1 and L2 models vs the Jimmy Johnson value chart.
            </p>
            
            <div className="flex justify-center">
              <Image src="/graph.png" alt="Value Distribution" width={500} height={500} />
            </div>
            
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Applications</h3>
            <p className="mb-6 dark:text-gray-300">
              Valpick helps NFL teams, analysts, and fans evaluate potential trades by providing a 
              data-driven approach to draft pick valuation. This ensures more equitable trades and 
              helps teams maximize the value of their draft capital.
            </p>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
              <h4 className="font-semibold mb-2 dark:text-white">Academic Reference</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Check out my paper on ArXiv: 
                <a href="https://arxiv.org/pdf/2504.07291" className="text-blue-600 dark:text-blue-400 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  &quot;Data-Driven NFL Draft Pick Valuation Models&quot; (ArXiv:2504.07291)
                </a>
              </p>
            </div>
          </Card>
          
          <Card className="p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">How To Use Valpick</h2>
            <p className="mb-4 dark:text-gray-300">
              Using Valpick is simple:
            </p>
            
            <ol className="list-decimal pl-6 mb-6 space-y-2 dark:text-gray-300">
              <li>Select a value model (L1, L2, or Jimmy Johnson)</li>
              <li>Add the draft picks for Team X and Team Y</li>
              <li>Click &quot;Calculate&quot; to see which team gets more value in the trade</li>
            </ol>
            
            <p className="dark:text-gray-300">
              The results show you the total value for each team and the difference between them, 
              making it clear which team &quot;wins&quot; the trade according to your selected valuation model.
            </p>
          </Card>
        </div>
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-8 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Valpick. All rights reserved.</p>
      </footer>
    </div>
  );
} 