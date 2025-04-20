"use client"
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";

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

async function valuatePicks(xPicks: number[], yPicks: number[], valueType: 'l1_value' | 'l2_value' | 'jj_value') {
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
    
    alert(`Team X: ${xTotal.toFixed(2)}\nTeam Y: ${yTotal.toFixed(2)}\nDifference: ${diff.toFixed(2)}`);
    
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
        <div className="flex flex-row gap-4 justify-center text-black p-2 bg-gray-100 rounded mb-4" >
            <div className="flex items-center space-x-2">
                <Checkbox 
                    id="l1_value" 
                    checked={selectedValue === 'l1_value'}
                    onCheckedChange={() => handleValueChange('l1_value')}
                />
                <label htmlFor="l1_value" className="cursor-pointer">L1 Value</label>
            </div>
            
            <div className="flex items-center space-x-2">
                <Checkbox 
                    id="l2_value"
                    checked={selectedValue === 'l2_value'}
                    onCheckedChange={() => handleValueChange('l2_value')}
                />
                <label htmlFor="l2_value" className="cursor-pointer">L2 Value</label>
            </div>
            
            <div className="flex items-center space-x-2">
                <Checkbox 
                    id="jj_value"
                    checked={selectedValue === 'jj_value'}
                    onCheckedChange={() => handleValueChange('jj_value')}
                />
                <label htmlFor="jj_value" className="cursor-pointer">Jimmy Johnson Value</label>
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
        if (!isNaN(pick) && pick > 0) {
            onAddPick(pick);
            setNewPick('');
        }
    };
    
    return (
        <Card className="flex flex-col p-4 h-full">
            <h3 className="font-medium text-gray-700 mb-3">{label}</h3>
            
            <div className="flex gap-2 mb-4">
                <Input
                    type="number"
                    value={newPick}
                    onChange={(e) => setNewPick(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddPick()}
                    className="flex-1"
                    placeholder="Enter pick (e.g. 1, 2, 3...)"
                />
                <Button
                    onClick={handleAddPick}
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Add
                </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
                {picks.length === 0 ? (
                    <p className="text-gray-500 italic">No picks added</p>
                ) : (
                    picks.map((pick) => (
                        <div key={pick} className={`px-3 py-1 ${bgColor} rounded-full text-center min-w-8`}>
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
    
    const addXPick = (pick: number) => {
        if (xPicks.includes(pick)) {
            alert('Pick already exists in Team X');
        } else {
            setXPicks([...xPicks, pick]);
        }
    };
    
    const addYPick = (pick: number) => {
        if (yPicks.includes(pick)) {
            alert('Pick already exists in Team Y');
        } else {
            setYPicks([...yPicks, pick]);
        }
    };
    
    const clearPicks = () => {
        setXPicks([]);
        setYPicks([]);
    };
    
    return (
        <div className="flex flex-col gap-4 w-full">
            <ValueSelector 
                selectedValue={valueType} 
                onValueTypeChange={setValueType} 
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
            
            <div className="flex justify-end">
                <Button
                    onClick={clearPicks}
                    variant="outline"
                >
                    Clear All Picks
                </Button>
                <Button
                    onClick={() => valueType && valuatePicks(xPicks, yPicks, valueType)} 
                    variant="default"
                    className="ml-2 bg-blue-600 hover:bg-blue-700"
                    disabled={!valueType}
                >
                    Calculate
                </Button>
            </div>
        </div>
    );
}