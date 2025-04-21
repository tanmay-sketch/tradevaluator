"use client"
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ValueSelectorProps {
    onValueTypeChange: (valueType: 'l1_value' | 'l2_value' | 'jj_value' | null) => void;
    selectedValue: 'l1_value' | 'l2_value' | 'jj_value' | null;
}

interface PickValue {
    pick: number;
    l1_value: number;
    l2_value: number;
    jj_value: number;
}

interface PickValuesRecord {
    [key: string]: PickValue;
}

interface TradeResult {
    xTotal: number;
    yTotal: number;
    diff: number;
}

interface TradeWinnerProps {
    result: TradeResult | null;
}

export function TradeWinner({ result }: TradeWinnerProps) {
    if (!result) return null;
    
    const { xTotal, yTotal, diff } = result;
    
    let winnerMessage = "";
    let winnerClass = "";
    
    if (diff > 0) {
        winnerMessage = "Team X wins the trade!";
        winnerClass = "bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-800";
    } else if (diff < 0) {
        winnerMessage = "Team Y wins the trade!";
        winnerClass = "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-800";
    } else {
        winnerMessage = "The trade is perfectly even!";
        winnerClass = "bg-yellow-100 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-800";
    }
    
    return (
        <Card className={`p-4 border ${winnerClass} mb-4 rounded-lg overflow-hidden`}>
            <h3 className="font-bold text-xl mb-2 dark:text-white">{winnerMessage}</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="font-medium dark:text-gray-300">Team X Value:</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{xTotal.toFixed(2)}</p>
                </div>
                <div>
                    <p className="font-medium dark:text-gray-300">Team Y Value:</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">{yTotal.toFixed(2)}</p>
                </div>
                <div className="col-span-2">
                    <p className="font-medium dark:text-gray-300">Difference:</p>
                    <p className="text-lg font-bold dark:text-gray-200">{Math.abs(diff).toFixed(2)} points {diff > 0 ? "in favor of Team X" : "in favor of Team Y"}</p>
                </div>
            </div>
        </Card>
    );
}

async function valuatePicks(
    xPicks: number[], 
    yPicks: number[], 
    valueType: 'l1_value' | 'l2_value' | 'jj_value',
    setTradeResult: (result: TradeResult) => void
) {
    let pickValues: PickValuesRecord;
    try {
        const response = await fetch('/data/pick_values.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch pick values: ${response.statusText}`);
        }
        pickValues = await response.json();
        console.log('Loaded pick values');
    } catch (error) {
        console.error('Failed to load pick values:', error);
        return;
    }

    let xTotal: number = 0.0;
    let yTotal: number = 0.0;

    for (const pick of xPicks) {
        const pickValue = pickValues[pick][valueType];
        xTotal += pickValue;
    }

    for (const pick of yPicks) {
        const pickValue = pickValues[pick][valueType];
        yTotal += pickValue;
    }

    const diff = xTotal - yTotal;
    console.log(`Total value of Team X: ${xTotal}`);
    console.log(`Total value of Team Y: ${yTotal}`);
    console.log(`Difference: ${diff}`);
    
    const result = { xTotal, yTotal, diff };
    setTradeResult(result);
    
    return diff;
}

export function ValueSelector({ onValueTypeChange, selectedValue }: ValueSelectorProps) {
    const handleValueChange = (valueType: 'l1_value' | 'l2_value' | 'jj_value') => {
        if (selectedValue === valueType) {
            onValueTypeChange(null);
        } else {
            onValueTypeChange(valueType);
        }
    };
    
    return (
        <div className="flex flex-row gap-4 justify-center p-4 bg-gray-300/50 dark:bg-gray-700/40 rounded-lg border shadow-sm border-gray-300 dark:border-gray-600 mb-6" >
            <div className="flex items-center space-x-2">
                <Checkbox 
                    id="l1_value" 
                    checked={selectedValue === 'l1_value'}
                    onCheckedChange={() => handleValueChange('l1_value')}
                    className="text-blue-600 border-blue-300 dark:border-blue-700 rounded"
                />
                <label htmlFor="l1_value" className="cursor-pointer font-medium text-gray-800 dark:text-white">L1 Value</label>
            </div>
            
            <div className="flex items-center space-x-2">
                <Checkbox 
                    id="l2_value"
                    checked={selectedValue === 'l2_value'}
                    onCheckedChange={() => handleValueChange('l2_value')}
                    className="text-blue-600 border-blue-300 dark:border-blue-700 rounded"
                />
                <label htmlFor="l2_value" className="cursor-pointer font-medium text-gray-800 dark:text-white">L2 Value</label>
            </div>
            
            <div className="flex items-center space-x-2">
                <Checkbox 
                    id="jj_value"
                    checked={selectedValue === 'jj_value'}
                    onCheckedChange={() => handleValueChange('jj_value')}
                    className="text-blue-600 border-blue-300 dark:border-blue-700 rounded"
                />
                <label htmlFor="jj_value" className="cursor-pointer font-medium text-gray-800 dark:text-white">Jimmy Johnson Value</label>
            </div>
        </div>
    );
}

