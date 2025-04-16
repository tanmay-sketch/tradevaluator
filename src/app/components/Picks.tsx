import { Checkbox } from "@/components/ui/checkbox";

export function CheckBoxes() {
    return (
        <div className="flex flex-row gap-4 items-center text-gray-1000" >
            <div className="flex items-center space-x-2">
                <Checkbox id="l1_value" />
                <label htmlFor="l1_value">L1 Value</label>
            </div>
            
            <div className="flex items-center space-x-2">
                <Checkbox id="l2_value" />
                <label htmlFor="l2_value">L2 Value</label>
            </div>
            
            <div className="flex items-center space-x-2">
                <Checkbox id="jj_value" />
                <label htmlFor="jj_value">JJ Value</label>
            </div>
        </div>
    );
}

export default function Picks() {
    return (
        <div className="flex flex-col gap-2 p-4 bg-gray-300 rounded-lg" >
            <CheckBoxes />
        </div>
    );
}