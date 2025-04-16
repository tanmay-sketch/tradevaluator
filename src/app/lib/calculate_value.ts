import { loadPickValues } from './load_csv';

export async function calculateValue(xPicks: number[], yPicks: number[], valueType: 'l1_value' | 'l2_value' | 'jj_value') {
    try {
        const pickValues = await loadPickValues();
        console.log("Loaded pick values");

        const xValue = xPicks.reduce((sum, pick) => sum + pickValues[pick][valueType], 0);
        const yValue = yPicks.reduce((sum, pick) => sum + pickValues[pick][valueType], 0);

        return {
            xValue,
            yValue,
            difference: xValue - yValue
        };
    }
    catch (error) {
        console.error("Error loading pick values:", error);
    }
    
}