interface PicksDisplayProps {
    label: string;
    picks: number[];
    bgColor?: string;
    onAddPick: (pick: number) => void;
}

export function PicksDisplay({ label, picks, bgColor = "bg-blue-100", onAddPick }: PicksDisplayProps) {
    const [newPick, setNewPick] = useState<string>('');
    
    const handleAddPick = () => {
        const pick = parseInt(newPick);
        if (!isNaN(pick)) {
            onAddPick(pick);
            setNewPick('');
        }
    };
    
    // Add dark mode classes to bgColor
    const darkBgColor = bgColor === "bg-blue-100" ? "dark:bg-blue-900/30" : "dark:bg-green-900/30";
    
    return (
        <Card className="flex flex-col p-4 h-full border border-gray-200 dark:border-gray-700 dark:bg-black rounded-lg shadow-sm overflow-hidden">
            <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-3">{label}</h3>
            
            <div className="flex gap-2 mb-4">
                <Input
                    type="number"
                    value={newPick}
                    onChange={(e) => setNewPick(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddPick()}
                    className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg"
                    placeholder="Enter pick (e.g. 1, 2, 3...)"
                />
                <Button
                    onClick={handleAddPick}
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg"
                >
                    Add
                </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
                {picks.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 italic">No picks added</p>
                ) : (
                    picks.map((pick) => (
                        <div key={pick} className={`px-3 py-1 ${bgColor} ${darkBgColor} rounded-full text-center min-w-8 dark:text-white shadow-sm`}>
                            {pick}
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
}

interface PicksProps {
    teamXPicks: number[];
    teamYPicks: number[];
}

export default function Picks({ teamXPicks, teamYPicks }: PicksProps) {
    const [valueType, setValueType] = useState<'l1_value' | 'l2_value' | 'jj_value' | null>('l1_value');
    const [xPicks, setXPicks] = useState<number[]>(teamXPicks);
    const [yPicks, setYPicks] = useState<number[]>(teamYPicks);
    const [tradeResult, setTradeResult] = useState<TradeResult | null>(null);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const alertTriggerRef = useRef<HTMLButtonElement>(null);
    
    const showAlert = (message: string) => {
        setAlertMessage(message);
        // Trigger the alert dialog
        if (alertTriggerRef.current) {
            alertTriggerRef.current.click();
        }
    };
    
    const addXPick = (pick: number) => {
        if (xPicks.includes(pick)) {
            showAlert('Pick already exists in Team X');
        } 
        else if (pick < 1 || pick > 257) {
            showAlert('Pick must be between 1 and 257');
        }
        else {
            setXPicks([...xPicks, pick]);
            setTradeResult(null); // Reset result when picks change
        }
    };
    
    const addYPick = (pick: number) => {
        if (yPicks.includes(pick)) {
            showAlert('Pick already exists in Team Y');
        } 
        else if (pick < 1 || pick > 257) {
            showAlert('Pick must be between 1 and 257');
        }
        else {
            setYPicks([...yPicks, pick]);
            setTradeResult(null); // Reset result when picks change
        }
    };
    
    const clearPicks = () => {
        setXPicks([]);
        setYPicks([]);
        setTradeResult(null);
    };
    
    return (
        <div className="flex flex-col gap-4 w-full">
            <AlertDialog>
                <AlertDialogTrigger ref={alertTriggerRef} className="hidden">
                    Open Alert
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="dark:text-white">Notice</AlertDialogTitle>
                        <AlertDialogDescription className="dark:text-gray-300">{alertMessage}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-white rounded-lg">
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            
            <ValueSelector 
                selectedValue={valueType} 
                onValueTypeChange={(value) => {
                    setValueType(value);
                    setTradeResult(null);
                }} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 w-full">
                <PicksDisplay 
                    label="Team X Picks" 
                    picks={xPicks} 
                    bgColor="bg-blue-100"
                    onAddPick={addXPick}
                />
                
                <PicksDisplay 
                    label="Team Y Picks" 
                    picks={yPicks} 
                    bgColor="bg-green-100"
                    onAddPick={addYPick}
                />
            </div>
            
            {tradeResult && <TradeWinner result={tradeResult} />}
            
            <div className="flex justify-end gap-3">
                <Button
                    onClick={clearPicks}
                    variant="outline"
                    className="dark:bg-transparent dark:text-white dark:border-gray-600 dark:hover:bg-gray-800 rounded-lg"
                >
                    Clear All Picks
                </Button>
                <Button
                    onClick={() => valueType && valuatePicks(xPicks, yPicks, valueType, setTradeResult)} 
                    variant="default"
                    className="ml-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg"
                    disabled={!valueType}
                >
                    Calculate
                </Button>
            </div>
        </div>
    );
}