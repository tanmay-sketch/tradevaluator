import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ValueSelectionGuide() {
  return (
    <Card className="mb-8 border border-gray-200 dark:border-gray-700 dark:bg-black rounded-xl overflow-hidden shadow-sm">
      <CardHeader className="dark:bg-black rounded-t-xl">
        <CardTitle className="text-center text-xl dark:text-white">Value Selection Guide</CardTitle>
        <CardDescription className="text-center dark:text-gray-300">
          Choose the value model that best fits your draft strategy
        </CardDescription>
      </CardHeader>
      <CardContent className="dark:bg-black">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl border border-blue-100 dark:border-blue-800 shadow-sm">
            <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">L1 Value</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Recommended if you value late round picks more highly. More balanced approach to 
              valuing picks across all rounds.
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl border border-green-100 dark:border-green-800 shadow-sm">
            <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">L2 Value</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Better if you prioritize early round picks. Places higher value on top selections.
            </p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl border border-purple-100 dark:border-purple-800 shadow-sm">
            <h3 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Jimmy Johnson</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              The classic NFL trade value chart created by the Legendary cowboys coach. Widely used by NFL teams.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 