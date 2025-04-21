import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

/**
 * Converts the pick values CSV to JSON and saves it in the public directory
 */
function convertPickValuesToJson() {
  try {
    const csvPath = 'src/data/compare_jj.csv';
    const jsonPath = 'public/data/pick_values.json';
    
    console.log(`Reading CSV from: ${csvPath}`);
    
    // Ensure output directory exists
    const outputDir = path.dirname(jsonPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const csvData = fs.readFileSync(csvPath, 'utf8');
    
    // Parse CSV data
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    });
    
    // Convert to keyed object
    const result = {};
    
    for (const record of records) {
      const key = record.Pick;
      
      // Convert to the format we need
      result[key] = {
        pick: parseInt(record.Pick),
        l1_value: parseFloat(record.L1_Value),
        l2_value: parseFloat(record.L2_Value),
        jj_value: parseFloat(record.Jimmy_Johnson)
      };
    }
    
    // Write to JSON file
    fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2));
    
    console.log(`Successfully saved JSON to ${jsonPath}`);
    return result;
  } catch (error) {
    console.error('Error converting CSV to JSON:', error);
    throw error;
  }
}

// Just run the function directly
convertPickValuesToJson(); 