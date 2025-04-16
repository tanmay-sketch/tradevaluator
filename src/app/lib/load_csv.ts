import { promises as fs } from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';

export type PickValue = {
    pick: number;
    l1_value: number;
    l2_value: number;
    jj_value: number;
};

/**
 * Loads and parses a CSV file asynchronously
 * @param filePath - Path to the CSV file (relative to src/data directory)
 * @param options - CSV parse options (optional)
 * @returns Promise that resolves to an array of records
 */

export async function loadCSV<T extends Record<string, unknown>>(
    filePath: string,
    options: { delimiter?: string; columns?: string[] | boolean; skip_empty_lines?: boolean } = {}
): Promise<T[]> {
    // Ensure the path is relative to src/data directory
    const fullPath = path.resolve(__dirname, '..', 'data', filePath);
    
    try {
        const fileContent = await fs.readFile(fullPath, 'utf-8');
        
        return new Promise((resolve, reject) => {
            parse(fileContent, {
                columns: true, // Treats first line as headers
                skip_empty_lines: true,
                ...options
            }, (error, records) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(records as T[]);
                }
            });
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to load CSV file ${filePath}: ${error.message}`);
        } else {
            throw new Error(`Failed to load CSV file ${filePath}: Unknown error`);
        }
    }
}

/**
 * Loads pick values from CSV and returns them as a Record
 * @returns Promise that resolves to a Record of pick values
 */
export async function loadPickValues(): Promise<Record<number, PickValue>> {
    try {
        const pickValues = await loadCSV<PickValue>('pick_values.csv', {
            delimiter: ',',
            columns: ['pick', 'l1_value', 'l2_value', 'jj_value'],
        });
        
        // Convert array to Record
        const pickValuesRecord: Record<number, PickValue> = {};
        pickValues.forEach((row) => {
            pickValuesRecord[row.pick] = row;
        });
        
        return pickValuesRecord;
    } catch (error) {
        console.error('Error loading pick values:', error);
        throw error;
    }
}

// Example usage:
// async function main() {
//     try {
//         const pickValues = await loadPickValues();
//         console.log('Loaded pick values:', pickValues);
//     } catch (error) {
//         console.error('Failed to load pick values:', error);
//     }
// }
// 
// main();