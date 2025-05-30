import fs from 'fs';
import csv from 'csv-parser';

type Product = {
  name: string;
  brand: string;
  ingredients: string[];
  skinTypes: {
    oily: boolean;
    dry: boolean;
    combo: boolean;
    normal: boolean;
    sensitive: boolean;
  };
};

const results: Product[] = [];

fs.createReadStream('sephoraData.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
    const ingredientsRaw = row['Ingredients'] || '';
    const ingredients = ingredientsRaw
      .split(/[•,]/)
      .map((i: string) => i.trim())
      .filter((i: string) => i.length > 0);

    results.push({
      name: row['Product Name'],
      brand: row['Brand'] || 'Unknown',
      ingredients,
      skinTypes: {
        oily: row['Oily Skin'] === '1',
        dry: row['Dry Skin'] === '1',
        combo: row['Combination Skin'] === '1',
        normal: row['Normal Skin'] === '1',
        sensitive: row['Sensitive Skin'] === '1'
      }
    });
  })
  .on('end', () => {
    fs.writeFileSync('products.json', JSON.stringify(results, null, 2));
    console.log('✅ Converted to products.json');
  });
